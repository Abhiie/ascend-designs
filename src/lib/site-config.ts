export const siteConfig = {
  name: "Ascend Designs",
  tagline: "IMAGINE | DESIGN | ELEVATE",
  founder: "Ashish Prajapati",
  phone: "+91 99795 35383",
  phoneHref: "tel:+919979535383",
  email: "ascenddesigns9@gmail.com",
  location: "Ahmedabad, Gujarat",
  whatsappHref: "https://wa.me/919979535383",
  instagramHandle: "@ascenddesigns",
  instagramHref: "https://www.instagram.com/ascenddesigns/",
} as const;

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: siteConfig.instagramHref },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "WhatsApp", href: siteConfig.whatsappHref },
] as const;
