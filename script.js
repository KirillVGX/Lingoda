const components = [
  { html: 'header', css: 'header' },
  { html: 'main-content', css: 'main-content' },
  { html: 'second-screen', css: 'second' },
  { html: 'student-success', css: 'students-success' },
  { html: 'white-section', css: 'white' }
];

const root = document.getElementById('root');

function resetTransforms() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.transform = '';
    card.style.zIndex = '';
    card.style.filter = '';
  });

  if (cards[0]) {
    cards[0].style.transform = 'scale(1.4)';
    cards[0].style.zIndex = '3';
  }
  if (cards[1]) {
    cards[1].style.transform = 'scale(1.32) translateX(clamp(-40px, -2.08vw, -70px))';
    cards[1].style.zIndex = '2';
    cards[1].style.filter = 'brightness(0.5)';
  }
  if (cards[2]) {
    cards[2].style.transform = 'scale(1.28) translateX(clamp(-96px, -4.16vw, -120px))';
    cards[2].style.zIndex = '1';
    cards[2].style.filter = 'brightness(0.4)';
  }
}

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
      card.style.transform = `translateX(${index * offsetX}px) translateY(${index * offsetY}px)`;
      card.style.zIndex = cards.length - index;
    });

    requestAnimationFrame(() => updateButtonPosition());
  }

  function updateButtonPosition() {
    const topCard = cards[0];
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

  requestAnimationFrame(() => updatePositions());
}

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

      if (html === 'second-screen') {
        initCarousel();
      }

    } catch (err) {
      console.error(`Ошибка загрузки ${html}.html:`, err);
    }
  }
}
loadComponentsSequentially();