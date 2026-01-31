/**
 * Cloudflare Pages Function for sending emails via Brevo
 * Triggering redeploy to sync environment variables.
 */
export async function onRequestPost({ request, env }) {
    try {
        const { to, subject, htmlContent } = await request.json();

        const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
        const BREVO_API_KEY = env.BREVO_API_KEY;
        const BREVO_SENDER_EMAIL = env.BREVO_SENDER_EMAIL;
        const BREVO_SENDER_NAME = env.BREVO_SENDER_NAME || 'Lahori Samosa';

        if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
            const keys = Object.keys(env);
            return new Response(JSON.stringify({
                success: false,
                error: `Missing Brevo configuration. Keys seen in Cloudflare: [${keys.join(', ')}]`
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const emailData = {
            sender: {
                name: BREVO_SENDER_NAME,
                email: BREVO_SENDER_EMAIL
            },
            to: Array.isArray(to) ? to : [{ email: to }],
            subject: subject,
            htmlContent: htmlContent
        };

        const response = await fetch(BREVO_API_URL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        const result = await response.json();

        return new Response(JSON.stringify({
            success: response.ok,
            result
        }), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
