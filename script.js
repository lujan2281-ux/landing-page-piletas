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

/* ---------- "Ver más" en la galería (solo se nota en celular) ---------- */
const FOTOS_VISIBLES = 4;

document.querySelectorAll('.grid-galeria').forEach(function (grid) {
    const total = grid.querySelectorAll('.item-galeria').length;
    if (total <= FOTOS_VISIBLES) return;

    grid.classList.add('recortada');

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn-ver-mas';
    boton.textContent = 'Ver más fotos (' + (total - FOTOS_VISIBLES) + ')';
    boton.addEventListener('click', function () {
        grid.classList.remove('recortada');
        boton.remove();
    });
    grid.after(boton);
});

/* ---------- Barra de WhatsApp: se esconde si ya se ve otro botón de contacto ---------- */
const barra = document.querySelector('.barra-whatsapp');
const botonesContacto = document.querySelectorAll('.hero .btn-principal, .btn-footer');

if (barra && botonesContacto.length && 'IntersectionObserver' in window) {
    const visibles = new Set();

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) visibles.add(entrada.target);
            else visibles.delete(entrada.target);
        });
        barra.classList.toggle('barra-oculta', visibles.size > 0);
    });

    botonesContacto.forEach(function (boton) { observador.observe(boton); });
}