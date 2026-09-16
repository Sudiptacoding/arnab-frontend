export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },

    sitemap: "https://retouchlab360.vercel.app/sitemap.xml",
  };
}