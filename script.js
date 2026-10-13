const header = document.querySelector('header');

function actualizarHeader() {
    header.classList.toggle('header-solido', window.scrollY > 40);
}

actualizarHeader();
window.addEventListener('scroll', actualizarHeader, { passive: true });