setTimeout(() => {
  fadeOutPreloader(document.getElementById('preloader'), 69);
}, 1500);

$(document).ready(() => {
  $(window).on('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  // Load particles
  particlesJS.load('landing', 'assets/particles.json', () => {});

  // Typing Text
  const element = document.getElementById('txt-rotate');
  const toRotate = element.getAttribute('data-rotate');
  const period = element.getAttribute('data-period');
  setTimeout(() => {
    new TxtRotate(element, JSON.parse(toRotate), period);
  }, 1500);

  // Inject CSS
  const css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '#txt-rotate > .wrap { border-right: 0.08em solid #666 }';
  document.body.appendChild(css);

  // Initialize AOS
  AOS.init({
    disable: 'mobile',
    offset: 200,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
    once: true
  });

  randomizeOrder();
});

/* FUNCTIONS */

// Preloader
function fadeOutPreloader(element, duration) {
  try {
    let opacity = 1;
    function fade() {
      if (opacity <= 0) {
        element.style.zIndex = 0;
        element.style.opacity = 0;
        element.style.filter = 'alpha(opacity = 0)';

        // Allow horizontal scroll
        document.documentElement.style.overflowY = 'auto';

        // Remove preloader div
        document.getElementById('preloader').remove();

        clearInterval(interval);
      } else {
        opacity -= 0.1;
        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity = ' + opacity * 100 + ')';
        requestAnimationFrame(fade);
      }
    }
    fade();
  } catch (error) {
    console.error('Error in fadeOutPreloader: ', error);
  }
}

// Typing Text
class TxtRotate {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 5;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      this.tick();
    }, delta);
  }
}

// Word Cloud
function randomizeOrder() {
  const parent = document.getElementById('skills');
  const divs = parent.getElementsByTagName('div');
  const frag = document.createDocumentFragment();

  // Randomize order of skills
  while (divs.length) {
    frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
  }
  parent.appendChild(frag);
}
