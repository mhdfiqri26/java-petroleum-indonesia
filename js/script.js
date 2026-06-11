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
        ".card, .service-detail-card, .workflow-item, .experience-card, .profile-wrapper, .faq-item, .pricing-card, .purchase-step, .checkout-card, section h2, section p, .download-box"
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
            nav_purchase: "Purchase",
            dropdown_service_1: "Reservoir & Production",
            dropdown_service_2: "Economic & Fiscal",
            dropdown_service_3: "Field Development",

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


            purchase_label: "Professional Purchase",
            purchase_title: "Choose a Professional Support Package",
            purchase_desc: "Select a consulting or software support package, submit your project details, and receive a professional quotation or invoice confirmation.",
            purchase_step_1: "Choose package",
            purchase_step_2: "Send project details",
            purchase_step_3: "Receive quotation / invoice",
            package_1_badge: "Starter",
            package_1_title: "Technical Consultation",
            package_1_desc: "Initial discussion and professional review for early-stage upstream questions.",
            package_1_item_1: "Project requirement review",
            package_1_item_2: "Online consultation session",
            package_1_item_3: "Summary recommendation",
            package_2_badge: "Recommended",
            package_2_title: "Economic Evaluation",
            package_2_desc: "PSC economic model review for cashflow, NPV, IRR, sensitivity, and investment screening.",
            package_2_item_1: "PSC / fiscal model setup",
            package_2_item_2: "NPV, IRR, payout, and sensitivity",
            package_2_item_3: "Professional evaluation summary",
            package_3_badge: "Advanced",
            package_3_title: "Integrated Advisory",
            package_3_desc: "Technical, economic, and strategic support for field development or asset evaluation.",
            package_3_item_1: "Reservoir / production review",
            package_3_item_2: "Development and cost assumptions",
            package_3_item_3: "Decision-oriented recommendation",
            package_price_quote: "Request Quotation",
            package_price_custom: "Custom Project Fee",
            package_price_scope: "Based on Scope",
            package_btn: "Order Package",
            purchase_note: "Secure request flow: order details are sent to the consultant first. Payment is confirmed only after quotation or invoice approval.",
            professional_support: "Request Professional Support",

            checkout_label: "Professional Purchase",
            checkout_title: "Request Service Quotation",
            checkout_desc: "Complete the form below to request a quotation, invoice, or professional support confirmation. Your request will be sent directly to the consultant through WhatsApp.",
            checkout_form_title: "Order Details",
            checkout_plan_label: "Selected package",
            checkout_option_consultation: "Technical Consultation",
            checkout_option_economic: "Economic Evaluation",
            checkout_option_integrated: "Integrated Advisory",
            checkout_option_psc: "PSC Economic Software Support",
            checkout_option_welllog: "Well Log Display Software Support",
            checkout_name_label: "Full name",
            checkout_name_placeholder: "Your name",
            checkout_company_label: "Company / institution",
            checkout_company_placeholder: "Company name",
            checkout_email_label: "Email",
            checkout_phone_label: "WhatsApp / phone",
            checkout_brief_label: "Project brief",
            checkout_brief_placeholder: "Tell us about your project, data availability, expected output, and timeline.",
            checkout_submit: "Send Request via WhatsApp",
            checkout_form_note: "This form does not collect payment automatically. Payment is processed after quotation or invoice approval.",
            checkout_summary_label: "Order Summary",
            checkout_summary_desc: "Submit your details and our team will review the scope before confirming quotation and next steps.",
            checkout_summary_price_label: "Price",
            checkout_summary_payment_label: "Payment",
            checkout_summary_payment: "Invoice / bank transfer after confirmation",
            checkout_summary_delivery_label: "Delivery",
            checkout_summary_delivery: "Online consultation / project report based on scope",
            checkout_change_package: "← Change package",
            services_cta_order: "Order Professional Service",

            footer_rights: "Oil and Gas Consulting. All Rights Reserved.",

            selected_exp_title: "Selected Experience",
            selected_exp_desc: "Selected advisory experience supporting upstream oil and gas evaluation, investment decisions, and field development planning.",

            selected_exp_1_tag: "Asset Evaluation",
            selected_exp_1_title: "Upstream Asset Evaluation",
            selected_exp_1_desc: "Technical and commercial evaluation of upstream oil and gas assets, including production potential, reserves outlook, cost assumptions, and investment screening.",

            selected_exp_2_tag: "Economic Review",
            selected_exp_2_title: "PSC Economic Assessment",
            selected_exp_2_desc: "Cashflow modeling and fiscal analysis for Production Sharing Contract projects, including NPV, IRR, payout, sensitivity, and scenario evaluation.",

            selected_exp_3_tag: "Development Planning",
            selected_exp_3_title: "Field Development Planning Support",
            selected_exp_3_desc: "Support for development concept selection, production strategy, CAPEX/OPEX review, project scheduling, and risk assessment.",

            selected_exp_4_tag: "Technical Review",
            selected_exp_4_title: "Production & Well Performance Review",
            selected_exp_4_desc: "Review of production behavior, well performance, operating constraints, and optimization opportunities to improve asset performance.",

            profile_label: "Consultant Profile",
            profile_title: "Practical Advisory Backed by Technical and Commercial Insight",
            profile_desc: "Our consulting approach combines upstream engineering understanding, economic evaluation, and strategic advisory experience to help clients make clearer and more reliable project decisions.",
            profile_point_1: "Reservoir & Production Understanding",
            profile_point_2: "Economic & Fiscal Evaluation",
            profile_point_3: "Investment-Oriented Recommendations",

            faq_title: "Frequently Asked Questions",
            faq_desc: "Common questions about our oil and gas consulting services, software tools, and project support.",

            faq_1_q: "What type of oil and gas projects do you support?",
            faq_1_a: "We support upstream oil and gas projects including asset evaluation, production review, field development planning, PSC economic analysis, and technical due diligence.",

            faq_2_q: "Can you support PSC economic evaluation?",
            faq_2_a: "Yes. We provide PSC economic analysis including cashflow modeling, NPV, IRR, payout calculation, cost recovery, gross split, sensitivity, and scenario evaluation.",

            faq_3_q: "Do you provide technical due diligence services?",
            faq_3_a: "Yes. We provide independent technical and commercial review to support acquisition, divestment, financing, project screening, and investment decisions.",

            faq_4_q: "Are the software tools free to download?",
            faq_4_a: "Yes. Selected oil and gas tools are provided as free resources to support technical and economic evaluation activities.",

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

            services_detail_label: "Explore Services",
            services_detail_title: "Integrated Oil & Gas Consulting Services",
            services_detail_desc: "We provide technical, economic, and strategic advisory services to support upstream oil and gas projects from asset evaluation to investment decision-making.",

            services_capabilities_title: "Our Consulting Capabilities",
            services_capabilities_desc: "Our services are designed to help operators, investors, and institutions evaluate upstream assets with clear technical analysis, reliable economic modeling, and practical development recommendations.",

            detail_service_1_title: "Reservoir & Production Engineering",
            detail_service_1_desc: "Technical evaluation of reservoir performance, production behavior, reserves potential, and field optimization opportunities.",
            detail_service_1_item_1: "Reservoir performance review",
            detail_service_1_item_2: "Production forecasting",
            detail_service_1_item_3: "Well performance analysis",
            detail_service_1_item_4: "Reserves and resources evaluation",

            detail_service_2_title: "Economic & Fiscal Modeling",
            detail_service_2_desc: "Economic evaluation for upstream projects using cashflow modeling, fiscal terms, investment indicators, and sensitivity scenarios.",
            detail_service_2_item_1: "PSC economic analysis",
            detail_service_2_item_2: "NPV, IRR, and payout calculation",
            detail_service_2_item_3: "Cost recovery and gross split modeling",
            detail_service_2_item_4: "Sensitivity and scenario analysis",

            detail_service_3_title: "Field Development Planning",
            detail_service_3_desc: "Structured field development support covering development concepts, production strategy, cost optimization, and risk assessment.",
            detail_service_3_item_1: "Development concept selection",
            detail_service_3_item_2: "CAPEX and OPEX optimization",
            detail_service_3_item_3: "Development scheduling",
            detail_service_3_item_4: "Risk and uncertainty review",

            detail_service_4_title: "Technical Due Diligence",
            detail_service_4_desc: "Independent technical and commercial assessment to support asset acquisition, divestment, financing, and investment screening.",
            detail_service_4_item_1: "Asset valuation support",
            detail_service_4_item_2: "Subsurface and facilities review",
            detail_service_4_item_3: "Investment screening",
            detail_service_4_item_4: "Independent technical opinion",

            detail_service_5_title: "Oil & Gas Software Tools",
            detail_service_5_desc: "Practical tools and templates to support technical and economic evaluations for upstream oil and gas projects.",
            detail_service_5_item_1: "PSC Economic Tool",
            detail_service_5_item_2: "Well Log Display Tool",
            detail_service_5_item_3: "Engineering and evaluation templates",
            detail_service_5_item_4: "Simple decision-support utilities",

            detail_service_6_title: "Strategic Advisory",
            detail_service_6_desc: "Advisory support for upstream business decisions, portfolio review, development strategy, and project prioritization.",
            detail_service_6_item_1: "Portfolio review",
            detail_service_6_item_2: "Project screening",
            detail_service_6_item_3: "Commercial strategy",
            detail_service_6_item_4: "Decision-support recommendations",

            workflow_title: "How We Work",
            workflow_desc: "We use a structured consulting approach to ensure every project is reviewed with clear objectives, reliable data, practical analysis, and actionable recommendations.",
            workflow_1_title: "Project Understanding",
            workflow_1_desc: "We define project objectives, available data, key issues, and expected decision outputs.",
            workflow_2_title: "Technical Review",
            workflow_2_desc: "We evaluate reservoir, production, facilities, cost, risk, and project assumptions.",
            workflow_3_title: "Economic Evaluation",
            workflow_3_desc: "We model project cashflow, fiscal terms, investment metrics, and sensitivity cases.",
            workflow_4_title: "Recommendation",
            workflow_4_desc: "We deliver clear conclusions and practical recommendations for technical and investment decisions.",

            services_cta_title: "Ready to Discuss Your Project?",
            services_cta_desc: "Contact us to discuss how our technical, economic, and strategic advisory services can support your upstream oil and gas project.",
            services_cta_contact: "Contact Us",
            services_cta_home: "Back to Home",

            download_now: "Download Now",
            back_home: "← Back to Home"
            
        },

        id: {
            nav_about: "Tentang",
            nav_services: "Layanan",
            nav_experience: "Pengalaman",
            nav_contact: "Kontak",
            nav_purchase: "Pembelian",
            dropdown_service_1: "Reservoir & Produksi",
            dropdown_service_2: "Ekonomi & Fiskal",
            dropdown_service_3: "Pengembangan Lapangan",

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


            purchase_label: "Pembelian Profesional",
            purchase_title: "Pilih Paket Dukungan Profesional",
            purchase_desc: "Pilih paket konsultasi atau dukungan software, kirim detail proyek Anda, lalu terima penawaran profesional atau konfirmasi invoice.",
            purchase_step_1: "Pilih paket",
            purchase_step_2: "Kirim detail proyek",
            purchase_step_3: "Terima penawaran / invoice",
            package_1_badge: "Starter",
            package_1_title: "Konsultasi Teknis",
            package_1_desc: "Diskusi awal dan kajian profesional untuk kebutuhan hulu minyak dan gas tahap awal.",
            package_1_item_1: "Kajian kebutuhan proyek",
            package_1_item_2: "Sesi konsultasi online",
            package_1_item_3: "Ringkasan rekomendasi",
            package_2_badge: "Rekomendasi",
            package_2_title: "Evaluasi Ekonomi",
            package_2_desc: "Kajian model ekonomi PSC untuk cashflow, NPV, IRR, sensitivitas, dan penyaringan investasi.",
            package_2_item_1: "Penyusunan model PSC / fiskal",
            package_2_item_2: "NPV, IRR, payout, dan sensitivitas",
            package_2_item_3: "Ringkasan evaluasi profesional",
            package_3_badge: "Advanced",
            package_3_title: "Konsultasi Terintegrasi",
            package_3_desc: "Dukungan teknis, ekonomi, dan strategis untuk pengembangan lapangan atau evaluasi aset.",
            package_3_item_1: "Kajian reservoir / produksi",
            package_3_item_2: "Asumsi pengembangan dan biaya",
            package_3_item_3: "Rekomendasi berorientasi keputusan",
            package_price_quote: "Minta Penawaran",
            package_price_custom: "Biaya Sesuai Proyek",
            package_price_scope: "Sesuai Ruang Lingkup",
            package_btn: "Pesan Paket",
            purchase_note: "Alur permintaan aman: detail order dikirim ke konsultan terlebih dahulu. Pembayaran hanya dikonfirmasi setelah penawaran atau invoice disetujui.",
            professional_support: "Minta Dukungan Profesional",

            checkout_label: "Pembelian Profesional",
            checkout_title: "Minta Penawaran Layanan",
            checkout_desc: "Lengkapi formulir di bawah untuk meminta penawaran, invoice, atau konfirmasi dukungan profesional. Permintaan Anda akan dikirim langsung ke konsultan melalui WhatsApp.",
            checkout_form_title: "Detail Order",
            checkout_plan_label: "Paket yang dipilih",
            checkout_option_consultation: "Konsultasi Teknis",
            checkout_option_economic: "Evaluasi Ekonomi",
            checkout_option_integrated: "Konsultasi Terintegrasi",
            checkout_option_psc: "Dukungan Software PSC Economic",
            checkout_option_welllog: "Dukungan Software Well Log Display",
            checkout_name_label: "Nama lengkap",
            checkout_name_placeholder: "Nama Anda",
            checkout_company_label: "Perusahaan / institusi",
            checkout_company_placeholder: "Nama perusahaan",
            checkout_email_label: "Email",
            checkout_phone_label: "WhatsApp / telepon",
            checkout_brief_label: "Ringkasan proyek",
            checkout_brief_placeholder: "Jelaskan proyek, ketersediaan data, output yang diharapkan, dan timeline.",
            checkout_submit: "Kirim Permintaan via WhatsApp",
            checkout_form_note: "Form ini tidak mengambil pembayaran otomatis. Pembayaran diproses setelah penawaran atau invoice disetujui.",
            checkout_summary_label: "Ringkasan Order",
            checkout_summary_desc: "Kirim detail Anda dan tim kami akan meninjau ruang lingkup sebelum mengonfirmasi penawaran dan langkah berikutnya.",
            checkout_summary_price_label: "Harga",
            checkout_summary_payment_label: "Pembayaran",
            checkout_summary_payment: "Invoice / transfer bank setelah konfirmasi",
            checkout_summary_delivery_label: "Pengiriman",
            checkout_summary_delivery: "Konsultasi online / laporan proyek sesuai ruang lingkup",
            checkout_change_package: "← Ganti paket",
            services_cta_order: "Pesan Layanan Profesional",

            footer_rights: "Oil and Gas Consulting. Seluruh Hak Dilindungi.",

            selected_exp_title: "Pengalaman Terpilih",
            selected_exp_desc: "Pengalaman konsultasi terpilih dalam mendukung evaluasi hulu minyak dan gas, keputusan investasi, dan perencanaan pengembangan lapangan.",

            selected_exp_1_tag: "Evaluasi Aset",
            selected_exp_1_title: "Evaluasi Aset Hulu Migas",
            selected_exp_1_desc: "Evaluasi teknis dan komersial terhadap aset hulu minyak dan gas, termasuk potensi produksi, prospek cadangan, asumsi biaya, dan penyaringan investasi.",

            selected_exp_2_tag: "Kajian Ekonomi",
            selected_exp_2_title: "Analisis Ekonomi PSC",
            selected_exp_2_desc: "Pemodelan cashflow dan analisis fiskal untuk proyek Production Sharing Contract, termasuk NPV, IRR, payout, sensitivitas, dan evaluasi skenario.",

            selected_exp_3_tag: "Perencanaan Pengembangan",
            selected_exp_3_title: "Dukungan Perencanaan Pengembangan Lapangan",
            selected_exp_3_desc: "Dukungan untuk pemilihan konsep pengembangan, strategi produksi, kajian CAPEX/OPEX, penjadwalan proyek, dan penilaian risiko.",

            selected_exp_4_tag: "Kajian Teknis",
            selected_exp_4_title: "Kajian Produksi & Kinerja Sumur",
            selected_exp_4_desc: "Kajian perilaku produksi, kinerja sumur, kendala operasi, dan peluang optimasi untuk meningkatkan kinerja aset.",

            profile_label: "Profil Konsultan",
            profile_title: "Konsultasi Praktis Berbasis Wawasan Teknis dan Komersial",
            profile_desc: "Pendekatan konsultasi kami menggabungkan pemahaman rekayasa hulu, evaluasi ekonomi, dan pengalaman konsultasi strategis untuk membantu klien membuat keputusan proyek yang lebih jelas dan andal.",
            profile_point_1: "Pemahaman Reservoir & Produksi",
            profile_point_2: "Evaluasi Ekonomi & Fiskal",
            profile_point_3: "Rekomendasi Berorientasi Investasi",

            faq_title: "Pertanyaan yang Sering Diajukan",
            faq_desc: "Pertanyaan umum mengenai layanan konsultasi minyak dan gas, perangkat lunak, dan dukungan proyek kami.",

            faq_1_q: "Jenis proyek minyak dan gas apa yang dapat didukung?",
            faq_1_a: "Kami mendukung proyek hulu minyak dan gas, termasuk evaluasi aset, kajian produksi, perencanaan pengembangan lapangan, analisis ekonomi PSC, dan uji tuntas teknis.",

            faq_2_q: "Apakah dapat mendukung evaluasi ekonomi PSC?",
            faq_2_a: "Ya. Kami menyediakan analisis ekonomi PSC, termasuk pemodelan cashflow, NPV, IRR, perhitungan payout, cost recovery, gross split, sensitivitas, dan evaluasi skenario.",

            faq_3_q: "Apakah tersedia layanan technical due diligence?",
            faq_3_a: "Ya. Kami menyediakan kajian teknis dan komersial independen untuk mendukung akuisisi, divestasi, pembiayaan, penyaringan proyek, dan keputusan investasi.",

            faq_4_q: "Apakah software tools dapat diunduh gratis?",
            faq_4_a: "Ya. Beberapa tools minyak dan gas tersedia sebagai sumber daya gratis untuk mendukung kegiatan evaluasi teknis dan ekonomi.",

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

            services_detail_label: "Lihat Layanan",
            services_detail_title: "Layanan Konsultasi Minyak & Gas Terintegrasi",
            services_detail_desc: "Kami menyediakan layanan konsultasi teknis, ekonomi, dan strategis untuk mendukung proyek hulu minyak dan gas, mulai dari evaluasi aset hingga pengambilan keputusan investasi.",

            services_capabilities_title: "Kapabilitas Konsultasi Kami",
            services_capabilities_desc: "Layanan kami dirancang untuk membantu operator, investor, dan institusi dalam mengevaluasi aset hulu melalui analisis teknis yang jelas, pemodelan ekonomi yang andal, serta rekomendasi pengembangan yang praktis.",

            detail_service_1_title: "Rekayasa Reservoir & Produksi",
            detail_service_1_desc: "Evaluasi teknis terhadap kinerja reservoir, perilaku produksi, potensi cadangan, dan peluang optimasi lapangan.",
            detail_service_1_item_1: "Kajian kinerja reservoir",
            detail_service_1_item_2: "Proyeksi produksi",
            detail_service_1_item_3: "Analisis kinerja sumur",
            detail_service_1_item_4: "Evaluasi cadangan dan sumber daya",

            detail_service_2_title: "Pemodelan Ekonomi & Fiskal",
            detail_service_2_desc: "Evaluasi ekonomi proyek hulu menggunakan pemodelan cashflow, ketentuan fiskal, indikator investasi, dan skenario sensitivitas.",
            detail_service_2_item_1: "Analisis keekonomian PSC",
            detail_service_2_item_2: "Perhitungan NPV, IRR, dan payout",
            detail_service_2_item_3: "Pemodelan cost recovery dan gross split",
            detail_service_2_item_4: "Analisis sensitivitas dan skenario",

            detail_service_3_title: "Perencanaan Pengembangan Lapangan",
            detail_service_3_desc: "Dukungan perencanaan pengembangan lapangan secara terstruktur, mencakup konsep pengembangan, strategi produksi, optimasi biaya, dan penilaian risiko.",
            detail_service_3_item_1: "Pemilihan konsep pengembangan",
            detail_service_3_item_2: "Optimasi CAPEX dan OPEX",
            detail_service_3_item_3: "Penjadwalan pengembangan",
            detail_service_3_item_4: "Kajian risiko dan ketidakpastian",

            detail_service_4_title: "Uji Tuntas Teknis",
            detail_service_4_desc: "Penilaian teknis dan komersial independen untuk mendukung akuisisi aset, divestasi, pembiayaan, dan penyaringan investasi.",
            detail_service_4_item_1: "Dukungan valuasi aset",
            detail_service_4_item_2: "Kajian subsurface dan fasilitas",
            detail_service_4_item_3: "Penyaringan investasi",
            detail_service_4_item_4: "Opini teknis independen",

            detail_service_5_title: "Perangkat Lunak Minyak & Gas",
            detail_service_5_desc: "Tools dan template praktis untuk mendukung evaluasi teknis dan ekonomi pada proyek hulu minyak dan gas.",
            detail_service_5_item_1: "Alat PSC Economic",
            detail_service_5_item_2: "Alat Well Log Display",
            detail_service_5_item_3: "Template rekayasa dan evaluasi",
            detail_service_5_item_4: "Utilitas sederhana pendukung keputusan",

            detail_service_6_title: "Konsultasi Strategis",
            detail_service_6_desc: "Dukungan konsultasi untuk keputusan bisnis hulu, kajian portofolio, strategi pengembangan, dan prioritas proyek.",
            detail_service_6_item_1: "Kajian portofolio",
            detail_service_6_item_2: "Penyaringan proyek",
            detail_service_6_item_3: "Strategi komersial",
            detail_service_6_item_4: "Rekomendasi pendukung keputusan",

            workflow_title: "Cara Kerja Kami",
            workflow_desc: "Kami menggunakan pendekatan konsultasi yang terstruktur agar setiap proyek dikaji dengan tujuan yang jelas, data yang andal, analisis praktis, dan rekomendasi yang dapat diterapkan.",
            workflow_1_title: "Pemahaman Proyek",
            workflow_1_desc: "Kami mendefinisikan tujuan proyek, data yang tersedia, isu utama, dan keluaran keputusan yang diharapkan.",
            workflow_2_title: "Kajian Teknis",
            workflow_2_desc: "Kami mengevaluasi reservoir, produksi, fasilitas, biaya, risiko, dan asumsi proyek.",
            workflow_3_title: "Evaluasi Ekonomi",
            workflow_3_desc: "Kami memodelkan cashflow proyek, ketentuan fiskal, metrik investasi, dan skenario sensitivitas.",
            workflow_4_title: "Rekomendasi",
            workflow_4_desc: "Kami menyampaikan kesimpulan yang jelas dan rekomendasi praktis untuk keputusan teknis dan investasi.",

            services_cta_title: "Siap Mendiskusikan Proyek Anda?",
            services_cta_desc: "Hubungi kami untuk mendiskusikan bagaimana layanan konsultasi teknis, ekonomi, dan strategis kami dapat mendukung proyek hulu minyak dan gas Anda.",
            services_cta_contact: "Hubungi Kami",
            services_cta_home: "Kembali ke Beranda",

            download_now: "Unduh Sekarang",
            back_home: "← Kembali ke Beranda"
        }
    };


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

    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    setLanguage(savedLanguage);

});