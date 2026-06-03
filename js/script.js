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
        ".card, section h2, section p, .download-box"
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

    const translations = {
        en: {
            nav_about: "About",
            nav_services: "Services",
            nav_experience: "Experience",
            nav_contact: "Contact",

            hero_label: "Upstream Oil & Gas Advisory",
            hero_title: "Professional Oil & Gas Consulting Services",
            hero_desc: "Technical, economic, and strategic advisory for upstream oil and gas projects, supporting reliable investment and development decisions.",
            btn_services: "Explore Services",
            btn_discuss: "Discuss Your Project",

            about_title: "About Us",
            about_desc_1: "Oil and Gas Consulting is a professional upstream energy advisory firm specializing in technical evaluation, economic analysis, field development planning, and strategic consulting services for the oil & gas industry.",
            about_desc_2: "Our team combines industry experience with practical engineering and commercial insight to deliver reliable, data-driven solutions that support operators, investors, and government institutions in achieving sustainable and efficient energy development.",
            about_box_1_title: "Decision-Oriented",
            about_box_1_desc: "Our analysis is designed to support clear technical, commercial, and investment decisions.",
            about_box_2_title: "Integrated Evaluation",
            about_box_2_desc: "We combine reservoir, production, facilities, economics, and strategic perspectives.",
            about_box_3_title: "Practical Advisory",
            about_box_3_desc: "Our recommendations are practical, structured, and applicable to real upstream project challenges.",

            services_title: "Our Services",
            service_1_title: "Reservoir & Production Engineering",
            service_1_desc: "Field development planning, reserves estimation, production forecasting, and well performance analysis.",
            service_2_title: "Economic & Fiscal Modeling",
            service_2_desc: "PSC economics, NPV/IRR analysis, cost recovery and gross split modeling, and investment evaluation.",
            service_3_title: "Field Development Planning",
            service_3_desc: "Concept selection, CAPEX/OPEX optimization, development scheduling, and risk analysis.",
            service_4_title: "Technical Due Diligence",
            service_4_desc: "Asset valuation, subsurface and facilities review, investment screening, and independent assessments.",
            service_5_title: "Free Software",
            service_5_desc: "Access to selected free oil & gas tools, templates, and utilities supporting technical and economic evaluations.",
            software_1: "PSC Economic",
            software_2: "Well Log Display",

            experience_title: "Industry Experience",
            experience_desc: "Our consultants have extensive experience across onshore and offshore oil & gas projects, including exploration, development, production optimization, and late-life asset management.",

            contact_title: "Contact Us",
            contact_email: "Email:",
            contact_phone: "Phone:",
            contact_location: "Location:",
            contact_location_value: "Jakarta, Indonesia",

            why_label: "Why Work With Us",
            why_title: "Integrated Advisory for Better Upstream Decisions",
            why_desc: "We help clients evaluate oil and gas assets from technical, economic, and strategic perspectives to support clear, practical, and investment-oriented decisions.",
            why_1_title: "Technical Depth",
            why_1_desc: "Reservoir, production, field development, and asset performance analysis based on practical industry understanding.",
            why_2_title: "Commercial Understanding",
            why_2_desc: "Economic evaluation, fiscal modeling, cashflow analysis, sensitivity cases, and investment metrics.",
            why_3_title: "Strategic Perspective",
            why_3_desc: "Clear recommendations to support project screening, development planning, and investment decision-making.",

            footer_rights: "Oil and Gas Consulting. All Rights Reserved.",

            psc_header_title: "PSC Economic Tool",
            psc_header_desc: "Download free PSC Economic software for evaluating Production Sharing Contract economics.",
            psc_box_title: "Download PSC Economic",
            psc_box_desc: "Click the button below to download the PSC Economic tool for free. Evaluate cashflow, NPV, IRR, and investment metrics for your PSC projects.",
            psc_feature_1: "Cashflow Analysis",
            psc_feature_2: "NPV & IRR",
            psc_feature_3: "PSC Evaluation",

            welllog_header_title: "Well Log Display Tool",
            welllog_header_desc: "Download free Well Log Display software for well log visualization and analysis.",
            welllog_box_title: "Download Well Log Display",
            welllog_box_desc: "Click the button below to download the software and start analyzing your well logs with a simple and practical display tool.",
            welllog_feature_1: "Well Log View",
            welllog_feature_2: "Data Display",
            welllog_feature_3: "Analysis Tool",

            download_now: "Download Now",
            back_home: "← Back to Home"
        },

        id: {
            nav_about: "Tentang",
            nav_services: "Layanan",
            nav_experience: "Pengalaman",
            nav_contact: "Kontak",

            hero_label: "Konsultan Hulu Minyak & Gas",
            hero_title: "Layanan Konsultasi Profesional Minyak & Gas",
            hero_desc: "Layanan konsultasi teknis, ekonomi, dan strategis untuk proyek hulu minyak dan gas guna mendukung keputusan investasi dan pengembangan yang andal.",
            btn_services: "Lihat Layanan",
            btn_discuss: "Diskusikan Proyek Anda",

            about_title: "Tentang Kami",
            about_desc_1: "Oil and Gas Consulting adalah firma konsultasi energi hulu profesional yang berfokus pada evaluasi teknis, analisis ekonomi, perencanaan pengembangan lapangan, dan layanan konsultasi strategis untuk industri minyak dan gas.",
            about_desc_2: "Tim kami menggabungkan pengalaman industri dengan wawasan rekayasa dan komersial praktis untuk memberikan solusi andal berbasis data yang mendukung operator, investor, dan institusi pemerintah dalam mencapai pengembangan energi yang berkelanjutan dan efisien.",
            about_box_1_title: "Berorientasi Keputusan",
            about_box_1_desc: "Analisis kami dirancang untuk mendukung keputusan teknis, komersial, dan investasi yang jelas.",
            about_box_2_title: "Evaluasi Terintegrasi",
            about_box_2_desc: "Kami menggabungkan perspektif reservoir, produksi, fasilitas, ekonomi, dan strategi.",
            about_box_3_title: "Konsultasi Praktis",
            about_box_3_desc: "Rekomendasi kami praktis, terstruktur, dan dapat diterapkan pada tantangan nyata proyek hulu.",

            services_title: "Layanan Kami",
            service_1_title: "Rekayasa Reservoir & Produksi",
            service_1_desc: "Perencanaan pengembangan lapangan, estimasi cadangan, proyeksi produksi, dan analisis kinerja sumur.",
            service_2_title: "Pemodelan Ekonomi & Fiskal",
            service_2_desc: "Ekonomi PSC, analisis NPV/IRR, pemodelan cost recovery dan gross split, serta evaluasi investasi.",
            service_3_title: "Perencanaan Pengembangan Lapangan",
            service_3_desc: "Pemilihan konsep, optimasi CAPEX/OPEX, penjadwalan pengembangan, dan analisis risiko.",
            service_4_title: "Uji Tuntas Teknis",
            service_4_desc: "Valuasi aset, kajian subsurface dan fasilitas, penyaringan investasi, serta penilaian independen.",
            service_5_title: "Perangkat Lunak Gratis",
            service_5_desc: "Akses ke berbagai tools, template, dan utilitas minyak & gas gratis untuk mendukung evaluasi teknis dan ekonomi.",
            software_1: "Ekonomi PSC",
            software_2: "Tampilan Well Log",

            experience_title: "Pengalaman Industri",
            experience_desc: "Konsultan kami memiliki pengalaman luas pada proyek minyak & gas darat maupun lepas pantai, termasuk eksplorasi, pengembangan, optimasi produksi, dan pengelolaan aset tahap akhir.",

            contact_title: "Hubungi Kami",
            contact_email: "Email:",
            contact_phone: "Telepon:",
            contact_location: "Lokasi:",
            contact_location_value: "Jakarta, Indonesia",

            why_label: "Mengapa Bekerja Sama Dengan Kami",
            why_title: "Konsultasi Terintegrasi untuk Keputusan Hulu yang Lebih Baik",
            why_desc: "Kami membantu klien mengevaluasi aset minyak dan gas dari perspektif teknis, ekonomi, dan strategis untuk mendukung keputusan yang jelas, praktis, dan berorientasi investasi.",
            why_1_title: "Kedalaman Teknis",
            why_1_desc: "Analisis reservoir, produksi, pengembangan lapangan, dan kinerja aset berdasarkan pemahaman industri yang praktis.",
            why_2_title: "Pemahaman Komersial",
            why_2_desc: "Evaluasi ekonomi, pemodelan fiskal, analisis arus kas, skenario sensitivitas, dan metrik investasi.",
            why_3_title: "Perspektif Strategis",
            why_3_desc: "Rekomendasi yang jelas untuk mendukung penyaringan proyek, perencanaan pengembangan, dan pengambilan keputusan investasi.",

            footer_rights: "Oil and Gas Consulting. Seluruh Hak Dilindungi.",

            psc_header_title: "Alat PSC Economic",
            psc_header_desc: "Unduh software PSC Economic gratis untuk mengevaluasi keekonomian Production Sharing Contract.",
            psc_box_title: "Unduh PSC Economic",
            psc_box_desc: "Klik tombol di bawah untuk mengunduh PSC Economic secara gratis. Gunakan untuk mengevaluasi cashflow, NPV, IRR, dan metrik investasi proyek PSC Anda.",
            psc_feature_1: "Analisis Cashflow",
            psc_feature_2: "NPV & IRR",
            psc_feature_3: "Evaluasi PSC",

            welllog_header_title: "Alat Well Log Display",
            welllog_header_desc: "Unduh software Well Log Display gratis untuk visualisasi dan analisis well log.",
            welllog_box_title: "Unduh Well Log Display",
            welllog_box_desc: "Klik tombol di bawah untuk mengunduh software dan mulai menganalisis well log dengan tampilan yang sederhana dan praktis.",
            welllog_feature_1: "Tampilan Well Log",
            welllog_feature_2: "Tampilan Data",
            welllog_feature_3: "Alat Analisis",

            download_now: "Unduh Sekarang",
            back_home: "← Kembali ke Beranda"
        }
    };

    function setLanguage(lang) {
        if (!translations[lang]) return;

        const elements = document.querySelectorAll("[data-i18n]");

        elements.forEach(function (element) {
            const key = element.getAttribute("data-i18n");

            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
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
    }

    langButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const lang = btn.getAttribute("data-lang");
            setLanguage(lang);
        });
    });

    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    setLanguage(savedLanguage);

});