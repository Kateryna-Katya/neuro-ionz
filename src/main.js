document.addEventListener('DOMContentLoaded', () => {
  // Инициализация иконок Lucide
  lucide.createIcons();

  // Скролл-эффект для хедера
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.padding = '12px 0';
          header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
      } else {
          header.style.padding = '20px 0';
          header.style.boxShadow = 'none';
      }
  });

  // Будущая логика для мобильного меню
  const burger = document.querySelector('.burger');
  burger.addEventListener('click', () => {
      console.log('Mobile menu toggled');
  });
});