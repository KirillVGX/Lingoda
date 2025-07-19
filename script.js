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

document.addEventListener('DOMContentLoaded', initWrapper);

function initWrapper() {
  const track = document.getElementById('sliderWrapper');
  const nextBtn = document.getElementById('slideNext');
  const prevBtn = document.getElementById('slidePrev');
  const wrapper = document.getElementById('galleryWrapper');

  if (!track || !nextBtn || !prevBtn || !wrapper) return;

  nextBtn.addEventListener('click', () => {
    const firstCard = track.firstElementChild;
    if (firstCard) {
      track.appendChild(firstCard);
    }
  });

  prevBtn.addEventListener('click', () => {
    const lastCard = track.lastElementChild;
    if (lastCard) {
      track.insertBefore(lastCard, track.firstElementChild);
    }
  });
}

document.addEventListener("DOMContentLoaded", initVideoSlider);

function initVideoSlider() {
  const tracker = document.getElementById("sliderTrack-students");
  const originalOrder = Array.from(tracker.children);
  const leftBtn = document.getElementById("leftBtn-students");
  const centerBtn = document.getElementById("centerBtn-students");
  const rightBtn = document.getElementById("rightBtn-students");

  function temporarilyWhite(button) {
    button.checked = true;
    setTimeout(() => button.checked = false, 300);
  }

  function fadeSlide(direction) {
    const allSlides = Array.from(tracker.children);

    allSlides.forEach(el => {
      el.classList.remove("fade-in");
      el.classList.add("fade-out");
    });

    setTimeout(() => {
      if (direction === "left") {
        const first = tracker.firstElementChild;
        tracker.appendChild(first);
      } else if (direction === "right") {
        const last = tracker.lastElementChild;
        tracker.insertBefore(last, tracker.firstElementChild);
      }

      allSlides.forEach(el => el.classList.remove("fade-out"));
      requestAnimationFrame(() => {
        allSlides.forEach(el => el.classList.add("fade-in"));
      });
    }, 400); // должно совпадать с .fade-out
  }

  leftBtn.addEventListener("click", () => {
    temporarilyWhite(leftBtn);
    fadeSlide("left");
  });

  rightBtn.addEventListener("click", () => {
    temporarilyWhite(rightBtn);
    fadeSlide("right");
  });

  centerBtn.addEventListener("click", () => {
    temporarilyWhite(centerBtn);
    tracker.innerHTML = '';
    originalOrder.forEach(el => {
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
      tracker.appendChild(el);
    });
  });
}

document.addEventListener("DOMContentLoaded", initVideo);

function initVideo() {
  const allVideoCards = document.querySelectorAll('.video-content');

  allVideoCards.forEach(videoContainer => {
    const previewImg = videoContainer.querySelector('.preview-img');
    const video = videoContainer.querySelector('.preview-video');
    const playBtn = videoContainer.querySelector('.play-button');
    const playIcon = videoContainer.querySelector('.play-icon');
    const pauseIcon = videoContainer.querySelector('.pause-icon');

    playBtn.addEventListener('click', () => {
      if (video.paused) {
        allVideoCards.forEach(vc => {
          const otherVideo = vc.querySelector('.preview-video');
          const otherImg = vc.querySelector('.preview-img');
          const otherPlayIcon = vc.querySelector('.play-icon');
          const otherPauseIcon = vc.querySelector('.pause-icon');

          otherVideo.pause();
          otherVideo.currentTime = 0;
          otherVideo.style.display = 'none';
          otherImg.style.display = 'block';
          otherPlayIcon.style.display = 'block';
          otherPauseIcon.style.display = 'none';
        });

        previewImg.style.display = 'none';
        video.style.display = 'block';
        video.currentTime = 0;
        video.play();

        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';

      } else {
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
        previewImg.style.display = 'block';

        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    });

    video.addEventListener('ended', () => {
      video.style.display = 'none';
      previewImg.style.display = 'block';
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    });
  });
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
        initWrapper();
      }

      if (html === 'student-success') {
        initVideoSlider();
        initVideo();
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
