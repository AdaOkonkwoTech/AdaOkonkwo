const cards = document.querySelectorAll(".card");
const wrapper = document.querySelector(".cards");

wrapper.addEventListener("mousemove", (e) => {
    cards.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        c.style.background = `radial-gradient(960px circle at ${x}px ${y}px, rgba(238, 187, 69, 0.7), transparent 15%)`;
    })
});