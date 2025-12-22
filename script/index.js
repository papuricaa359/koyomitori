window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#headermenu li a');
    let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - (window.innerHeight * 0.4)) {
        current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
        link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
        link.classList.add('active');
    }
  });
});