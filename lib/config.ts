function readPublic(name: string): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function parseEmailList(raw: string): string[] {
  return raw
    .split(/[,;\s]+/)
    .map((e) => e.trim())
    .filter((e) => e.includes("@"));
}

export const siteConfig = {
  nameAr: "مصنع الناي للألبان والأجبان",
  nameEn: "Al Nai Dairy Co.",
  brandLine: "AL NAI",
  productName: "تصور جودة وتتبّع وطلبات واتساب لمصنع ألبان",
  parentAr: "صناعة الألبان والأجبان — ماركا، عمّان",
  parentEn: "Dairy & cheese manufacturing — Marka, Amman",
  recipient: "مدير المبيعات",
  recipientRole: "مصنع الناي للألبان والأجبان",
  country: "الأردن",
  city: "عمّان",
  cityDetailAr: "شمال ماركا — شارع المرابطون",
  since: 2007,
  websiteUrl: "https://www.halabazaar.com/en/show/agentproperties/1673",
  websiteLabelAr: "مرجع عام (الموقع المدرج alnai.com.jo غير متاح)",
  defaultMapsUrl: "https://www.google.com/maps/search/Al+Nai+Dairy+Marka+Amman",
  defaultWhatsAppPhone: "962796061100",
  defaultWhatsAppPrefill:
    "السلام عليكم إدارة مصنع الناي للألبان والأجبان. بخصوص ",
  defaultEmails: [] as const,
  phones: ["962796061100", "962796000946", "96264888220"] as const,
  salesPhone: "962796061100",
  hoursAr: "ساعات الدوام التفصيلية غير منشورة على الويب — تأكيد عبر الهاتف",
  addressAr: "شمال ماركا — شارع المرابطون، عمّان، الأردن",
  promiseAr: "طلب بالجملة يُغلق بالواتساب بعد أن يرى مدير المبيعات مسار جودة وتتبع قابل للتنفيذ",
  developer: {
    nameAr: "م. صهيب عسراوي",
    email: "suhaib@muqasa-jo.com",
    prefill: "الناي للألبان",
  },
} as const;

export function getDiscoveryFormUrl(): string {
  return readPublic("NEXT_PUBLIC_DISCOVERY_FORM_URL");
}

export function getContactEmails(): string[] {
  const fromEnv = parseEmailList(readPublic("NEXT_PUBLIC_CONTACT_EMAILS"));
  if (fromEnv.length) return fromEnv;
  const single = readPublic("NEXT_PUBLIC_CONTACT_EMAIL");
  if (single) {
    const parts = parseEmailList(single);
    if (parts.length) return parts;
  }
  return [...siteConfig.defaultEmails];
}

export function getMapsUrl(): string {
  return readPublic("NEXT_PUBLIC_MAPS_URL") || siteConfig.defaultMapsUrl;
}

export function getCompanyWebsiteUrl(): string {
  return readPublic("NEXT_PUBLIC_COMPANY_WEBSITE") || siteConfig.websiteUrl;
}

export function getWhatsAppPhone(): string {
  const raw =
    readPublic("NEXT_PUBLIC_WHATSAPP_PHONE") || siteConfig.defaultWhatsAppPhone;
  return raw.replace(/[^\d]/g, "");
}

export function getWhatsAppPhoneDisplay(): string {
  const digits = getWhatsAppPhone();
  if (!digits) return "";
  return `+${digits}`;
}

export function getWhatsAppPrefill(): string {
  return (
    readPublic("NEXT_PUBLIC_WHATSAPP_PREFILL") || siteConfig.defaultWhatsAppPrefill
  );
}

export function getWhatsAppUrl(extra = ""): string {
  const phone = getWhatsAppPhone();
  if (!phone) return "";
  const text = `${getWhatsAppPrefill()}${extra}`.trim();
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppQrValue(): string {
  const phone = getWhatsAppPhone();
  if (!phone) return "";
  return `https://wa.me/${phone}`;
}

export function getTelQrValue(): string {
  const phone = getWhatsAppPhone();
  if (!phone) return "";
  return `tel:+${phone}`;
}

export function getDeveloperEmail(): string {
  return readPublic("NEXT_PUBLIC_DEVELOPER_EMAIL") || siteConfig.developer.email;
}

export function getDeveloperQrValue(): string {
  const email = getDeveloperEmail();
  if (!email) return "";
  const subject = encodeURIComponent(`منصة ${siteConfig.developer.prefill}`);
  return `mailto:${email}?subject=${subject}`;
}

export function getDeveloperMailtoUrl(): string {
  return getDeveloperQrValue();
}

export function getSiteUrl(): string {
  const fromEnv = readPublic("NEXT_PUBLIC_SITE_URL");
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "")}`;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3000";
}

export function formatPhoneDisplay(digits: string): string {
  const d = digits.replace(/[^\d]/g, "");
  if (d.startsWith("962") && d.length === 12) {
    return `+${d.slice(0, 3)} ${d.slice(3, 4)} ${d.slice(4, 8)} ${d.slice(8)}`;
  }
  if (d.startsWith("962") && d.length === 11) {
    return `+${d.slice(0, 3)} ${d.slice(3, 4)} ${d.slice(4)}`;
  }
  return `+${d}`;
}

export function getSalesCallUrl(): string {
  return `tel:+${getWhatsAppPhone() || siteConfig.salesPhone}`;
}
