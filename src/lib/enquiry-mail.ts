import { CONTACT } from '@/content/site';

/**
 * Opens the visitor's own email program. The website does not receive or store
 * the message. Receipt only happens if the visitor sends the email.
 */
export function enquiryMailto(subject: string, lines: readonly string[]): string {
  const body = lines.filter((line) => line.length > 0).join('\n');
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openEnquiryMailto(subject: string, lines: readonly string[], control?: HTMLElement) {
  const href = enquiryMailto(subject, lines);
  if (control) control.dataset.enquiryMailto = href;
  window.location.href = href;
}
