import { sha256 } from 'js-sha256';

export function getGravatarURL(email: string): string {
  const address = email.trim().toLowerCase();
  const hash = sha256(address);
  return `https://gravatar.com/avatar/${hash}?s=200&d=wavatar`;
}
