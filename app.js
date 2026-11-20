/* ==========================================================================
   Kotte & Skog — Storefront Logic & Interactive Cart
   ========================================================================== */

(function () {
  "use strict";

  const FREE_SHIPPING_THRESHOLD = 499;
  const STANDARD_SHIPPING_FEE = 59;
  const GIFT_WRAP_FEE = 35;
  const PROMO_CODES = {
    SKOG10: { label: "10 % rabatt (SKOG10)", rate: 0.1 },
    DALARNA15: { label: "15 % rabatt (DALARNA15)", rate: 0.15 },
  };

  const IMAGE_BASE = window.KOTTE_IMAGES || {
    tallkotte: "images/tallkotte.jpg",
    grankotte: "images/grankotte.jpg",
    larkkotte: "images/larkkotte.jpg",
    brastand: "images/brastand.jpg",
    kottkrans: "images/kottkrans.jpg",
    presentlada: "images/presentlada.jpg",
  };

  const PRODUCTS = [
    {
      id: "tallkotte-dalarna",
      name: "Tallkotte — Dalaskog",
      latin: "Pinus sylvestris",
      category: "dekoration",
      categoryLabel: "Dekoration",
      origin: "Siljansnäs, Dalarna",
      tag: "Bästsäljare",
      popularity: 100,
      image: IMAGE_BASE.tallkotte,
      unit: "12-pack · 5–7 cm",
      price: 149,
      variants: [
        { id: "std", label: "Standard (12 st)", price: 149 },
        { id: "bulk", label: "Storpack (30 st · -15%)", price: 315 },
      ],
      shortDesc:
        "Klassiska, vackert utslagna tallkottar. Skonsamt ugnstorkade och borstade fria från kåda och barr.",
      fullDesc:
        "Plockade under torra höstdagar i mogna tallskogar kring Siljan. Varje kotte genomgår en långsam ugnstorkning vid 95 °C så att fjällen öppnar sig jämnt och träet får sin varma, matta lyster. Passar lika bra i en keramikskål på matsalsbordet som i kransar och dukningar.",
      specs: {
        Art: "Svensk tall (Pinus sylvestris)",
        Behandling: "Ugnstorkade 95 °C, borstade",
        Storlek: "5–7 cm i diameter",
        Leverans: "1–3 vardagar",
      },
    },
    {
      id: "grankotte-knippe",
      name: "Grankotte — Knippe om 8",
      latin: "Picea abies",
      category: "dekoration",
      categoryLabel: "Dekoration",
      origin: "Älvdalen, Dalarna",
      tag: "Säsongens skörd",
      popularity: 88,
      image: IMAGE_BASE.grankotte,
      unit: "8-pack · 12–16 cm",
      price: 179,
      variants: [
        { id: "std", label: "Knippe (8 st)", price: 179 },
        { id: "bulk", label: "Dubbelknippe (16 st · -12%)", price: 315 },
      ],
      shortDesc:
        "Långa, gyllenbruna grankottar bundna för hand med oblekt jutesnöre. Skulpturalt uttryck på bordet.",
      fullDesc:
        "Våra långa grankottar väljs ut för sin jämna, slanka form och varma kanelbruna nyans. Levereras färdigbundna i ett knippe om åtta stycken — redo att läggas direkt på ett keramikfat, hängas i fönstret eller användas i större höst- och vinterarrangemang.",
      specs: {
        Art: "Rödgran (Picea abies)",
        Behandling: "Luft- och ugnstorkade",
        Storlek: "12–16 cm långa",
        Leverans: "1–3 vardagar",
      },
    },
    {
      id: "larkkotte-kvist",
      name: "Lärkkotte på kvist",
      latin: "Larix decidua",
      category: "kransar",
      categoryLabel: "Kransar & Kvistar",
      origin: "Sunne, Värmland",
      tag: "Floristfavorit",
      popularity: 92,
      image: IMAGE_BASE.larkkotte,
      unit: "6 grenar · 35–45 cm",
      price: 195,
      variants: [
        { id: "std", label: "Bunt (6 grenar)", price: 195 },
        { id: "bulk", label: "Floristbunt (14 grenar)", price: 389 },
      ],
      shortDesc:
        "Skira, rosliknande lärkkottar kvar på sina naturliga kvistar. Ger en levande silhuett i höga vaser.",
      fullDesc:
        "Lärkkvistar är floristernas favorit för minimalistiska arrangemang som håller år efter år. Kvistarna samlas in efter höststormar och gallringar i Värmland, rensas varsamt för hand och packas liggande i skyddande kraftpapper.",
      specs: {
        Art: "Europeisk lärk (Larix decidua)",
        Behandling: "Skonsamt lufttorkade",
        Storlek: "Grenlängd 35–45 cm",
        Leverans: "1–3 vardagar",
      },
    },
    {
      id: "brastand-bivax",
      name: "Braständkottar i bivax",
      latin: "Pinus sylvestris · Cera alba",
      category: "brasa",
      categoryLabel: "Brasa & Present",
      origin: "Rättvik, Dalarna",
      tag: "100 % naturligt",
      popularity: 96,
      image: IMAGE_BASE.brastand,
      unit: "15-pack · brinntid ~12 min",
      price: 229,
      variants: [
        { id: "std", label: "Påse (15 st)", price: 229 },
        { id: "bulk", label: "Vinterlåda (35 st)", price: 469 },
      ],
      shortDesc:
        "Handdoppade i rent svenskt bivax med veke av oblekt bomull. Tänder kaminen rent med mild doft av honung och tall.",
      fullDesc:
        "Slipp paraffin och tändvätska. Varje torr tallkotte doppas för hand i oblekt svenskt bivax från lokala biodlare i Rättvik. En enda kotte brinner med jämn, kraftig låga i upp till 12 minuter — tillräckligt för att få fyr på torr björkved i kakelugn, kamin eller öppen spis.",
      specs: {
        Innehåll: "Tallkotte, svenskt bivax, bomullsveke",
        Brinntid: "Ca 10–12 minuter per kotte",
        Doft: "Mild naturlig bivax och barrskog",
        Leverans: "1–3 vardagar",
      },
    },
    {
      id: "kottkrans-handbunden",
      name: "Handbunden kottkrans",
      latin: "Tall, gran & lärk · Ø 32 cm",
      category: "kransar",
      categoryLabel: "Kransar & Kvistar",
      origin: "Bunden i Siljansnäs",
      tag: "Hantverk",
      popularity: 84,
      image: IMAGE_BASE.kottkrans,
      unit: "1 st · diameter 32 cm",
      price: 489,
      variants: [
        { id: "std", label: "Standard (Ø 32 cm)", price: 489 },
        { id: "large", label: "Stor dörrkrans (Ø 40 cm)", price: 629 },
      ],
      shortDesc:
        "Tät, skulptural krans bunden av tre sorters svenska kottar på halmstomme, avslutad med band i oblekt lin.",
      fullDesc:
        "Varje krans binds för hand i vår verkstad i Siljansnäs med över 80 utvalda kottar av tall, gran och lärk. Kransen tål att hänga både inomhus och på skyddad ytterdörr. Levereras med avtagbart band i hellinne.",
      specs: {
        Diameter: "32 cm eller 40 cm",
        Stomme: "Svensk halm & ståltråd",
        Upphängning: "Oblekt linneband ingår",
        Leverans: "2–4 vardagar",
      },
    },
    {
      id: "skogsladan-present",
      name: "Skogslådan — Presentask i trä",
      latin: "Utvald blandning · 18 delar",
      category: "brasa",
      categoryLabel: "Brasa & Present",
      origin: "Dalarna & Värmland",
      tag: "Presenttips",
      popularity: 90,
      image: IMAGE_BASE.presentlada,
      unit: "Trälåda · 28 × 20 × 9 cm",
      price: 349,
      variants: [
        { id: "std", label: "Skogslådan Original", price: 349 },
        { id: "wax", label: "Med 6 bivax-tändkottar", price: 429 },
      ],
      shortDesc:
        "Vår omtyckta gåvolåda i obehandlad furu fylld med tallkottar, lärkkvistar och grankottar bäddade i svensk träull.",
      fullDesc:
        "En uppskattad gåva till värdparet, stugägaren eller den som älskar naturmaterial. Lådan är snickrad i obehandlad furu som gärna återanvänds till förvaring, och innehåller en balanserad mix av säsongens finaste kottar och skötselkort.",
      specs: {
        Innehåll: "Tallkottar, lärkkvistar, grankottar",
        Förpackning: "Furuask med svensk träull",
        Mått: "28 × 20 × 9 cm",
        Leverans: "1–3 vardagar",
      },
    },
  ];

  // Safe localStorage wrapper (handles sandboxed iframe restrictions cleanly)
  const storage = {
    get(key) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (_) {
        return null;
      }
    },
    set(key, val) {
      try {
        window.localStorage.setItem(key, JSON.stringify(val));
      } catch (_) {
        // Ignore in restricted storage contexts
      }
    },
  };

  // Application State
  const state = {
    category: "alla",
    search: "",
    sort: "popular",
    cart: storage.get("kotte_cart_v1") || [
      {
        productId: "tallkotte-dalarna",
        variantId: "std",
        qty: 1,
      },
    ],
    giftWrap: false,
    promoCode: null,
    activeProductId: null,
    activeVariantId: "std",
    activeQty: 1,
  };

  // DOM References
  const el = {
    productGrid: document.getElementById("product-grid"),
    filterTabs: document.querySelectorAll(".filter-tab"),
    searchInput: document.getElementById("catalog-search"),
    sortSelect: document.getElementById("catalog-sort"),
    cartTrigger: document.getElementById("cart-trigger"),
    cartCount: document.getElementById("cart-count"),
    backdrop: document.getElementById("backdrop"),
    cartDrawer: document.getElementById("cart-drawer"),
    cartClose: document.getElementById("cart-close"),
    cartBody: document.getElementById("cart-body"),
    cartFooter: document.getElementById("cart-footer"),
    shippingText: document.getElementById("shipping-text"),
    shippingBar: document.getElementById("shipping-bar"),
    detailModal: document.getElementById("detail-modal"),
    detailContent: document.getElementById("detail-modal-inner"),
    checkoutModal: document.getElementById("checkout-modal"),
    checkoutBody: document.getElementById("checkout-modal-body"),
    b2bModal: document.getElementById("b2b-modal"),
    b2bOpenBtn: document.getElementById("open-b2b-btn"),
    b2bFormWrap: document.getElementById("b2b-form-wrap"),
    newsletterForm: document.getElementById("newsletter-form"),
    newsletterEmail: document.getElementById("newsletter-email"),
    newsletterMsg: document.getElementById("newsletter-msg"),
    mobileMenuBtn: document.getElementById("mobile-menu-btn"),
    mainNav: document.getElementById("main-nav"),
    toast: document.getElementById("toast"),
  };

  function formatSEK(amount) {
    return `${Math.round(amount).toLocaleString("sv-SE")} kr`;
  }

  let toastTimer = null;
  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.classList.remove("show");
    }, 2600);
  }

  function saveCart() {
    storage.set("kotte_cart_v1", state.cart);
  }

  function getProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  function getVariant(product, variantId) {
    return (
      product.variants.find((v) => v.id === variantId) || product.variants[0]
    );
  }

  function calculateTotals() {
    let subtotal = 0;
    let totalItems = 0;
    state.cart.forEach((item) => {
      const p = getProduct(item.productId);
      if (!p) return;
      const v = getVariant(p, item.variantId);
      subtotal += v.price * item.qty;
      totalItems += item.qty;
    });

    const discountRate = state.promoCode
      ? PROMO_CODES[state.promoCode].rate
      : 0;
    const discount = Math.round(subtotal * discountRate);
    const afterDiscount = Math.max(0, subtotal - discount);
    const giftFee = state.giftWrap && totalItems > 0 ? GIFT_WRAP_FEE : 0;
    const shipping =
      totalItems === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD
        ? 0
        : STANDARD_SHIPPING_FEE;
    const total = afterDiscount + giftFee + shipping;

    return {
      subtotal,
      discount,
      afterDiscount,
      giftFee,
      shipping,
      total,
      totalItems,
    };
  }

  // =========================================================================
  // Product Grid Rendering
  // =========================================================================

  function renderProducts() {
    const query = state.search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const catMatch = state.category === "alla" || p.category === state.category;
      const qMatch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.latin.toLowerCase().includes(query) ||
        p.shortDesc.toLowerCase().includes(query) ||
        p.origin.toLowerCase().includes(query);
      return catMatch && qMatch;
    });

    if (state.sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => b.popularity - a.popularity);
    }

    if (list.length === 0) {
      el.productGrid.innerHTML = `
        <div class="empty-state">
          <p>Inga kottar matchade din sökning "${escapeHtml(state.search)}".</p>
          <button type="button" class="btn btn-secondary" id="reset-filters-btn" style="margin-top:14px;">Visa hela sortimentet</button>
        </div>
      `;
      const resetBtn = document.getElementById("reset-filters-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          state.category = "alla";
          state.search = "";
          el.searchInput.value = "";
          updateActiveTabs();
          renderProducts();
        });
      }
      return;
    }

    el.productGrid.innerHTML = list
      .map(
        (p) => `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-media" data-open-detail="${p.id}" role="button" tabindex="0" aria-label="Visa mer om ${p.name}">
          <img src="${p.image}" alt="${p.name} — ${p.origin}" loading="lazy" />
          <span class="product-tag">${p.tag}</span>
        </div>
        <div class="product-body">
          <div class="product-meta">
            <span class="product-latin">${p.latin}</span>
            <span class="product-origin">${p.origin}</span>
          </div>
          <h3 class="product-title" data-open-detail="${p.id}">${p.name}</h3>
          <p class="product-desc">${p.shortDesc}</p>
          <div class="product-footer">
            <div class="product-price-wrap">
              <span class="product-price">${formatSEK(p.price)}</span>
              <span class="product-unit">${p.unit}</span>
            </div>
            <div class="product-actions">
              <button type="button" class="btn-info" data-open-detail="${p.id}">Detaljer</button>
              <button type="button" class="btn-add" data-quick-add="${p.id}" id="add-${p.id}">Lägg i korg</button>
            </div>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (ch) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return map[ch];
    });
  }

  function updateActiveTabs() {
    el.filterTabs.forEach((tab) => {
      const isMatch = tab.dataset.category === state.category;
      tab.classList.toggle("active", isMatch);
      tab.setAttribute("aria-pressed", String(isMatch));
    });
  }

  // =========================================================================
  // Cart Operations & Rendering
  // =========================================================================

  function addToCart(productId, variantId = "std", qty = 1) {
    const product = getProduct(productId);
    if (!product) return;
    const variant = getVariant(product, variantId);
    const existing = state.cart.find(
      (i) => i.productId === productId && i.variantId === variant.id
    );
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({ productId, variantId: variant.id, qty });
    }
    saveCart();
    renderCart();
    bumpCartBadge();
    showToast(`${product.name} lades i varukorgen`);
  }

  function updateCartQty(index, delta) {
    const item = state.cart[index];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }

  function removeCartItem(index) {
    state.cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function bumpCartBadge() {
    el.cartCount.classList.remove("bump");
    void el.cartCount.offsetWidth;
    el.cartCount.classList.add("bump");
    setTimeout(() => el.cartCount.classList.remove("bump"), 280);
  }

  function renderCart() {
    const totals = calculateTotals();
    el.cartCount.textContent = String(totals.totalItems);

    // Free shipping meter
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.afterDiscount);
    const pct = Math.min(
      100,
      Math.round((totals.afterDiscount / FREE_SHIPPING_THRESHOLD) * 100)
    );
    if (totals.totalItems === 0) {
      el.shippingText.textContent = `Fri frakt vid köp över ${formatSEK(FREE_SHIPPING_THRESHOLD)}`;
    } else if (remaining > 0) {
      el.shippingText.innerHTML = `Lägg till <strong>${formatSEK(remaining)}</strong> till för fri frakt`;
    } else {
      el.shippingText.innerHTML = `<strong>Grattis!</strong> Din beställning skickas med fri frakt.`;
    }
    el.shippingBar.style.width = `${pct}%`;

    if (state.cart.length === 0) {
      el.cartBody.innerHTML = `
        <div class="cart-empty">
          <p>Din varukorg är tom just nu.</p>
          <button type="button" class="btn btn-primary" id="continue-shopping-btn">Utforska våra kottar</button>
        </div>
      `;
      el.cartFooter.innerHTML = "";
      const contBtn = document.getElementById("continue-shopping-btn");
      if (contBtn) contBtn.addEventListener("click", closeAllOverlays);
      return;
    }

    const itemsHtml = state.cart
      .map((item, idx) => {
        const p = getProduct(item.productId);
        if (!p) return "";
        const v = getVariant(p, item.variantId);
        return `
        <div class="cart-item">
          <img class="cart-item-img" src="${p.image}" alt="${p.name}" />
          <div>
            <div class="cart-item-top">
              <div>
                <div class="cart-item-name">${p.name}</div>
                <div class="cart-item-variant">${v.label}</div>
              </div>
              <button type="button" class="cart-item-remove" data-remove-idx="${idx}" aria-label="Ta bort ${p.name}">Ta bort</button>
            </div>
            <div class="cart-item-bottom">
              <div class="qty-stepper" aria-label="Antal">
                <button type="button" data-qty-idx="${idx}" data-delta="-1" aria-label="Minska antal">−</button>
                <span>${item.qty}</span>
                <button type="button" data-qty-idx="${idx}" data-delta="1" aria-label="Öka antal">+</button>
              </div>
              <span class="cart-item-price">${formatSEK(v.price * item.qty)}</span>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    el.cartBody.innerHTML = `
      ${itemsHtml}
      <div class="cart-extras">
        <label class="gift-option">
          <input type="checkbox" id="gift-wrap-checkbox" ${state.giftWrap ? "checked" : ""} />
          <span>
            <strong>Presentinslagning (+${GIFT_WRAP_FEE} kr)</strong><br />
            Oblekt silkespapper, jutesnöre och handskrivet kort.
          </span>
        </label>
        <div>
          <form id="promo-form" class="promo-row">
            <input type="text" id="promo-input" class="promo-input" placeholder="Rabattkod (t.ex. SKOG10)" value="${state.promoCode || ""}" aria-label="Rabattkod" />
            <button type="submit" class="btn btn-secondary" style="padding:0 14px;height:36px;font-size:13px;">Aktivera</button>
          </form>
          <div id="promo-feedback" class="promo-feedback ${state.promoCode ? "ok" : ""}">
            ${state.promoCode ? `Aktiverad: ${PROMO_CODES[state.promoCode].label}` : ""}
          </div>
        </div>
      </div>
    `;

    el.cartFooter.innerHTML = `
      <div class="summary-line">
        <span>Delsumma</span>
        <span>${formatSEK(totals.subtotal)}</span>
      </div>
      ${
        totals.discount > 0
          ? `<div class="summary-line discount"><span>Rabatt (${state.promoCode})</span><span>−${formatSEK(totals.discount)}</span></div>`
          : ""
      }
      ${
        totals.giftFee > 0
          ? `<div class="summary-line"><span>Presentinslagning</span><span>${formatSEK(totals.giftFee)}</span></div>`
          : ""
      }
      <div class="summary-line">
        <span>Frakt (PostNord Ombud)</span>
        <span>${totals.shipping === 0 ? "Fri frakt" : formatSEK(totals.shipping)}</span>
      </div>
      <div class="summary-total">
        <span>Totalt inkl. moms</span>
        <span>${formatSEK(totals.total)}</span>
      </div>
      <button type="button" class="btn btn-primary" id="open-checkout-btn" style="width:100%;">Till kassan · ${formatSEK(totals.total)}</button>
    `;

    // Bind dynamic cart events
    const giftBox = document.getElementById("gift-wrap-checkbox");
    if (giftBox) {
      giftBox.addEventListener("change", (e) => {
        state.giftWrap = e.target.checked;
        renderCart();
      });
    }

    const promoForm = document.getElementById("promo-form");
    if (promoForm) {
      promoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const code = (document.getElementById("promo-input").value || "")
          .trim()
          .toUpperCase();
        const fb = document.getElementById("promo-feedback");
        if (!code) {
          state.promoCode = null;
          renderCart();
          return;
        }
        if (PROMO_CODES[code]) {
          state.promoCode = code;
          renderCart();
        } else {
          state.promoCode = null;
          fb.className = "promo-feedback err";
          fb.textContent = "Ogiltig kod. Prova SKOG10 för 10 % rabatt.";
        }
      });
    }

    const checkoutBtn = document.getElementById("open-checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", openCheckoutModal);
    }
  }

  // =========================================================================
  // Product Detail Modal
  // =========================================================================

  function openDetailModal(productId) {
    const p = getProduct(productId);
    if (!p) return;
    state.activeProductId = p.id;
    state.activeVariantId = p.variants[0].id;
    state.activeQty = 1;
    renderDetailModal();
    closeAllOverlays(false);
    el.backdrop.classList.add("open");
    el.detailModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function renderDetailModal() {
    const p = getProduct(state.activeProductId);
    if (!p) return;
    const selectedVar = getVariant(p, state.activeVariantId);

    const specsHtml = Object.entries(p.specs)
      .map(
        ([k, v]) => `
      <div>
        <span class="spec-label">${k}</span>
        <span class="spec-val">${v}</span>
      </div>
    `
      )
      .join("");

    const variantsHtml = p.variants
      .map(
        (v) => `
      <button type="button" class="variant-btn ${v.id === selectedVar.id ? "selected" : ""}" data-select-variant="${v.id}">
        <span class="variant-name">${v.label}</span>
        <span class="variant-price">${formatSEK(v.price)}</span>
      </button>
    `
      )
      .join("");

    el.detailContent.innerHTML = `
      <div class="detail-grid">
        <div class="detail-media">
          <img src="${p.image}" alt="${p.name}" />
        </div>
        <div class="detail-content">
          <div class="product-meta" style="margin-bottom:6px;">
            <span class="product-latin">${p.latin}</span>
            <span class="product-origin">${p.origin}</span>
          </div>
          <h2 class="section-title" style="font-size:26px;margin-bottom:10px;">${p.name}</h2>
          <p style="font-size:14px;color:var(--ink-secondary);line-height:1.65;">${p.fullDesc}</p>
          <div class="detail-specs">${specsHtml}</div>
          <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--ink-muted);margin-bottom:8px;">Välj förpackning</div>
          <div class="variant-group">${variantsHtml}</div>
          <div style="display:flex;align-items:center;gap:12px;margin-top:auto;">
            <div class="qty-stepper" aria-label="Antal">
              <button type="button" id="detail-qty-minus" aria-label="Minska antal">−</button>
              <span id="detail-qty-val">${state.activeQty}</span>
              <button type="button" id="detail-qty-plus" aria-label="Öka antal">+</button>
            </div>
            <button type="button" class="btn btn-primary" id="detail-add-btn" style="flex:1;">
              Lägg i varukorg · ${formatSEK(selectedVar.price * state.activeQty)}
            </button>
          </div>
        </div>
      </div>
    `;

    el.detailContent.querySelectorAll("[data-select-variant]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeVariantId = btn.dataset.selectVariant;
        renderDetailModal();
      });
    });

    document.getElementById("detail-qty-minus").addEventListener("click", () => {
      if (state.activeQty > 1) {
        state.activeQty -= 1;
        renderDetailModal();
      }
    });

    document.getElementById("detail-qty-plus").addEventListener("click", () => {
      state.activeQty += 1;
      renderDetailModal();
    });

    document.getElementById("detail-add-btn").addEventListener("click", () => {
      addToCart(p.id, state.activeVariantId, state.activeQty);
      closeAllOverlays();
      openCartDrawer();
    });
  }

  // =========================================================================
  // Checkout Modal
  // =========================================================================

  function openCheckoutModal() {
    const totals = calculateTotals();
    if (totals.totalItems === 0) return;

    closeAllOverlays(false);
    el.backdrop.classList.add("open");
    el.checkoutModal.classList.add("open");
    document.body.style.overflow = "hidden";

    const itemsSummary = state.cart
      .map((item) => {
        const p = getProduct(item.productId);
        const v = getVariant(p, item.variantId);
        return `<div class="summary-line"><span>${item.qty} × ${p.name} (${v.label})</span><span>${formatSEK(v.price * item.qty)}</span></div>`;
      })
      .join("");

    el.checkoutBody.innerHTML = `
      <div class="section-eyebrow">Kassa</div>
      <h2 class="section-title" style="font-size:26px;">Slutför din beställning</h2>
      <div style="margin-top:14px;padding:14px 16px;background:var(--bg-linen);border:1px solid var(--border-hairline);border-radius:var(--radius-sm);">
        ${itemsSummary}
        ${totals.giftFee > 0 ? `<div class="summary-line"><span>Presentinslagning</span><span>${formatSEK(totals.giftFee)}</span></div>` : ""}
        ${totals.discount > 0 ? `<div class="summary-line discount"><span>Rabatt (${state.promoCode})</span><span>−${formatSEK(totals.discount)}</span></div>` : ""}
        <div class="summary-line"><span>Frakt</span><span>${totals.shipping === 0 ? "Fri frakt" : formatSEK(totals.shipping)}</span></div>
        <div class="summary-total" style="margin-bottom:0;padding-top:8px;">
          <span>Att betala</span>
          <span>${formatSEK(totals.total)}</span>
        </div>
      </div>

      <form id="checkout-form" class="form-grid">
        <div class="form-field">
          <label for="co-name">För- och efternamn</label>
          <input id="co-name" class="form-control" type="text" required placeholder="Astrid Lindholm" />
        </div>
        <div class="form-field">
          <label for="co-email">E-postadress</label>
          <input id="co-email" class="form-control" type="email" required placeholder="astrid@exempel.se" />
        </div>
        <div class="form-field full">
          <label for="co-address">Gatuadress</label>
          <input id="co-address" class="form-control" type="text" required placeholder="Björkvägen 14" />
        </div>
        <div class="form-field">
          <label for="co-zip">Postnummer</label>
          <input id="co-zip" class="form-control" type="text" required placeholder="793 31" />
        </div>
        <div class="form-field">
          <label for="co-city">Ort</label>
          <input id="co-city" class="form-control" type="text" required placeholder="Leksand" />
        </div>
        <div class="form-field full">
          <label>Betalsätt (demobeställning)</label>
          <div class="radio-cards">
            <label class="radio-card"><input type="radio" name="payment" value="Swish" checked /> Swish</label>
            <label class="radio-card"><input type="radio" name="payment" value="Klarna" /> Klarna</label>
            <label class="radio-card"><input type="radio" name="payment" value="Kort" /> Kort</label>
          </div>
        </div>
        <div class="form-field full" style="margin-top:6px;">
          <button type="submit" class="btn btn-primary" style="width:100%;">Bekräfta beställning · ${formatSEK(totals.total)}</button>
          <p style="font-size:11.5px;color:var(--ink-muted);text-align:center;margin-top:8px;">Ingen verklig debitering sker — detta är en interaktiv butiksdemon.</p>
        </div>
      </form>
    `;

    document.getElementById("checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const customerName = document.getElementById("co-name").value.trim();
      const customerEmail = document.getElementById("co-email").value.trim();
      const payment = document.querySelector('input[name="payment"]:checked').value;
      const orderNo = `KS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      state.cart = [];
      state.giftWrap = false;
      state.promoCode = null;
      saveCart();
      renderCart();

      el.checkoutBody.innerHTML = `
        <div class="confirmation-box">
          <div class="confirmation-check" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div class="section-eyebrow">Tack för din beställning</div>
          <h2 class="section-title" style="font-size:26px;margin-bottom:10px;">Order ${orderNo} är mottagen</h2>
          <p style="font-size:14.5px;color:var(--ink-secondary);max-width:400px;margin:0 auto 20px;">
            Tack ${escapeHtml(customerName)}! En orderbekräftelse för betalning med <strong>${escapeHtml(payment)}</strong> har skapats för <strong>${escapeHtml(customerEmail)}</strong>. Dina kottar packas i Siljansnäs inom 24 timmar.
          </p>
          <button type="button" class="btn btn-primary" id="finish-order-btn">Tillbaka till butiken</button>
        </div>
      `;
      document
        .getElementById("finish-order-btn")
        .addEventListener("click", closeAllOverlays);
    });
  }

  // =========================================================================
  // B2B / Florist Inquiry Modal
  // =========================================================================

  function openB2bModal() {
    closeAllOverlays(false);
    el.backdrop.classList.add("open");
    el.b2bModal.classList.add("open");
    document.body.style.overflow = "hidden";
    renderB2bForm();
  }

  function renderB2bForm() {
    el.b2bFormWrap.innerHTML = `
      <div class="section-eyebrow">Florister & Företag</div>
      <h2 class="section-title" style="font-size:26px;">Begär offert på storsäck</h2>
      <p style="font-size:14px;color:var(--ink-secondary);margin-top:6px;">
        Vi levererar 50-liters jutesäckar med sorterade tall-, gran- och lärkkottar till blomsterbutiker, hotell och event.
      </p>
      <form id="b2b-form" class="form-grid">
        <div class="form-field">
          <label for="b2b-company">Företag / Butik</label>
          <input id="b2b-company" class="form-control" type="text" required placeholder="Blomsterverkstan AB" />
        </div>
        <div class="form-field">
          <label for="b2b-email">E-post</label>
          <input id="b2b-email" class="form-control" type="email" required placeholder="inkop@butik.se" />
        </div>
        <div class="form-field full">
          <label for="b2b-vol">Önskad mängd & sort</label>
          <textarea id="b2b-vol" class="form-control" rows="3" required placeholder="T.ex. 3 storsäckar tallkottar och 10 buntar lärkkvistar till november..."></textarea>
        </div>
        <div class="form-field full">
          <button type="submit" class="btn btn-primary" style="width:100%;">Skicka offertförfrågan</button>
        </div>
      </form>
    `;

    document.getElementById("b2b-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const company = document.getElementById("b2b-company").value.trim();
      el.b2bFormWrap.innerHTML = `
        <div class="confirmation-box">
          <div class="confirmation-check" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 class="section-title" style="font-size:24px;margin-bottom:8px;">Förfrågan skickad</h2>
          <p style="font-size:14.5px;color:var(--ink-secondary);margin-bottom:20px;">
            Tack ${escapeHtml(company)}! Vi återkommer med prislista och lagerstatus inom en arbetsdag.
          </p>
          <button type="button" class="btn btn-primary" id="close-b2b-done">Stäng</button>
        </div>
      `;
      document
        .getElementById("close-b2b-done")
        .addEventListener("click", closeAllOverlays);
    });
  }

  // =========================================================================
  // Overlay Controls
  // =========================================================================

  function openCartDrawer() {
    closeAllOverlays(false);
    el.backdrop.classList.add("open");
    el.cartDrawer.classList.add("open");
    el.cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeAllOverlays(restoreScroll = true) {
    el.backdrop.classList.remove("open");
    el.cartDrawer.classList.remove("open");
    el.cartDrawer.setAttribute("aria-hidden", "true");
    el.detailModal.classList.remove("open");
    el.checkoutModal.classList.remove("open");
    el.b2bModal.classList.remove("open");
    if (restoreScroll) {
      document.body.style.overflow = "";
    }
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================

  el.filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.category = tab.dataset.category;
      updateActiveTabs();
      renderProducts();
    });
  });

  el.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    renderProducts();
  });

  el.sortSelect.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
  });

  el.productGrid.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-quick-add]");
    if (addBtn) {
      const id = addBtn.dataset.quickAdd;
      addToCart(id, "std", 1);
      addBtn.classList.add("added");
      const orig = addBtn.textContent;
      addBtn.textContent = "Tillagd ✓";
      setTimeout(() => {
        addBtn.classList.remove("added");
        addBtn.textContent = orig;
      }, 1100);
      return;
    }

    const detailTrigger = e.target.closest("[data-open-detail]");
    if (detailTrigger) {
      openDetailModal(detailTrigger.dataset.openDetail);
    }
  });

  el.productGrid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const detailTrigger = e.target.closest("[data-open-detail]");
      if (detailTrigger) {
        e.preventDefault();
        openDetailModal(detailTrigger.dataset.openDetail);
      }
    }
  });

  el.cartBody.addEventListener("click", (e) => {
    const qtyBtn = e.target.closest("[data-qty-idx]");
    if (qtyBtn) {
      updateCartQty(Number(qtyBtn.dataset.qtyIdx), Number(qtyBtn.dataset.delta));
      return;
    }
    const removeBtn = e.target.closest("[data-remove-idx]");
    if (removeBtn) {
      removeCartItem(Number(removeBtn.dataset.removeIdx));
    }
  });

  el.cartTrigger.addEventListener("click", openCartDrawer);
  el.cartClose.addEventListener("click", () => closeAllOverlays());
  el.backdrop.addEventListener("click", () => closeAllOverlays());

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => closeAllOverlays());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllOverlays();
  });

  // FAQ Accordion
  document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".accordion-item")
        .forEach((other) => other.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  // B2B modal
  if (el.b2bOpenBtn) {
    el.b2bOpenBtn.addEventListener("click", openB2bModal);
  }

  // Mobile Menu
  if (el.mobileMenuBtn) {
    el.mobileMenuBtn.addEventListener("click", () => {
      const isOpen = el.mainNav.classList.toggle("open");
      el.mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });
    el.mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        el.mainNav.classList.remove("open");
        el.mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Newsletter Form
  if (el.newsletterForm) {
    el.newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = el.newsletterEmail.value.trim();
      if (!email) return;
      el.newsletterMsg.textContent = `Tack! Vi har registrerat ${email} för höstens skördebrev.`;
      el.newsletterEmail.value = "";
    });
  }

  // Initial Render
  renderProducts();
  renderCart();
})();
