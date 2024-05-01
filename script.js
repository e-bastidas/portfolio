const introContainer = document.querySelector('.parallax-container');
const sectionElement = document.querySelector('#about');
const translate = document.querySelectorAll('.translate');
const paragraphText = document.querySelectorAll('.paragraph-line');
const rightSideElement = document.querySelectorAll('.right-side-element');
const toolParagraph = document.querySelectorAll('.tool-paragraph');
const toolLogo = document.querySelectorAll('.tool-logo');
const introParagraphSlide = document.querySelectorAll('.text-slide');
const projectThumbnail = document.querySelectorAll('.project-thumbnail');
const aboutSection = document.querySelector('#about');
const toolsSection = document.querySelector('#projects');
const toolsIntro = document.querySelector('.tools-intro');
const contactSection = document.querySelector('#contact');

const introOptions = {
  root: null,
  threshold: 0.33
};

const thumbnailOptions = {
  root: null,
  threshold: 0.5
};

const introObserver = new IntersectionObserver(reveal('active'), introOptions);
const leftElementObserver = new IntersectionObserver(reveal('show-left'));
const rightElementObserver = new IntersectionObserver(reveal('show-right'));
const toolTitleObserver = new IntersectionObserver(reveal('tool-paragraph-animation'), introOptions);
const toolLogoObserver = new IntersectionObserver(reveal('logo-animation'));
const projectThumbnailObserver = new IntersectionObserver(reveal('project-thumbnail-animation'), thumbnailOptions);

function setupIntersectionObserver(primaryElement, secondaryElements, observer, mobileOnly = false) {
  const isMobile = mobileOnly && window.matchMedia('(max-width: 600px)').matches;
  if (mobileOnly && !isMobile) {
    return;
  }
  const visibilityObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        observer.disconnect();
      } else {
        secondaryElements.forEach(element => observer.observe(element));
      }
    });
  });
  visibilityObserver.observe(primaryElement);
}

function reveal(className) {
  return function(entries) {
    entries.forEach(entry => {
      entry.target.classList.toggle(className, entry.isIntersecting);
    });
  };
}


let previousScrollPos = window.pageYOffset;

function parallaxIntro() {
  const section = document.querySelector('#intro');
  if (section) {
    const images = document.querySelectorAll('.translate');
    const scrollPos = window.pageYOffset;
    const windowHeight = window.innerHeight;
    let sectionRect = section.getBoundingClientRect();
    let sectionTop = sectionRect.top;
    let sectionHeight = sectionRect.height;
    const sectionInView = sectionTop <= windowHeight && sectionTop + sectionHeight >= 0;
    if (sectionInView) {
      const sectionEnd = sectionTop + sectionHeight;
      if (scrollPos >= sectionEnd) {
        images.forEach(image => {
          let speed = parseFloat(image.getAttribute('data-speed'));
          let translateY = -((scrollPos - sectionEnd) * speed);
          image.style.transform = `translateY(${translateY}px)`;

        })
      }
    }
  }
} 

window.addEventListener('scroll', () => {
  parallaxIntro()
  let currentScrollPos = window.pageYOffset;
  if (previousScrollPos > currentScrollPos){
    document.querySelector('#nav').style.top = '0';
  } else {
    document.querySelector('#nav').style.top = '-20vh';
  }
  previousScrollPos = currentScrollPos
})

setupIntersectionObserver(introContainer, introParagraphSlide, introObserver);
setupIntersectionObserver(aboutSection, paragraphText, leftElementObserver);
setupIntersectionObserver(aboutSection, rightSideElement, rightElementObserver);
setupIntersectionObserver(toolsIntro, paragraphText, rightElementObserver);
setupIntersectionObserver(contactSection, paragraphText, leftElementObserver);
setupIntersectionObserver(contactSection, rightSideElement, rightElementObserver);
setupIntersectionObserver(toolsSection, toolParagraph, toolTitleObserver);
setupIntersectionObserver(toolsSection, toolLogo, toolLogoObserver);
setupIntersectionObserver(toolsSection, projectThumbnail, projectThumbnailObserver, mobileOnly = true)