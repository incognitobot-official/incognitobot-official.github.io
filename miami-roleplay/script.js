document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for your message! We'll get back to you soon.");
        contactForm.reset();
    });
});
