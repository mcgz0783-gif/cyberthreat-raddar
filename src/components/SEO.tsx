import { Helmet } from "react-helmet-async";

const BASE_URL = "https://cyberhawk-ug.store";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article" | "book";
  keywords?: string;
  author?: string;
}

export function SEO({ 
  title, 
  description, 
  path = "", 
  ogImage, 
  type = "website",
  keywords = "free cybersecurity books, public library, AI education, ethical hacking, CyberHawk UG, open access security literature",
  author = "CyberHawk UG"
}: SEOProps) {
  const url = `${BASE_URL}${path}`;
  const image = ogImage || "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/712a1042-8c77-496d-a54f-efe8fd604e06/id-preview-d95e04eb--b59f06b6-dc4b-4f75-9b4c-6576005a2e6e.lovable.app-1777825138735.png";
  const siteName = "CyberHawk UG";

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : type === "book" ? "Book" : "WebSite",
    "url": url,
    "name": title,
    "alternateName": siteName,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon.ico`
      }
    }
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title.toLowerCase().includes(siteName.toLowerCase()) ? title : `${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === "article" ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@cyberhawk_ug" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
