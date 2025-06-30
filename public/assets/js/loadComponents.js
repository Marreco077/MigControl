const loadedStyles = new Set();
const path = window.location.pathname;

const headerStyles = () => {
  const header = document.querySelector('.header-main');
  const logo = document.querySelector('.logo');
  const navItems = document.querySelectorAll('.nav-link');
  const btnSearch = document.querySelector('.fa-search');

  if (window.scrollY > 0) {
    header.classList.add('scrolled');
    logo.src = '/assets/images/LogoMigControlAzul.png';
    navItems.forEach((navItem) => {
      navItem.style.color = 'var(--color-gray-800)';
    });
    btnSearch.style.color = 'var(--color-gray-800)';
  } else {
    header.classList.remove('scrolled');
    if (path.includes('/produto-')) {
      logo.src = '/assets/images/LogoMigControlAzul.png';
      navItems.forEach((navItem) => {
        navItem.style.color = 'var(--color-gray-800)';
      });
      btnSearch.style.color = 'var(--color-gray-800)';
    } else {
      logo.src = '/assets/images/LogoMigControlBranca.png';
      navItems.forEach((navItem) => {
        navItem.style.color = 'var(--color-gray-100)';
      });
      btnSearch.style.color = 'var(--color-gray-100)';
    }
  }
};

window.addEventListener('scroll', headerStyles);

const dropSubmenu = () => {
  document.querySelectorAll('.submenu-toggle').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      submenu.classList.toggle('open');
    });
  });
};

export async function loadComponent(componentName, targetElementId) {
  try {
    console.log(`🔄 Carregando componente: ${componentName}`);

    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    const componentPath = `${basePath}partials/${componentName}.html`;
    const cssPath = `${basePath}assets/css/${componentName}.css`;

    // Carrega CSS se ainda não estiver carregado
    if (!loadedStyles.has(cssPath)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
      loadedStyles.add(cssPath);
      console.log(`✅ CSS de "${componentName}" carregado`);
    }

    // Busca e insere HTML do componente
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Erro ao carregar: ${response.status}`);

    const html = await response.text();
    const targetElement = document.getElementById(targetElementId);

    if (targetElement) {
      targetElement.innerHTML = html;
      console.log(`✅ Componente "${componentName}" inserido em #${targetElementId}`);

      setTimeout(() => {
        headerStyles();
        dropSubmenu();
      }, 100);

      if (componentName === 'forms') {
        // Carrega forms.js dinamicamente e inicializa
        setTimeout(async () => {
          try {
            const module = await import('./forms.js');
            if (typeof module.initializeForms === 'function') {
              module.initializeForms();
              console.log('✅ forms.js carregado e inicializado');
            } else {
              console.warn('⚠️ initializeForms() não exportado corretamente.');
            }
          } catch (err) {
            console.error('❌ Erro ao carregar forms.js:', err);
          }
        }, 100);
      }
    } else {
      console.error(`❌ Elemento destino "${targetElementId}" não encontrado no DOM`);
    }
  } catch (error) {
    console.error(`❌ Falha ao carregar o componente "${componentName}":`, error);
  }
}

// Carregamento inicial
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM carregado, iniciando componentes...');
  loadComponent('footer', 'footer');
  loadComponent('header', 'header');
  loadComponent('forms', 'forms');
});
