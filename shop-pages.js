/* =====================================================
   KISSKRISS — ОБЩИЙ SHOP SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       DATA
    ================================================= */

    const products = {

        "Glow Serum": {
            price: 2990,
            image: "images/Glow-Serum.png"
        },

        "Hydra Cream": {
            price: 2490,
            image: "images/hydra-crem.png"
        },

        "Silky Toner": {
            price: 1690,
            image: "images/Silky Toner .png"
        },

        "Cloud Mask": {
            price: 2290,
            image: "images/Cloud Mask .png"
        },

        "Silk Essence": {
            price: 1990,
            image: "images/Silk Essense .png"
        },

        "Soft Kiss": {
            price: 1590,
            image: "images/Soft Kiss .png"
        },

        "Soft Cleanser": {
            price: 1890,
            image: ""
        },

        "Blush Cream": {
            price: 2990,
            image: "images/Blush Cream.png"
        }

    };


    /* =================================================
       STORAGE
    ================================================= */

    let cart = JSON.parse(
        localStorage.getItem("kisskriss-cart") || "[]"
    );

    let favorites = JSON.parse(
        localStorage.getItem("kisskriss-favorites") || "[]"
    );


    function saveCart() {
        localStorage.setItem(
            "kisskriss-cart",
            JSON.stringify(cart)
        );
    }


    function saveFavorites() {
        localStorage.setItem(
            "kisskriss-favorites",
            JSON.stringify(favorites)
        );
    }


    /* =================================================
       HEADER
    ================================================= */

    const header = document.createElement("header");

    header.className = "shop-header";

    header.innerHTML = `

        <button
            class="shop-menu-button"
            id="shopMenuOpen"
            aria-label="Открыть меню"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>


        <a
            href="index.html"
            class="shop-logo"
        >
            KISSKRISS
        </a>


        <div class="shop-actions">

            <button
                class="shop-action"
                id="shopFavoritesOpen"
                aria-label="Избранное"
            >
                <span>♡</span>
                <span
                    class="shop-count"
                    id="shopFavoritesCount"
                >
                    0
                </span>
            </button>


            <button
                class="shop-action"
                id="shopCartOpen"
                aria-label="Корзина"
            >
                <span>bag</span>
                <span
                    class="shop-count"
                    id="shopCartCount"
                >
                    0
                </span>
            </button>

        </div>

    `;

    document.body.prepend(header);


    /* =================================================
       MENU
    ================================================= */

    const menuOverlay = document.createElement("div");

    menuOverlay.className = "shop-menu-overlay";

    const menu = document.createElement("aside");

    menu.className = "shop-menu";

    menu.innerHTML = `

        <div class="shop-menu-header">

            <span>МЕНЮ</span>

            <button
                class="shop-menu-close"
                id="shopMenuClose"
            >
                ×
            </button>

        </div>


        <div class="shop-menu-content">

            <a
                href="login.html"
                class="shop-menu-link"
            >
                <span>ВОЙТИ</span>
                <span>↗</span>
            </a>


            <div class="shop-catalog">

                <button
                    class="shop-menu-catalog-button"
                    id="shopCatalogButton"
                >
                    <span>КАТАЛОГ</span>

                    <span class="shop-catalog-arrow">
                        ↓
                    </span>
                </button>


                <div class="shop-submenu">

                    <a href="serums.html">
                        СЫВОРОТКИ
                    </a>

                    <a href="creams.html">
                        КРЕМЫ
                    </a>

                    <a href="toners.html">
                        ТОНЕРЫ
                    </a>

                    <a href="masks.html">
                        МАСКИ
                    </a>

                    <a href="essence.html">
                        ЭССЕНЦИЯ
                    </a>

                    <a href="lipsticks.html">
                        ПОМАДЫ
                    </a>

                </div>

            </div>


            <a
                href="about.html"
                class="shop-menu-link"
            >
                О БРАНДЕ
            </a>


            <a
                href="gifts.html"
                class="shop-menu-link"
            >
                ПОДАРОЧНЫЕ КАРТЫ
            </a>


            <a
                href="delivery.html"
                class="shop-menu-link"
            >
                ДОСТАВКА И ОПЛАТА
            </a>


            <a
                href="contacts.html"
                class="shop-menu-link"
            >
                КОНТАКТЫ
            </a>

        </div>


        <div class="shop-menu-bottom">

            <span>KISSKRISS</span>

            <span>
                BEAUTY / CARE / RITUAL
            </span>

        </div>

    `;

    document.body.appendChild(menuOverlay);
    document.body.appendChild(menu);


    const menuOpen =
        document.getElementById("shopMenuOpen");

    const menuClose =
        document.getElementById("shopMenuClose");

    const catalogButton =
        document.getElementById("shopCatalogButton");

    const catalog =
        document.querySelector(".shop-catalog");


    function openMenu() {

        menu.classList.add("active");
        menuOverlay.classList.add("active");

    }


    function closeMenu() {

        menu.classList.remove("active");
        menuOverlay.classList.remove("active");

    }


    menuOpen.addEventListener("click", openMenu);

    menuClose.addEventListener("click", closeMenu);

    menuOverlay.addEventListener("click", closeMenu);


    catalogButton.addEventListener("click", () => {

        catalog.classList.toggle("open");

    });


    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    /* =================================================
       CART HTML
    ================================================= */

    const cartOverlay = document.createElement("div");

    cartOverlay.className = "shop-panel-overlay";


    const cartPanel = document.createElement("aside");

    cartPanel.className = "shop-panel";

    cartPanel.innerHTML = `

        <div class="shop-panel-header">

            <span class="shop-panel-title">
                КОРЗИНА
            </span>

            <button
                class="shop-panel-close"
                id="shopCartClose"
            >
                ×
            </button>

        </div>


        <div
            class="shop-panel-body"
            id="shopCartItems"
        ></div>


        <div class="shop-panel-footer">

            <div class="shop-total">

                <span>
                    ИТОГО
                </span>

                <strong id="shopCartTotal">
                    0 ₽
                </strong>

            </div>


            <button
                class="shop-checkout"
                id="shopCheckout"
            >
                Перейти к оформлению
            </button>

        </div>

    `;


    document.body.appendChild(cartOverlay);
    document.body.appendChild(cartPanel);


    /* =================================================
       FAVORITES HTML
    ================================================= */

    const favoritesOverlay =
        document.createElement("div");

    favoritesOverlay.className =
        "shop-panel-overlay";


    const favoritesPanel =
        document.createElement("aside");

    favoritesPanel.className =
        "shop-panel";

    favoritesPanel.innerHTML = `

        <div class="shop-panel-header">

            <span class="shop-panel-title">
                ИЗБРАННОЕ
            </span>

            <button
                class="shop-panel-close"
                id="shopFavoritesClose"
            >
                ×
            </button>

        </div>


        <div
            class="shop-panel-body"
            id="shopFavoritesItems"
        ></div>

    `;


    document.body.appendChild(favoritesOverlay);
    document.body.appendChild(favoritesPanel);


    /* =================================================
       OPEN / CLOSE
    ================================================= */

    function closeAllPanels() {

        cartPanel.classList.remove("active");
        cartOverlay.classList.remove("active");

        favoritesPanel.classList.remove("active");
        favoritesOverlay.classList.remove("active");

    }


    document
        .getElementById("shopCartOpen")
        .addEventListener("click", () => {

            closeAllPanels();

            cartPanel.classList.add("active");
            cartOverlay.classList.add("active");

        });


    document
        .getElementById("shopCartClose")
        .addEventListener("click", closeAllPanels);


    cartOverlay.addEventListener(
        "click",
        closeAllPanels
    );


    document
        .getElementById("shopFavoritesOpen")
        .addEventListener("click", () => {

            closeAllPanels();

            favoritesPanel.classList.add("active");
            favoritesOverlay.classList.add("active");

        });


    document
        .getElementById("shopFavoritesClose")
        .addEventListener(
            "click",
            closeAllPanels
        );


    favoritesOverlay.addEventListener(
        "click",
        closeAllPanels
    );


    /* =================================================
       CART
    ================================================= */

    function addToCart(name) {

        const product = products[name];

        if (!product) return;


        const existing =
            cart.find(item => item.name === name);


        if (existing) {

            existing.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: product.price,
                image: product.image,
                quantity: 1
            });

        }


        saveCart();

        updateCart();

        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");

    }


    function updateCart() {

        const container =
            document.getElementById("shopCartItems");

        let total = 0;
        let count = 0;


        if (cart.length === 0) {

            container.innerHTML = `
                <div class="shop-empty">
                    Ваша корзина пока пуста
                </div>
            `;

        } else {

            container.innerHTML = "";


            cart.forEach((item, index) => {

                total +=
                    item.price * item.quantity;

                count += item.quantity;


                const itemElement =
                    document.createElement("div");

                itemElement.className =
                    "shop-cart-item";


                itemElement.innerHTML = `

                    <div class="shop-cart-image">

                        ${
                            item.image
                            ?
                            `<img
                                src="${item.image}"
                                alt="${item.name}"
                            >`
                            :
                            ""
                        }

                    </div>


                    <div>

                        <h3 class="shop-cart-name">
                            ${item.name}
                        </h3>

                        <div class="shop-cart-price">
                            ${item.price.toLocaleString("ru-RU")} ₽
                        </div>


                        <div class="shop-cart-controls">

                            <button
                                data-minus="${index}"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                data-plus="${index}"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="shop-cart-remove"
                        data-remove="${index}"
                    >
                        ×
                    </button>

                `;


                container.appendChild(itemElement);

            });

        }


        document.getElementById(
            "shopCartTotal"
        ).textContent =
            total.toLocaleString("ru-RU") + " ₽";


        document.getElementById(
            "shopCartCount"
        ).textContent = count;


        document.getElementById(
            "shopFavoritesCount"
        ).textContent =
            favorites.length;


        container
            .querySelectorAll("[data-minus]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(button.dataset.minus);

                        if (
                            cart[index].quantity > 1
                        ) {

                            cart[index].quantity -= 1;

                        } else {

                            cart.splice(index, 1);

                        }

                        saveCart();
                        updateCart();

                    }
                );

            });


        container
            .querySelectorAll("[data-plus]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(button.dataset.plus);

                        cart[index].quantity += 1;

                        saveCart();
                        updateCart();

                    }
                );

            });


        container
            .querySelectorAll("[data-remove]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(button.dataset.remove);

                        cart.splice(index, 1);

                        saveCart();
                        updateCart();

                    }
                );

            });

    }


    /* =================================================
       FAVORITES
    ================================================= */

    function toggleFavorite(name) {

        if (favorites.includes(name)) {

            favorites =
                favorites.filter(
                    item => item !== name
                );

        } else {

            favorites.push(name);

        }


        saveFavorites();

        updateFavorites();

        updateFavoriteButtons();

    }


    function updateFavorites() {

        const container =
            document.getElementById(
                "shopFavoritesItems"
            );


        if (favorites.length === 0) {

            container.innerHTML = `
                <div class="shop-empty">
                    Здесь пока ничего нет
                </div>
            `;

        } else {

            container.innerHTML = "";


            favorites.forEach(name => {

                const product =
                    products[name];

                if (!product) return;


                const item =
                    document.createElement("div");

                item.className =
                    "shop-cart-item";


                item.innerHTML = `

                    <div class="shop-cart-image">

                        ${
                            product.image
                            ?
                            `<img
                                src="${product.image}"
                                alt="${name}"
                            >`
                            :
                            ""
                        }

                    </div>


                    <div>

                        <h3 class="shop-cart-name">
                            ${name}
                        </h3>

                        <div class="shop-cart-price">
                            ${product.price.toLocaleString("ru-RU")} ₽
                        </div>

                    </div>


                    <button
                        class="shop-cart-remove"
                        data-fav-remove="${name}"
                    >
                        ×
                    </button>

                `;


                container.appendChild(item);

            });

        }


        document.getElementById(
            "shopFavoritesCount"
        ).textContent =
            favorites.length;


        container
            .querySelectorAll("[data-fav-remove]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        toggleFavorite(
                            button.dataset.favRemove
                        );

                    }
                );

            });

    }


    function updateFavoriteButtons() {

        document
            .querySelectorAll(".inner-favorite")
            .forEach(button => {

                const name =
                    button.dataset.name;

                if (
                    favorites.includes(name)
                ) {

                    button.classList.add("active");

                    button.textContent = "♥";

                } else {

                    button.classList.remove("active");

                    button.textContent = "♡";

                }

            });

    }


    /* =================================================
       PRODUCT BUTTONS
    ================================================= */

    document
        .querySelectorAll(".inner-add-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addToCart(
                        button.dataset.name
                    );

                }
            );

        });


    document
        .querySelectorAll(".inner-favorite")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    toggleFavorite(
                        button.dataset.name
                    );

                }
            );

        });


    /* =================================================
       CHECKOUT
    ================================================= */

    document
        .getElementById("shopCheckout")
        .addEventListener("click", () => {

            if (cart.length === 0) {

                alert(
                    "Сначала добавьте товары в корзину."
                );

                return;

            }


            alert(
                "Оформление заказа подключим следующим этапом."
            );

        });


    /* =================================================
       ESC
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();
                closeAllPanels();

            }

        }
    );


    /* =================================================
       INITIAL
    ================================================= */

    updateCart();

    updateFavorites();

    updateFavoriteButtons();

});