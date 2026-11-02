// ========================================
// MENU MOBILE
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {

    menuToggle.addEventListener("click", () => {

        const menuAberto = menu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", menuAberto);

        menuToggle.innerHTML = menuAberto
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        menuToggle.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );

    });

}

const linksMenu = document.querySelectorAll("a");

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

const botaoTopo = document.getElementById("voltar-topo");

if (botaoTopo) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            botaoTopo.classList.add("visivel");
        } else {
            botaoTopo.classList.remove("visivel");
        }
    });

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}