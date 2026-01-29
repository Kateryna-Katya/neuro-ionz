/**
 * Neuro-Ionz.life - Core Website Logic
 * Features: Mobile Menu, Smooth Reveal, Captcha, Form Validation, Cookies
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК ---
  if (window.lucide) {
      lucide.createIcons();
  }

  // --- 2. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ---
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (burger && mobileMenu) {
      const toggleMenu = () => {
          burger.classList.toggle('burger--active');
          mobileMenu.classList.toggle('mobile-menu--active');
          // Блокируем скролл при открытом меню
          document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
      };

      burger.addEventListener('click', toggleMenu);

      // Закрытие меню при клике на любую ссылку
      mobileLinks.forEach(link => {
          link.addEventListener('click', toggleMenu);
      });
  }

  // --- 3. ЭФФЕКТЫ ПРИ СКРОЛЛЕ (HEADER) ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (header) {
          if (window.scrollY > 50) {
              header.style.padding = '12px 0';
              header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
              header.style.background = 'rgba(255, 255, 255, 0.95)';
          } else {
              header.style.padding = '20px 0';
              header.style.boxShadow = 'none';
              header.style.background = 'rgba(240, 244, 248, 0.8)';
          }
      }
  });

  // --- 4. АНИМАЦИЯ HERO-СЕКЦИИ (STAGGER EFFECT) ---
  // Находим все элементы, которые должны появиться плавно
  const revealElements = [
      document.getElementById('hero-badge'),
      document.getElementById('hero-title'),
      document.getElementById('hero-desc'),
      document.getElementById('hero-btns'),
      document.getElementById('hero-img')
  ];

  revealElements.forEach((el, index) => {
      if (el) {
          // Добавляем базовый класс для анимации (из CSS)
          el.style.opacity = "0";
          el.style.transform = "translateY(30px)";
          el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

          // Запускаем появление с задержкой (stagger)
          setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
          }, 150 * (index + 1));
      }
  });

  // --- 5. ФОРМА КОНТАКТОВ И КАПЧА ---
  const form = document.getElementById('ai-form');
  const captchaLabel = document.getElementById('captcha-question');
  const statusBox = document.getElementById('form-status');

  if (form && captchaLabel) {
      // Генерация примера
      let n1 = Math.floor(Math.random() * 10) + 1;
      let n2 = Math.floor(Math.random() * 10) + 1;
      let correctAnswer = n1 + n2;
      captchaLabel.textContent = `${n1} + ${n2} = ?`;

      form.addEventListener('submit', function(e) {
          e.preventDefault();

          const phoneInput = document.getElementById('phone');
          const captchaInput = document.getElementById('captcha-input');
          const submitBtn = form.querySelector('.form__submit');

          // Валидация телефона (только цифры и +)
          const phoneValue = phoneInput.value.trim();
          if (!/^[0-9+ ]+$/.test(phoneValue)) {
              showStatus('Ошибка: Номер должен содержать только цифры и "+"', 'error');
              return;
          }

          // Проверка капчи
          if (parseInt(captchaInput.value) !== correctAnswer) {
              showStatus('Ошибка: Неверный ответ капчи!', 'error');
              return;
          }

          // Имитация отправки
          submitBtn.disabled = true;
          submitBtn.textContent = 'Обработка данных...';

          setTimeout(() => {
              showStatus('Успешно! Ваша заявка принята. Ожидайте звонка.', 'success');
              form.reset();
              submitBtn.disabled = false;
              submitBtn.textContent = 'Запросить доступ';

              // Обновляем капчу для безопасности
              n1 = Math.floor(Math.random() * 10) + 1;
              n2 = Math.floor(Math.random() * 10) + 1;
              correctAnswer = n1 + n2;
              captchaLabel.textContent = `${n1} + ${n2} = ?`;
          }, 1800);
      });
  }

  function showStatus(message, type) {
      if (statusBox) {
          statusBox.textContent = message;
          statusBox.className = `form__status form__status--${type}`;
          statusBox.style.display = 'block';

          // Скрываем сообщение через 5 секунд
          setTimeout(() => {
              statusBox.style.display = 'none';
          }, 5000);
      }
  }

  // --- 6. COOKIE POPUP (LOCALSTORAGE) ---
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptCookiesBtn = document.getElementById('acceptCookies');

  if (cookiePopup && acceptCookiesBtn) {
      // Проверяем, давал ли пользователь согласие ранее
      if (!localStorage.getItem('neuro_cookies_accepted')) {
          // Показываем через 3 секунды после загрузки
          setTimeout(() => {
              cookiePopup.classList.add('cookie-popup--active');
          }, 3000);
      }

      acceptCookiesBtn.addEventListener('click', () => {
          localStorage.setItem('neuro_cookies_accepted', 'true');
          cookiePopup.classList.remove('cookie-popup--active');
      });
  }

  // --- 7. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРЕЙ ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });
});