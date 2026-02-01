import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { EMAIL_API_URL } from '../../utils/emailConfig';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ShoppingBag, RefreshCw, Search, Clock, CheckCircle, Package, XCircle } from 'lucide-react';

interface Order {
    id: string;
    created_at: string;
    customer_info: {
        name: string;
        phone: string;
        address: string;
        email: string;
    };
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
}

export function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [messages, setMessages] = useState<any[]>([]);
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'orders' | 'messages' | 'subscribers'>('orders');

    useEffect(() => {
        fetchOrders();
        fetchMessages();
        fetchSubscribers();
        audioRef.current = new Audio('/sounds/notification.mp3');

        // Orders Subscription
        const orderChannel = supabase
            .channel('orders-channel')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
                const newOrder = payload.new as Order;
                setOrders((prev) => [newOrder, ...prev]);
                playNotificationSound();
                showBrowserNotification('New Order', `Order #${newOrder.id.slice(0, 8)} - Rs.${newOrder.total}`);
            })
            .subscribe();

        // Messages Subscription
        const messageChannel = supabase
            .channel('messages-channel')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                const newMsg = payload.new;
                setMessages((prev) => [newMsg, ...prev]);
                playNotificationSound();
                showBrowserNotification('New Message', `From: ${newMsg.name}`);
            })
            .subscribe();

        // Subscribers Subscription
        const subscriberChannel = supabase
            .channel('subscribers-channel')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'subscribers' }, (payload) => {
                const newSub = payload.new;
                setSubscribers((prev) => [newSub, ...prev]);
                playNotificationSound();
                showBrowserNotification('New Subscriber', `${newSub.email} joined the newsletter!`);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(orderChannel);
            supabase.removeChannel(messageChannel);
            supabase.removeChannel(subscriberChannel);
        };
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (!error) setOrders(data || []);
        setLoading(false);
    };

    const fetchMessages = async () => {
        const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
        if (data) setMessages(data);
    };

    const fetchSubscribers = async () => {
        const { data } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
        if (data) setSubscribers(data);
    };

    const markMessageRead = async (id: string) => {
        // Optimistic
        setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
        await supabase.from('messages').update({ read: true }).eq('id', id);
    };

    const updateStatus = async (orderId: string, newStatus: Order['status']) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);

        if (!error) {
            const order = orders.find(o => o.id === orderId);
            if (order && order.customer_info?.email) {
                await sendStatusEmail(order, newStatus);
            }
        } else {
            fetchOrders();
        }
    };

    const sendStatusEmail = async (order: Order, status: string) => {
        // ... (Email logic remains the same)
        let subject = '', messageBody = '', headerColor = '', icon = '';
        switch (status) {
            case 'confirmed': subject = `✅ Order Confirmed: #${order.id}`; messageBody = `Great news! Your order has been confirmed.`; headerColor = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'; icon = '👨‍🍳'; break;
            case 'delivered': subject = `📦 Order Delivered: #${order.id}`; messageBody = `Your order has been delivered!`; headerColor = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'; icon = '🎁'; break;
            case 'cancelled': subject = `❌ Order Cancelled: #${order.id}`; messageBody = `Your order has been cancelled.`; headerColor = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'; icon = '🚫'; break;
            default: return;
        }

        const htmlContent = `
            <div style="font-family: sans-serif; padding: 20px; background: #f7fafc;">
                <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden;">
                    <div style="background: ${headerColor}; padding: 30px; text-align: center; color: white;">
                         <h1>${subject} ${icon}</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Hi ${order.customer_info.name},</p>
                        <p>${messageBody}</p>
                        <p>Total: Rs.${order.total}</p>
                    </div>
                </div>
            </div>
        `;

        try {
            await fetch(EMAIL_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: order.customer_info.email, subject, htmlContent })
            });
        } catch (error) { console.error('Email error', error); }
    };

    const playNotificationSound = () => { if (audioRef.current) audioRef.current.play().catch(() => { }); };

    const showBrowserNotification = (title: string, body: string) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body, icon: '/favicon-96x96.png' });
        }
    };

    useEffect(() => { if ('Notification' in window) Notification.requestPermission(); }, []);

    const filteredOrders = orders.filter(order => {
        if (filter !== 'all' && order.status !== filter) return false;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                order.id.toLowerCase().includes(term) ||
                order.customer_info?.name.toLowerCase().includes(term) ||
                order.customer_info?.phone.includes(term)
            );
        }
        return true;
    });

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
            cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
        }[status] || 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        return <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles} capitalize inline-block`}>{status}</span>;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
            <header className="bg-slate-900/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Admin<span className="text-slate-500 font-normal">Panel</span></h1>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-slate-900 border border-white/5 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'orders' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'messages' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Messages
                            {messages.some(m => !m.read) && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('subscribers')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'subscribers' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Subscribers
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => { fetchOrders(); fetchMessages(); fetchSubscribers(); }} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white" title="Refresh">
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block"></div>
                        <div className="text-sm text-right hidden sm:block">
                            <p className="text-white font-medium">Administrator</p>
                            <p className="text-xs text-slate-500">Logged in</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {activeTab === 'orders' ? (
                    <>
                        {/* Stats Overview */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, color: 'text-yellow-500' },
                                { label: 'Processing', value: orders.filter(o => o.status === 'confirmed').length, color: 'text-blue-500' },
                                { label: 'Completed', value: orders.filter(o => o.status === 'delivered').length, color: 'text-green-500' },
                                { label: 'Total Revenue', value: `Rs.${orders.filter(o => o.status !== 'cancelled').reduce((acc, curr) => acc + (curr.total || 0), 0).toLocaleString()}`, color: 'text-amber-500' }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-slate-900 border border-white/5 p-5 rounded-2xl shadow-xl hover:border-white/10 transition-colors">
                                    <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-1">{stat.label}</p>
                                    <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Filters & Search */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-white/5">
                            <div className="relative w-full sm:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                                />
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                                {['all', 'pending', 'confirmed', 'delivered', 'cancelled'].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setFilter(s)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filter === s
                                            ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                                            : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Orders Table */}
                        <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                            <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Total</th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <AnimatePresence>
                                            {filteredOrders.map((order) => (
                                                <motion.tr
                                                    key={order.id}
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="hover:bg-white/[0.02] transition-colors group"
                                                >
                                                    <td className="p-4 font-mono text-xs text-slate-400">
                                                        <span className="text-white font-bold select-all">#{order.id.slice(0, 8)}</span>
                                                        <div className="mt-1 flex items-center text-[10px] text-slate-500">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {new Date(order.created_at).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="font-medium text-white">{order.customer_info?.name}</div>
                                                        <div className="text-xs text-slate-500 mt-0.5 flex flex-col gap-0.5">
                                                            <a href={`tel:${order.customer_info?.phone}`} className="hover:text-amber-500 transition-colors flex items-center gap-1">
                                                                <Phone className="w-3 h-3" /> {order.customer_info?.phone}
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">{getStatusBadge(order.status)}</td>
                                                    <td className="p-4">
                                                        <div className="text-sm text-slate-300 space-y-1">
                                                            {order.items?.map((item, idx) => (
                                                                <div key={idx} className="flex gap-2 text-xs">
                                                                    <span className="text-amber-500 font-bold w-4">{item.quantity}x</span>
                                                                    <span className="truncate max-w-[150px]">{item.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="font-bold text-amber-500">Rs.{order.total.toLocaleString()}</div>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                            {order.status === 'pending' && (
                                                                <button onClick={() => updateStatus(order.id, 'confirmed')} className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all" title="Confirm">
                                                                    <CheckCircle className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                            {order.status === 'confirmed' && (
                                                                <button onClick={() => updateStatus(order.id, 'delivered')} className="p-1.5 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all" title="Mark Delivered">
                                                                    <Package className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                            {(order.status === 'pending' || order.status === 'confirmed') && (
                                                                <button onClick={() => updateStatus(order.id, 'cancelled')} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Cancel">
                                                                    <XCircle className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                            {/* Mobile View Omitted for Brevity (Same as desktop but card layout) - Actually I should keep it or it will vanish */}
                            <div className="md:hidden divide-y divide-white/5">
                                {filteredOrders.map((order) => (
                                    <div key={order.id} className="p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-mono text-xs text-slate-500">#{order.id.slice(0, 6)}</span>
                                                    {getStatusBadge(order.status)}
                                                </div>
                                                <h3 className="font-bold text-white">{order.customer_info?.name}</h3>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-amber-500">Rs.{order.total}</div>
                                                <div className="text-[10px] text-slate-500">{new Date(order.created_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-950/50 rounded-lg p-3 text-sm border border-white/5">
                                            {order.items?.map((item, idx) => (
                                                <div key={idx} className="flex justify-between py-0.5">
                                                    <span className="text-slate-400"><span className="text-amber-500 font-mono mr-1">{item.quantity}x</span> {item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            {order.status === 'pending' && <button onClick={() => updateStatus(order.id, 'confirmed')} className="flex-1 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-semibold">Confirm</button>}
                                            {order.status === 'confirmed' && <button onClick={() => updateStatus(order.id, 'delivered')} className="flex-1 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm font-semibold">Deliver</button>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : activeTab === 'messages' ? (
                    <div className="space-y-6">
                        {/* Messages Tab Content */}
                        <div className="grid grid-cols-1 gap-4">
                            {messages.length === 0 ? (
                                <div className="text-center py-20 bg-slate-900 border border-white/5 rounded-2xl">
                                    <p className="text-slate-500">No messages yet.</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-6 rounded-xl border border-white/5 transition-all ${msg.read ? 'bg-slate-900' : 'bg-slate-800 border-amber-500/30'}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className={`text-lg font-semibold ${msg.read ? 'text-slate-200' : 'text-white'}`}>{msg.subject || 'No Subject'}</h3>
                                                <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                                                    <span>{msg.name}</span>
                                                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                                    <span>{msg.email}</span>
                                                    {msg.phone && (
                                                        <>
                                                            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                                            <span>{msg.phone}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-xs text-slate-500">{new Date(msg.created_at).toLocaleString()}</span>
                                                {!msg.read && (
                                                    <button
                                                        onClick={() => markMessageRead(msg.id)}
                                                        className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-medium rounded-full hover:bg-amber-500/20 transition-colors"
                                                    >
                                                        Mark as Read
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="bg-slate-950/50 p-4 rounded-lg text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                                            {msg.message}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Subscribers Tab Content */}
                        <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white">Newsletter Subscribers</h3>
                                <span className="text-sm text-slate-400">Total: {subscribers.length}</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                            <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</th>
                                            <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Subscribed At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {subscribers.length === 0 ? (
                                            <tr>
                                                <td colSpan={2} className="p-8 text-center text-slate-500">
                                                    No subscribers yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            subscribers.map((sub) => (
                                                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                                                    <td className="p-4 text-white font-medium">{sub.email}</td>
                                                    <td className="p-4 text-slate-400 text-right text-sm">
                                                        {new Date(sub.created_at).toLocaleDateString()} {new Date(sub.created_at).toLocaleTimeString()}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
