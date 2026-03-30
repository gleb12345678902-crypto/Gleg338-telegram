// Блокировка всей рекламы в Telegram Web K
function blockAds() {
  // Основные селекторы sponsored-сообщений
  document.querySelectorAll('.sponsored-message, [data-is-sponsored], .tg-sponsored, .promo').forEach(el => {
    el.style.display = 'none';
    el.remove();
  });

  // Поиск по тексту "Sponsored", "Реклама" и подобным
  document.querySelectorAll('div, span').forEach(el => {
    const txt = (el.textContent || '').trim();
    if (txt.includes('Sponsored') || txt.includes('Реклама') || 
        txt.includes('sponsored') || txt.includes('Промо') || 
        txt.includes('Sponsored by')) {
      const message = el.closest('.message, .chat-item, div[role="listitem"]');
      if (message) {
        message.style.display = 'none';
        message.remove();
      }
    }
  });
}

// Запускаем сразу + следим за динамической подгрузкой сообщений
const observer = new MutationObserver(blockAds);
observer.observe(document.body, { childList: true, subtree: true });

// Дополнительно проверяем каждую секунду
setInterval(blockAds, 800);

console.log('%c✅ Блокировка рекламы Telegram активирована', 'color: lime; font-weight: bold');