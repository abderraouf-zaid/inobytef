// نستخدم hash route في الروابط المهمة حتى تعمل الصفحات بعد build بدون إعدادات سيرفر إضافية.
export function buildHashUrl(path, query = '') {
  return `#${path}${query}`;
}

export function goTo(path, query = '') {
  window.location.href = buildHashUrl(path, query);
}
