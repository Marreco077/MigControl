const loadedStyles = new Set()
const path = window.location.pathname

const headerStyles = () => {
  const header = document.querySelector('.header-main')
  const logo = document.querySelector('.logo')
  const navItems = document.querySelectorAll('.nav-link')
  const btnSearch = document.querySelector('.fa-search')

  if (window.scrollY > 0) {
    header.classList.add('scrolled')

    logo.src = '/assets/images/LogoMigControlAzul.png'
    navItems.forEach((navItem) => {
      navItem.style.color = 'var(--color-gray-800)'
    })
    btnSearch.style.color = 'var(--color-gray-800)'
  } else {
    header.classList.remove('scrolled')
    if (path === '/relogio-de-ponto.html') {
      logo.src = '/assets/images/LogoMigControlAzul.png'
      navItems.forEach((navItem) => {
        navItem.style.color = 'var(--color-gray-800)'
      })
      btnSearch.style.color = 'var(--color-gray-800)'
    } else {
      logo.src = '/assets/images/LogoMigControlBranca.png'
      navItems.forEach((navItem) => {
        navItem.style.color = 'var(--color-gray-100)'
      })
      btnSearch.style.color = 'var(--color-gray-100)'
    }
  }
}

window.addEventListener('scroll', headerStyles)

async function loadComponent(componentName, targetElementId) {
  try {
    console.log(`Tentando carregar: ${componentName}`)
    console.log(`Caminho atual: ${window.location.pathname}`)

    // Determinar caminho base para HTML e CSS
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './'
    const componentPath = `${basePath}partials/${componentName}.html`
    const cssPath = `${basePath}assets/css/${componentName}.css`

    console.log(`Caminho do componente: ${componentPath}`)
    console.log(`Caminho do CSS: ${cssPath}`)

    // Carregar CSS se ainda não carregado
    if (!loadedStyles.has(cssPath)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssPath
      document.head.appendChild(link)
      loadedStyles.add(cssPath)
      console.log(`✅ CSS do ${componentName} carregado`)
    } else {
      console.log(`CSS do ${componentName} já carregado`)
    }

    // Buscar e inserir HTML
    const response = await fetch(componentPath)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const targetElement = document.getElementById(targetElementId)

    if (targetElement) {
      targetElement.innerHTML = html
      console.log(`✅ ${componentName} carregado com sucesso!`)

      setTimeout(() => {
        headerStyles()
      }, 100)
    } else {
      console.error(`❌ Elemento com ID "${targetElementId}" não encontrado`)
    }
  } catch (error) {
    console.error(`❌ Erro ao carregar ${componentName}:`, error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, iniciando carregamento dos componentes...')

  loadComponent('footer', 'footer')
  loadComponent('header', 'header')
})
