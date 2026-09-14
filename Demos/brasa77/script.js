/* =========================================================
   BRASA 77 — SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav-list a");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("active");

            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute("aria-expanded", isOpen);

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                document.body.classList.remove("menu-open");

                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }

            });

        });

    }


    /* =====================================================
       FECHAR MENU COM ESC
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (nav) {
                nav.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }

            }

        }

    });


    /* =====================================================
       FILTRO DO CARDÁPIO
       ===================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".product-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.category;

            /* Remove active dos outros botões */

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            /* Ativa o botão clicado */

            button.classList.add("active");

            /* Filtra os produtos */

            products.forEach(product => {

                const productCategory = product.dataset.category;

                if (
                    category === "todos" ||
                    productCategory === category
                ) {

                    product.classList.remove("hidden");

                } else {

                    product.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       CARRINHO
       ===================================================== */

    const cartButton = document.querySelector(".cart-button");
    const cart = document.querySelector(".cart");
    const cartClose = document.querySelector(".cart-close");
    const cartOverlay = document.querySelector(".cart-overlay");

    const cartItemsContainer =
        document.querySelector(".cart-items");

    const cartCount =
        document.querySelector(".cart-count");

    const cartTotal =
        document.querySelector(".cart-total strong");

    const checkoutButton =
        document.querySelector(".checkout-button");


    /* =====================================================
       ESTADO DO CARRINHO
       ===================================================== */

    let cartItems = [];


    /* =====================================================
       ABRIR CARRINHO
       ===================================================== */

    function openCart() {

        if (!cart) return;

        cart.classList.add("active");

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }

        document.body.classList.add("cart-open");

    }


    /* =====================================================
       FECHAR CARRINHO
       ===================================================== */

    function closeCart() {

        if (!cart) return;

        cart.classList.remove("active");

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

        document.body.classList.remove("cart-open");

    }


    if (cartButton) {
        cartButton.addEventListener("click", openCart);
    }

    if (cartClose) {
        cartClose.addEventListener("click", closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCart);
    }


    /* =====================================================
       ADICIONAR PRODUTO
       ===================================================== */

    const addButtons =
        document.querySelectorAll(".add-product");

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const name = button.dataset.name;

            const price =
                parseFloat(button.dataset.price);

            if (!name || isNaN(price)) {
                return;
            }

            const existingProduct =
                cartItems.find(item => item.name === name);

            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cartItems.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }

            updateCart();

            openCart();

        });

    });


    /* =====================================================
       ATUALIZAR CARRINHO
       ===================================================== */

    function updateCart() {

        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = "";

        if (cartItems.length === 0) {

            cartItemsContainer.innerHTML = `
                <p class="cart-empty">
                    Seu carrinho está vazio.
                </p>
            `;

            updateCartTotal();

            return;
        }


        cartItems.forEach((item, index) => {

            const itemElement =
                document.createElement("div");

            itemElement.classList.add("cart-item");

            const subtotal =
                item.price * item.quantity;

            itemElement.innerHTML = `

                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <span>
                        ${formatPrice(subtotal)}
                    </span>

                </div>

                <div class="cart-item-actions">

                    <button
                        class="quantity-btn decrease"
                        type="button"
                        data-index="${index}"
                        aria-label="Diminuir quantidade"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>

                    <span class="quantity">
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-btn increase"
                        type="button"
                        data-index="${index}"
                        aria-label="Aumentar quantidade"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                    <button
                        class="cart-item-remove"
                        type="button"
                        data-index="${index}"
                        aria-label="Remover ${item.name}"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            `;

            cartItemsContainer.appendChild(itemElement);

        });


        /* Eventos dos botões */

        const increaseButtons =
            cartItemsContainer.querySelectorAll(".increase");

        const decreaseButtons =
            cartItemsContainer.querySelectorAll(".decrease");

        const removeButtons =
            cartItemsContainer.querySelectorAll(".cart-item-remove");


        increaseButtons.forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                cartItems[index].quantity++;

                updateCart();

            });

        });


        decreaseButtons.forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                if (cartItems[index].quantity > 1) {

                    cartItems[index].quantity--;

                } else {

                    cartItems.splice(index, 1);

                }

                updateCart();

            });

        });


        removeButtons.forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                cartItems.splice(index, 1);

                updateCart();

            });

        });


        updateCartTotal();

    }


    /* =====================================================
       ATUALIZAR TOTAL
       ===================================================== */

    function updateCartTotal() {

        const total =
            cartItems.reduce(
                (sum, item) =>
                    sum + (item.price * item.quantity),
                0
            );


        if (cartTotal) {
            cartTotal.textContent =
                formatPrice(total);
        }


        if (cartCount) {

            const quantity =
                cartItems.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                );

            cartCount.textContent = quantity;

        }

    }


    /* =====================================================
       FORMATAR PREÇO
       ===================================================== */

    function formatPrice(value) {

        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }


    /* =====================================================
       FINALIZAR PEDIDO
       ===================================================== */

    if (checkoutButton) {

        checkoutButton.addEventListener("click", () => {

            if (cartItems.length === 0) {

                alert(
                    "Seu carrinho está vazio. Adicione algum produto antes de finalizar o pedido."
                );

                return;

            }


            let message =
                "🍔 *BRASA 77 — NOVO PEDIDO*%0A%0A";


            cartItems.forEach(item => {

                const subtotal =
                    item.price * item.quantity;

                message +=
                    `• ${item.quantity}x ${item.name} — ${formatPrice(subtotal)}%0A`;

            });


            const total =
                cartItems.reduce(
                    (sum, item) =>
                        sum + (item.price * item.quantity),
                    0
                );


            message +=
                `%0A🔥 *TOTAL: ${formatPrice(total)}*%0A%0A`;

            message +=
                "Olá! Gostaria de realizar este pedido. 🍔";


            const phone =
                "5511999999999";


            const whatsappURL =
                `https://wa.me/${phone}?text=${message}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    /* =====================================================
       HEADER AO ROLAR
       ===================================================== */

    const header =
        document.querySelector(".header");


    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 10px 35px rgba(0, 0, 0, 0.25)";

        } else {

            header.style.boxShadow = "none";

        }

    });


    /* =====================================================
       NAVEGAÇÃO ATIVA
       ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");


    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );


    updateActiveLink();


    /* =====================================================
       RESPONSIVIDADE DO MENU
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            if (nav) {
                nav.classList.remove("active");
            }

            document.body.classList.remove(
                "menu-open"
            );

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.add("fa-bars");

                    icon.classList.remove(
                        "fa-xmark"
                    );

                }

            }

        }

    });


    /* =====================================================
       INICIALIZAÇÃO
       ===================================================== */

    updateCart();

});