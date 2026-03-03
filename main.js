// FAQs
const faqs = document.querySelectorAll(".faq")

// if the checked - uncheck
faqs.forEach(faq => {
    faq.addEventListener("click", ()=> {
        collapseAll();
        faq.classList.toggle("active")
    })
})

const collapseAll = () => {
    faqs.forEach(faq => {
        faq.classList.remove("active");
    })
}