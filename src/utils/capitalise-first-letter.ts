export function capitalizeFirstLetter(str: string) {
  if (!str) return ''; // handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}
