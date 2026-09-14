(() => {
  const carousel = document.querySelector('.bundles-media');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.bundles-slide')];
  const dots = [...carousel.querySelectorAll('.bundles-dot')];
  if (slides.length < 2) return;
  let current = 0;
  let timer;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
      dots[i].setAttribute('aria-current', String(i === current));
    });
  }

  function restart() {
    clearInterval(timer);
    if (!document.hidden) timer = setInterval(() => show(current + 1), 3000);
  }

  function select(index) {
    show(index);
    restart();
  }

  carousel.querySelector('.bundles-arrow--prev').addEventListener('click', () => select(current - 1));
  carousel.querySelector('.bundles-arrow--next').addEventListener('click', () => select(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => select(i)));
  document.addEventListener('visibilitychange', restart);
  show(0);
  restart();
})();
