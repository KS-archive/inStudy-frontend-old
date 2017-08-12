export function detectIE() {
  const ua = window.navigator.userAgent;
  return (ua.includes('MSIE') || ua.includes('Trident/') || ua.includes('Edge/'));
}
