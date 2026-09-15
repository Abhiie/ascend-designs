// Studio locations. `offices[0]` (Ahmedabad) is the head office and backs
// the flat `location` / `shortLocation` / `googleMapsUrl` fields on
// `siteConfig` below, so single-office call sites keep working unchanged;
// anything showing every office should read `offices` directly.
export const offices = [
  {
    id: "ahmedabad",
    label: "Ahmedabad — Head Office",
    shortLabel: "Ahmedabad",
    address:
      "B-545, Money Plant High Street, Sarkhej, Gandhinagar Highways Ahmedabad, Gujarat 382470",
    shortLocation: "Sarkhej, Ahmedabad, Gujarat",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=B-545+Money+Plant+High+Street+Sarkhej+Gandhinagar+Highways+Ahmedabad+Gujarat+382470",
  },
  {
    id: "mehsana",
    label: "Mehsana — Branch Office",
    shortLabel: "Mehsana",
    address:
      "Krushnam Skywalk, T/09, Mehsana, Opposite Nilkanth Restaurant, Radhanpur Road, Mehsana, Gujarat 384002",
    shortLocation: "Radhanpur Road, Mehsana, Gujarat",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Krushnam Skywalk, T/09, Mehsana, Opposite Nilkanth Restaurant, Radhanpur Road, Mehsana, Gujarat 384002"
      ),
  },
] as const;

export const siteConfig = {
  name: "Ascend Designs",
  tagline: "IMAGINE | DESIGN | ELEVATE",
  founder: "Ashish Prajapati",
  founderTitle: "Principal Architect & Founder",
  founderBio:
    "Ashish Prajapati leads Ascend Designs with a vision rooted in architectural clarity, material authenticity, and thoughtful spatial storytelling. With years of practice across luxury residential, commercial, and turnkey interior design, Ashish shapes environments that balance aesthetic elegance with functional living.",
  phone: "+91 99795 35383",
  phoneHref: "tel:+919979535383",
  email: "ascenddesigns9@gmail.com",
  location: offices[0].address,
  shortLocation: offices[0].shortLocation,
  googleMapsUrl: offices[0].googleMapsUrl,
  whatsappHref: "https://wa.me/919979535383",
  instagramHandle: "@ascend_designs",
  instagramHref: "https://www.instagram.com/ascend_designs/",
  hours: "Mon - Sat: 10:00 AM - 7:00 PM",
} as const;

// Each section has its own route for clean, linkable URLs.
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: siteConfig.instagramHref },
  { label: "WhatsApp", href: siteConfig.whatsappHref },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
] as const;

