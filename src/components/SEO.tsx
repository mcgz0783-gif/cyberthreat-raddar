import { Helmet } from "react-helmet-async";

const BASE_URL = "https://cyberthreat-raddar.lovable.app";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

export function SEO({ title, description, path = "", ogImage }: SEOProps) {
  const url = `${BASE_URL}${path}`;
  const image = ogImage || "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/712a1042-8c77-496d-a54f-efe8fd604e06/id-preview-d95e04eb--b59f06b6-dc4b-4f75-9b4c-6576005a2e6e.lovable.app-1777825138735.png";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
