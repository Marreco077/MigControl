const loadedStyles = new Set();

async function loadComponent(componentName, targetElementId) {
  try {
    console.log(`Tentando carregar: ${componentName}`);
    console.log(`Caminho atual: ${window.location.pathname}`);

    // Determinar caminho base para HTML e CSS
    const basePath = window.location.pathname.includes("/pages/") ? "../" : "./";
    const componentPath = `${basePath}partials/${componentName}.html`;
    const cssPath = `${basePath}assets/css/${componentName}.css`;

    console.log(`Caminho do componente: ${componentPath}`);
    console.log(`Caminho do CSS: ${cssPath}`);

    // Carregar CSS se ainda não carregado
    if (!loadedStyles.has(cssPath)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      document.head.appendChild(link);
      loadedStyles.add(cssPath);
      console.log(`✅ CSS do ${componentName} carregado`);
    } else {
      console.log(`CSS do ${componentName} já carregado`);
    }

    // Buscar e inserir HTML
    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const targetElement = document.getElementById(targetElementId);

    if (targetElement) {
      targetElement.innerHTML = html;
      console.log(`✅ ${componentName} carregado com sucesso!`);
    } else {
      console.error(`❌ Elemento com ID "${targetElementId}" não encontrado`);
    }
  } catch (error) {
    console.error(`❌ Erro ao carregar ${componentName}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, iniciando carregamento dos componentes...");

  loadComponent("footer", "footer");
  loadComponent("header", "header"); // Descomente quando precisar
});
