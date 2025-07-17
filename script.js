const components = [
  { html: 'header', css: 'header' },
  { html: 'main-content', css: 'main-content' },
  { html: 'second-screen', css: 'second' },
  { html: 'student-success', css: 'students-success' },
  { html: 'white-section', css: 'white' },
  { html: 'questions', css: 'questions' },
  { html: 'footer', css: 'footer' }
];

document.addEventListener('DOMContentLoaded', initCarousel);

function initCarouselMain() {
  const container = document.getElementById('sliderContainer');
  const track = document.getElementById('sliderTrack');
  const button = document.getElementById('nextBtnMain');

  if (!container || !track || !button) return;

  function applyTransforms() {
    const cards = Array.from(track.children);

    cards.forEach((card, i) => {
      card.style.transition = 'transform .4s ease, filter .4s ease';
      card.style.zIndex = 3 - i;
      card.style.filter = 'brightness(0.2)';
      card.style.transform = 'scale(.8)';

      if (i === 0) {
        card.style.transform = 'scale(1.4)';
        card.style.filter = 'brightness(1)';
      }
      if (i === 1) {
        card.style.transform = 'scale(1.4) translateX(1vw)';
        card.style.filter = 'brightness(.5)';
      }
      if (i === 2) {
        card.style.transform = 'scale(1.4) translateX(2vw)';
        card.style.filter = 'brightness(.4)';
      }
    });
  }

  function placeButton() {
    const middle = track.children[1];
    if (!middle) return;

    const midRect = middle.getBoundingClientRect();
    const wrapRect = container.getBoundingClientRect();

    const scale = window.innerWidth <= 633 ? 2 : 1;

    const x = (midRect.right - wrapRect.left) / scale - 22.5;
    const y = (midRect.top - wrapRect.top + midRect.height / 2) / scale;

    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  }

  function slideNext() {
    track.appendChild(track.firstElementChild);
    applyTransforms();
    requestAnimationFrame(placeButton);
  }

  button.addEventListener('click', slideNext);
  window.addEventListener('resize', () => requestAnimationFrame(placeButton));

  applyTransforms();
  requestAnimationFrame(placeButton);

  Array.from(container.querySelectorAll('.card img')).forEach(img => {
    img.addEventListener('load', () => {
      requestAnimationFrame(placeButton);
    });
  });

  setTimeout(() => {
    requestAnimationFrame(placeButton);
  }, 300);
}

document.addEventListener('DOMContentLoaded', initCarousel);

function initCarousel() {
  const track = document.getElementById('sliderTrackSecond');
  const button = document.getElementById('nextBtn');
  const wrapper = document.getElementById('carouselWrapper');

  if (!track || !button || !wrapper) return;

  let cards = Array.from(track.children);
  const offsetX = 20;
  const offsetY = 10;

  function updatePositions() {
    cards.forEach((card, index) => {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = `translateX(${index * offsetX}px) translateY(${index * offsetY}px)`;
      card.style.zIndex = cards.length - index;
    });

    requestAnimationFrame(updateButtonPosition);
  }

  function updateButtonPosition() {
    const topCard = cards[0];
    if (!topCard) return;

    const cardRect = topCard.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const centerX = cardRect.left + cardRect.width / 2 - wrapperRect.left;
    const centerY = cardRect.top + cardRect.height / 2 - wrapperRect.top;

    button.style.left = `${centerX}px`;
    button.style.top = `${centerY}px`;
  }

  function moveToNext() {
    const firstCard = cards.shift();
    cards.push(firstCard);
    track.appendChild(firstCard);
    updatePositions();
  }

  button.addEventListener('click', moveToNext);
  window.addEventListener('resize', () => requestAnimationFrame(updateButtonPosition));

  Array.from(track.querySelectorAll('img')).forEach(img => {
    img.addEventListener('load', () => {
      requestAnimationFrame(updateButtonPosition);
    });
  });

  setTimeout(() => {
    requestAnimationFrame(updateButtonPosition);
  }, 300);

  requestAnimationFrame(updatePositions);
}

function initFAQToggle() {
  const allItems = document.querySelectorAll('.faq-item');

  allItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      allItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

const root = document.getElementById('root');

async function loadComponentsSequentially() {
  for (const { html, css } of components) {
    try {
      const res = await fetch(`components/${html}.html`);
      const htmlContent = await res.text();

      const div = document.createElement('div');
      div.innerHTML = htmlContent;
      root.appendChild(div);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `css/${css}.css`;
      document.head.appendChild(link);

      if (html === 'main-content') {
        initCarouselMain();
      }

      if (html === 'second-screen') {
        initCarousel();
      }

      if (html === 'questions') {
        initFAQToggle();
      }

    } catch (err) {
      console.error(`Ошибка загрузки ${html}.html:`, err);
    }
  }
}
loadComponentsSequentially();