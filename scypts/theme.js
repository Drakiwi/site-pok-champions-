const THEME_KEY = "pokemon-theme";

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  const button = document.querySelector(".theme-toggle");
  if (!button) return;
  const light = theme === "light";
  button.setAttribute("aria-pressed", String(light));
  button.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  button.title = light ? "Dark mode" : "Light mode";
  button.innerHTML = light
    ? '<span class="theme-icon theme-icon-sun" aria-hidden="true"></span>'
    : '<span class="theme-icon theme-icon-moon" aria-hidden="true"></span>';
};

applyTheme(document.documentElement.dataset.theme || localStorage.getItem(THEME_KEY) || "dark");

document.addEventListener("click", (event) => {
  if (!event.target.closest(".theme-toggle")) return;
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});
