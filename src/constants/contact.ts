export const CAREERS_EMAIL = "careers@neurovaai.com";
export const INFO_EMAIL = "info@neurovaai.com";

/** 销售询价 / Demo 请求 */
export const SALES_MAILTO =
  "mailto:sales@neurovaai.com?subject=" + encodeURIComponent("Request Demo");

export const CAREERS_MAILTO = `mailto:${CAREERS_EMAIL}`;
export const INFO_MAILTO = `mailto:${INFO_EMAIL}`;

export function createCareerApplicationMailto(roleTitle: string) {
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    `Application - ${roleTitle}`,
  )}`;
}

interface ContactFormPayload {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function createInfoMailto({
  name,
  email,
  company,
  message,
}: ContactFormPayload) {
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${INFO_EMAIL}?subject=${encodeURIComponent(
    "Website Inquiry",
  )}&body=${encodeURIComponent(body)}`;
}
