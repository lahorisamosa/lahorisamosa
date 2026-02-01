import { Helmet } from 'react-helmet-async';
import { APP_CONSTANTS } from '../utils/constants';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    type?: 'website' | 'article' | 'restaurant';
    image?: string;
}

export const SEO = ({
    title,
    description,
    canonical,
    type = 'website',
    image = '/images/hero-bg.jpg' // Default sharing image (ensure this exists or use a valid one)
}: SEOProps) => {
    const siteUrl = 'https://lahorisamosa.com'; // Replace with actual domain if known, or keep generic
    const currentUrl = canonical || siteUrl;
    const fullTitle = `${title} | Lahori Samosa`;

    // LocalBusiness Schema for Google
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Lahori Samosa",
        "image": [
            `${siteUrl}/images/hero/heroimage.webp`,
            `${siteUrl}/images/products/chickenqeema.webp`
        ],
        // "Global Logo" - Explicitly telling Google this is the logo
        "logo": `${siteUrl}/images/favicon/favicon-96x96.png`,
        "description": "The best frozen samosas in Lahore. Authentic Lahori taste, delivery to your doorstep. Rated #1 for Chicken Qeema and Pizza Samosas.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lahore",
            "addressRegion": "Punjab",
            "addressCountry": "PK"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 31.5204,
            "longitude": 74.3587
        },
        "url": siteUrl,
        "telephone": APP_CONSTANTS.CONTACT.PHONE,
        "priceRange": "Rs. 50 - Rs. 500",
        "servesCuisine": "Pakistani",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:00",
                "closes": "20:00"
            }
        ],
        "hasMenu": `${siteUrl}/products`
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="best samosa in lahore, frozen samosa delivery, best frozen samosa, lahori samosa, chicken qeema samosa, online samosa delivery lahore, best samosa shop" />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="Lahori Samosa" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};
