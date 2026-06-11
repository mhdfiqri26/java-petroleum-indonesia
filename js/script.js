/* =========================
   HEADER FADE-IN
========================= */

window.addEventListener("load", function () {
    document.body.classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENT SELECTORS
    ========================= */

    const navbar = document.querySelector("#navbar");
    const menuToggle = document.querySelector("#menuToggle");
    const navMenu = document.querySelector("#navMenu");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#navMenu li a");
    const currentYear = document.querySelector("#currentYear");
    const langButtons = document.querySelectorAll(".lang-btn");

    /* =========================
       STICKY NAVBAR
    ========================= */

    function handleStickyNavbar() {
        if (!navbar) return;
        navbar.classList.toggle("sticky", window.scrollY > 50);
    }

    window.addEventListener("scroll", handleStickyNavbar);
    handleStickyNavbar();

    /* =========================
       MOBILE MENU
    ========================= */

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");

            const isOpen = navMenu.classList.contains("open");
            menuToggle.setAttribute("aria-expanded", isOpen);

            const icon = menuToggle.querySelector("i");
            if (!icon) return;

            if (isOpen) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }

    /* =========================
       CLOSE MOBILE MENU ON CLICK
    ========================= */

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navMenu) {
                navMenu.classList.remove("open");
            }

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
            }

            const icon = menuToggle ? menuToggle.querySelector("i") : null;

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });

    /* =========================
       ACTIVE MENU ON SCROLL
    ========================= */

    function setActiveMenu() {
        if (!sections.length || !navLinks.length) return;

        let current = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 170;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveMenu);
    setActiveMenu();

    /* =========================
       REVEAL ANIMATION
    ========================= */

    const revealElements = document.querySelectorAll(
        ".card, .service-detail-card, .workflow-item, .experience-card, .profile-wrapper, .faq-item, .pricing-card, .purchase-step, .checkout-card, .company-card, .value-card, .portfolio-card, .fact-card, .capability-card, .cta-panel, section h2, section p, .download-box"
    );

    function revealOnScroll() {
        if (!revealElements.length) return;

        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(function (element) {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    /* =========================
       FOOTER YEAR AUTO
    ========================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =========================
       LANGUAGE SWITCHER
    ========================= */

    const translations = window.AppTranslations || {};


    /* =========================
       CHECKOUT / PURCHASE FLOW
    ========================= */

    const checkoutPlan = document.querySelector("#checkoutPlan");
    const checkoutSummaryTitle = document.querySelector("#checkoutSummaryTitle");
    const checkoutPrice = document.querySelector("#checkoutPrice");
    const checkoutForm = document.querySelector("#checkoutForm");

    const checkoutPriceKeys = {
        consultation: "package_price_quote",
        economic: "package_price_custom",
        integrated: "package_price_scope",
        "psc-software-support": "package_price_quote",
        "well-log-support": "package_price_quote"
    };

    const checkoutFallbackPrices = {
        consultation: "Request Quotation",
        economic: "Custom Project Fee",
        integrated: "Based on Scope",
        "psc-software-support": "Request Quotation",
        "well-log-support": "Request Quotation"
    };

    function updateCheckoutSummary() {
        if (!checkoutPlan) return;

        const selectedOption = checkoutPlan.options[checkoutPlan.selectedIndex];
        const selectedText = selectedOption ? selectedOption.textContent : checkoutPlan.value;
        const savedLanguage = localStorage.getItem("selectedLanguage") || document.documentElement.lang || "en";
        const priceKey = checkoutPriceKeys[checkoutPlan.value];
        const translatedPrice = priceKey && translations[savedLanguage] ? translations[savedLanguage][priceKey] : null;

        if (checkoutSummaryTitle) {
            checkoutSummaryTitle.textContent = selectedText;
        }

        if (checkoutPrice) {
            checkoutPrice.textContent = translatedPrice || checkoutFallbackPrices[checkoutPlan.value] || "Request Quotation";
        }
    }

    if (checkoutPlan) {
        const params = new URLSearchParams(window.location.search);
        const planFromUrl = params.get("plan");

        if (planFromUrl && checkoutPlan.querySelector('option[value="' + planFromUrl + '"]')) {
            checkoutPlan.value = planFromUrl;
        }

        checkoutPlan.addEventListener("change", updateCheckoutSummary);
        updateCheckoutSummary();
    }

    if (checkoutForm && checkoutPlan) {
        checkoutForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const selectedOption = checkoutPlan.options[checkoutPlan.selectedIndex];
            const selectedPackage = selectedOption ? selectedOption.textContent : checkoutPlan.value;
            const name = document.querySelector("#clientName").value.trim();
            const company = document.querySelector("#companyName").value.trim();
            const email = document.querySelector("#clientEmail").value.trim();
            const phone = document.querySelector("#clientPhone").value.trim();
            const brief = document.querySelector("#projectBrief").value.trim();

            const message = [
                "Hello, I would like to request a quotation / invoice for:",
                "Package: " + selectedPackage,
                "Name: " + name,
                "Company: " + (company || "-"),
                "Email: " + email,
                "Phone: " + phone,
                "Project brief: " + brief
            ].join("\n");

            window.open("https://wa.me/6285714393515?text=" + encodeURIComponent(message), "_blank");
        });
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;

        const elements = document.querySelectorAll("[data-i18n]");

        elements.forEach(function (element) {
            const key = element.getAttribute("data-i18n");

            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
            const key = element.getAttribute("data-i18n-placeholder");

            if (translations[lang][key]) {
                element.setAttribute("placeholder", translations[lang][key]);
            }
        });

        document.documentElement.lang = lang;

        langButtons.forEach(function (btn) {
            btn.classList.remove("active");

            if (btn.getAttribute("data-lang") === lang) {
                btn.classList.add("active");
            }
        });

        localStorage.setItem("selectedLanguage", lang);
        updateCheckoutSummary();
    }

    langButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const lang = btn.getAttribute("data-lang");
            setLanguage(lang);
        });
    });

    function getInitialLanguage() {
        const savedLanguage = localStorage.getItem("selectedLanguage");

        if (savedLanguage && translations[savedLanguage]) {
            return savedLanguage;
        }

        const browserLanguage = (navigator.language || navigator.userLanguage || "en").toLowerCase();

        if (browserLanguage.startsWith("id")) {
            return "id";
        }

        return "en";
    }

    setLanguage(getInitialLanguage());

});