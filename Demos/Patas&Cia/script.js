/* =========================================================
   SCRIPT - MENU MOBILE E INTERações GLOBAIS
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const menuMobile = document.getElementById('menuMobile');
    const menu = document.getElementById('menu');

    if (menuMobile && menu) {
        menuMobile.addEventListener('click', () => {
            menu.classList.toggle('ativo');
            
            // Alterna o ícone do botão entre barras (fa-bars) e fechar (fa-xmark)
            const icone = menuMobile.querySelector('i');
            if (icone) {
                if (menu.classList.contains('ativo')) {
                    icone.classList.remove('fa-bars');
                    icone.classList.add('fa-xmark');
                } else {
                    icone.classList.remove('fa-xmark');
                    icone.classList.add('fa-bars');
                }
            }
        });

        // Fecha o menu ao clicar em qualquer link interno em telas pequenas
        const linksMenu = menu.querySelectorAll('a');
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('ativo');
                const icone = menuMobile.querySelector('i');
                if (icone) {
                    icone.classList.remove('fa-xmark');
                    icone.classList.add('fa-bars');
                }
            });
        });
    }
});


/* =========================================
   ANIMAÇÃO AO ROLAR A PÁGINA
========================================= */

const elementosRevelar = document.querySelectorAll(".revelar");

const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (
    movimentoReduzido ||
    !("IntersectionObserver" in window)
) {
    elementosRevelar.forEach((elemento) => {
        elemento.classList.add("visivel");
    });
} else {
    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");

                    observer.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    elementosRevelar.forEach((elemento) => {
        observador.observe(elemento);
    });
}


/* LIGHTBOX DA GALERIA */
const lightbox = document.getElementById("lightbox");

if (lightbox) {
    const imagemAmpliada = document.getElementById("lightboxImagem");
    const botaoFechar = document.getElementById("lightboxFechar");
    const botaoAnterior = document.getElementById("lightboxAnterior");
    const botaoProxima = document.getElementById("lightboxProxima");
    const contador = document.getElementById("lightboxContador");

    const itensGaleria = Array.from(
        document.querySelectorAll(".galeria-item")
    );

    const imagensGaleria = itensGaleria.map((item) =>
        item.querySelector("img")
    ).filter(Boolean);

    let indiceAtual = 0;
    let elementoAnteriorFocado = null;

    function mostrarImagem(indice) {
        indiceAtual =
            (indice + imagensGaleria.length) % imagensGaleria.length;

        const imagem = imagensGaleria[indiceAtual];

        imagemAmpliada.src = imagem.src;
        imagemAmpliada.alt = imagem.alt;
        contador.textContent =
            `${indiceAtual + 1} / ${imagensGaleria.length}`;
    }

    function abrirLightbox(indice) {
        if (imagensGaleria.length === 0) return;

        elementoAnteriorFocado = document.activeElement;

        mostrarImagem(indice);

        lightbox.classList.add("ativo");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        botaoFechar.focus();
    }

    function fecharLightbox() {
        lightbox.classList.remove("ativo");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        imagemAmpliada.removeAttribute("src");

        if (elementoAnteriorFocado) {
            elementoAnteriorFocado.focus();
        }
    }

    itensGaleria.forEach((item, indice) => {
        const botaoZoom = item.querySelector(".galeria-zoom");

        if (botaoZoom) {
            botaoZoom.addEventListener("click", () => {
                abrirLightbox(indice);
            });
        }

        // Também permite abrir clicando diretamente na foto.
        const imagem = item.querySelector("img");

        if (imagem) {
            imagem.style.cursor = "zoom-in";

            imagem.addEventListener("click", () => {
                abrirLightbox(indice);
            });
        }
    });

    botaoFechar.addEventListener("click", fecharLightbox);

    botaoAnterior.addEventListener("click", () => {
        mostrarImagem(indiceAtual - 1);
    });

    botaoProxima.addEventListener("click", () => {
        mostrarImagem(indiceAtual + 1);
    });

    // Fecha ao clicar no fundo escuro.
    lightbox.addEventListener("click", (evento) => {
        if (evento.target === lightbox) {
            fecharLightbox();
        }
    });

    // Teclado: Esc fecha; setas navegam pelas fotos.
    document.addEventListener("keydown", (evento) => {
        if (!lightbox.classList.contains("ativo")) return;

        if (evento.key === "Escape") {
            fecharLightbox();
        } else if (evento.key === "ArrowLeft") {
            mostrarImagem(indiceAtual - 1);
        } else if (evento.key === "ArrowRight") {
            mostrarImagem(indiceAtual + 1);
        }
    });
}