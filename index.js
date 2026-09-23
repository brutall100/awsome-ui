// Swaps a card's icon for its white or green version on hover
function changeImage(card, newImageUrl) {
  const img = card.querySelector("img");
  img.src = newImageUrl;
}

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  const setMenu = (open) => {
    navLinks.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  hamburger.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("active"));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  // Review slider arrows
  const track = document.querySelector(".f-section-bottom");

  document.querySelectorAll("[data-slide]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = track.querySelector(".f-section-bottom-card");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      const direction = Number(button.dataset.slide);
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      const atStart = track.scrollLeft <= 4;

      if (direction > 0 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
      else if (direction < 0 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
      else track.scrollBy({ left: step * direction, behavior: "smooth" });
    });
  });

  // Newsletter form (demo: nothing is sent anywhere)
  const form = document.querySelector(".newsletter-form");
  const input = form.querySelector("input");
  const message = form.querySelector(".form-msg");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!input.value.trim() || !input.validity.valid) {
      input.setAttribute("aria-invalid", "true");
      message.textContent = "Please enter a valid email address.";
      message.className = "form-msg is-error";
      input.focus();
      return;
    }

    input.removeAttribute("aria-invalid");
    message.textContent = "Thank you! We will get back to you soon.";
    message.className = "form-msg is-success";
    form.reset();
  });
});
