const header = document.querySelector('header');

function actualizarHeader() {
    header.classList.toggle('header-solido', window.scrollY > 40);
}

actualizarHeader();
window.addEventListener('scroll', actualizarHeader, { passive: true });

/* ---------- Lightbox de la galería ---------- */
const lb = document.createElement('dialog');
lb.className = 'lightbox';
lb.innerHTML = '<button class="lb-cerrar" aria-label="Cerrar">&times;</button>' +
    '<button class="lb-prev" aria-label="Foto anterior">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-sig" aria-label="Foto siguiente">&#8250;</button>';
document.body.append(lb);

const lbImg = lb.querySelector('img');
let fotos = [];
let actual = 0;

function mostrar(n) {
    actual = (n + fotos.length) % fotos.length;
    lbImg.src = fotos[actual].src;
    lbImg.alt = fotos[actual].alt;
}

document.querySelectorAll('.grid-galeria').forEach(function (grid) {
    const imgs = Array.from(grid.querySelectorAll('img'));
    imgs.forEach(function (img, n) {
        img.addEventListener('click', function () {
            fotos = imgs;
            mostrar(n);
            lb.showModal();
        });
    });
});

lb.addEventListener('click', function (e) {
    if (e.target.classList.contains('lb-prev')) mostrar(actual - 1);
    else if (e.target.classList.contains('lb-sig')) mostrar(actual + 1);
    else if (e.target !== lbImg) lb.close();
});

document.addEventListener('keydown', function (e) {
    if (!lb.open) return;
    if (e.key === 'ArrowRight') mostrar(actual + 1);
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
});