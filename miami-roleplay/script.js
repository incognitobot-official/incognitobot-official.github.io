// Example data for handbooks
const handbooks = [
    { title: "Employee Handbook", description: "A comprehensive guide for company policies and procedures." },
    { title: "Student Handbook", description: "Rules and resources for academic success." },
    { title: "Tech Handbook", description: "Documentation for tech tools and platforms." }
];

// Populate handbook list dynamically
document.addEventListener("DOMContentLoaded", () => {
    const handbookList = document.getElementById("handbook-list");
    handbooks.forEach(handbook => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${handbook.title}</strong>: ${handbook.description}`;
        handbookList.appendChild(listItem);
    });

    // Form submission handler
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for your message! We'll get back to you soon.");
        contactForm.reset();
    });
});
