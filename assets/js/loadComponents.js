async function loadComponent(componentName, targetElementId) {
  try {
    const basePath = window.location.pathname.includes("/pages/")
      ? "../"
      : "./";
    const response = await fetch(`${basePath}partials/${componentName}.html`);
    const html = await response.text();
    document.getElementById(targetElementId).innerHTML = html;
  } catch (error) {
    console.error(`Erro ao carregar ${componentName}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "header");
  loadComponent("footer", "footer");
});