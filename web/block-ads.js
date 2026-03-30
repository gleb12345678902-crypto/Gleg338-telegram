// Улучшенная блокировка рекламы в Telegram Web K (2026)
function blockAllAds() {
  // 1. Удаляем по атрибутам и классам sponsored
  document.querySelectorAll('[data-sponsored], .sponsored-message, .tg-sponsored, [class*="sponsored"], [class*="promo"]').forEach(el => {
    el.style.display = 'none';
    el.remove();
  });

  // 2. Ищем по тексту "Sponsored", "Реклама" и т.п.
  const adKeywords = ['Sponsored', 'Реклама', 'sponsored', 'Промо', 'Sponsored by', 'Рекомендуется'];
  
  document.querySelectorAll('div, span, p, button').forEach(el => {
    const text = (el.textContent || '').trim();
    if (adKeywords.some(keyword => text.includes(keyword))) {
      const parentMessage = el.closest('div[class*="message"], div[role="listitem"], .chat-item, .bubble');
      if (parentMessage) {
        parentMessage.style.display = 'none';
        parentMessage.remove();
      }
    }
  });

  // 3. Дополнительно скрываем элементы с иконкой рекламы
  document.querySelectorAll('svg, img').forEach(el => {
    if (el.outerHTML && (el.outerHTML.includes('sponsored') || el.outerHTML.includes('promo'))) {
      const container = el.closest('div');
      if (container) container.remove();
    }
  });
}

// Запускаем сразу после загрузки
window.addEventListener('load', () => {
  blockAllAds();
  console.log('%c✅ Улучшенная блокировка рекламы активирована', 'color: lime; font-size: 14px;');
});

// Следим за всеми изменениями в чатах (Telegram динамически грузит сообщения)
const observer = new MutationObserver(blockAllAds);
observer.observe(document.body, { 
  childList: true, 
  subtree: true 
});

// Периодическая проверка каждые 700 мс
setInterval(blockAllAds, 700);