const faqs = document.querySelectorAll(".faq")

// Menu
const menuBtn = document.getElementById("menu-btn")
const menuIcon = document.getElementById("menu-icon")
const menu = document.getElementById("menu")
const logoDefault = document.getElementById("logo-default")
const logoWhite = document.getElementById("logo-white")
const body = document.getElementById("body");
const menuItem = document.getElementById("menu-item");

// Tabs
const tabNavs = document.querySelectorAll(".tab-nav")
const tabs = document.getElementById("tabs")

// Form - email error handling
const form = document.getElementById("form");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");

// ----------- Applying and removing inert attribute ----------------

// Desktop width
const desktopQuery = window.matchMedia('(min-width: 768px)');

// Handling inert attribute according to screen sizes
function handleResize(e) {
    if (e.matches) {
        // Desktop: make nav interactive, remove inert, ensure menu open
        menu.removeAttribute('inert');
    } else {
        if (menuBtn.getAttribute("aria-expanded") === "false") {
            // Mobile: nav might be hidden, inert added by default
            menu.setAttribute('inert', '');
        }
    }
}

// Listen for changes
desktopQuery.addEventListener('change', handleResize);

// Initial check
handleResize(desktopQuery);

const setInert = (el, inert) => {
    if (!el) return;

    // check if browser supports native API
    if ('inert' in HTMLElement.prototype) {
        // set the native property to true/false - the subtree becomes non-interactive
        el.inert = inert;
    } else {
        // polyfill listens for attribute changes
        if (inert) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
    }

    el.setAttribute('aria-hidden', inert ? 'true' : 'false');
};

// -------------------------------------------------

// FAQs
const collapseAll = () => {
    faqs.forEach(faq => {
        faq.classList.remove("active");
    })
}

faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        const isActive = faq.classList.contains("active");
        console.log("is active:", isActive)
        collapseAll();
        if (isActive) {
            faq.classList.remove("active");
            console.log("removed active")
        }
        else {
            faq.classList.add("active")
        }
    })
})

const toggleMenu = () => {
    if (menuBtn.getAttribute("aria-expanded") === "false") {
        menuBtn.setAttribute("aria-expanded", true);
        setInert(menu, false)
    }
    else {
        menuBtn.setAttribute("aria-expanded", false);
        setInert(menu, true)
    }

    menu.classList.toggle("opacity-0");
    menu.classList.toggle("opacity-100");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-close");
    menuIcon.classList.toggle("text-white");
    logoDefault.classList.toggle("hidden");
    logoWhite.classList.toggle("hidden");
    body.classList.toggle("max-h-screen");
    body.classList.toggle("overflow-hidden");
}

// Menu
menuBtn.addEventListener("click", toggleMenu)

// Tabs navigation logic.
const deactivateAll = () => {
    Array.from(tabs.children).forEach(tab => {
        tab.classList.remove("tab-active")
        tab.classList.add("tab-inactive")
    })
    tabNavs.forEach(tabNav => {
        tabNav.classList.remove("active-tab-nav");
        tabNav.classList.add("inactive-tab-nav");
    })
}

tabNavs.forEach(tabNav => {
    tabNav.addEventListener("click", () => {
        const navIndex = Number(tabNav.dataset.tabIndex)

        // Remove all active class
        deactivateAll()
        // Add Active class to this tab
        tabs.children[navIndex].classList.remove("tab-inactive");
        tabs.children[navIndex].classList.add("tab-active");

        // Change the style of this tab nav
        tabNav.classList.add("active-tab-nav");
        tabNav.classList.remove("inactive-tab-nav");
    })
})

// ----------- Email error handling ----------------

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    console.log(re.test(String(email).toLowerCase()))
    return re.test(String(email).toLowerCase());
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const controller = email.parentElement;
    const emailValue = email.value.trim()

    if (emailValue == "") {
        emailError.classList.remove("hidden");
        email.classList.add("outline-1", "outline-cust-red-400");
        controller.classList.add("md:mb-0", "mb-4");
        emailError.innerHTML = `<i>The field is empty</i>`;
    }
    if (!validateEmail(emailValue)) {
        emailError.classList.remove("hidden");
        email.classList.add("outline-1", "outline-cust-red-400");
        controller.classList.add("md:mb-0", "mb-4");
        emailError.innerHTML = `<i>Whoops, make sure it's an email</i>`;
    }
    else {
        emailError.classList.add("hidden");
        controller.classList.remove("md:mb-0", "mb-4");
        email.classList.remove("outline-1", "outline-cust-red-400");
        form.reset()
    }
})