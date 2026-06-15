const menu = document.querySelector(".mobile-menu");
const toggle = document.querySelector(".mobile-menu-toggle");
const closeButton = document.querySelector(".mobile-menu__close");
const links = menu?.querySelectorAll("a") ?? [];

function setMenuOpen(isOpen) {
  if (!menu || !toggle) return;

  menu.classList.toggle("is-open", isOpen);
  menu.setAttribute("aria-hidden", String(!isOpen));
  toggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("mobile-menu-open", isOpen);

  if (isOpen) closeButton?.focus();
}

toggle?.addEventListener("click", () => setMenuOpen(true));
closeButton?.addEventListener("click", () => setMenuOpen(false));
links.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.classList.contains("is-open")) {
    setMenuOpen(false);
    toggle?.focus();
  }
});
