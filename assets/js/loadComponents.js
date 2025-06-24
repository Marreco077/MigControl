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
    console.log(`🔄 Carregando componente: ${componentName}`)

    const basePath = window.location.pathname.includes('/pages/') ? '../' : './'
    const componentPath = `${basePath}partials/${componentName}.html`
    const cssPath = `${basePath}assets/css/${componentName}.css`

    // Carregar CSS se ainda não estiver carregado
    if (!loadedStyles.has(cssPath)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssPath
      document.head.appendChild(link)
      loadedStyles.add(cssPath)
      console.log(`✅ CSS de "${componentName}" carregado`)
    }

    // Buscar e inserir HTML do componente
    const response = await fetch(componentPath)
    if (!response.ok) throw new Error(`Erro ao carregar: ${response.status}`)

    const html = await response.text()
    const targetElement = document.getElementById(targetElementId)

    if (targetElement) {
      targetElement.innerHTML = html
      console.log(`✅ Componente "${componentName}" inserido em #${targetElementId}`)

      setTimeout(() => {
        headerStyles()
      }, 100)

      // 👇 Executar JS especial para o componente 'forms'
      if (componentName === 'forms') {
        setTimeout(() => {
          const form = document.getElementById("formularioContato")
          const formModalEl = document.getElementById("formModal")
          const confirmModalEl = document.getElementById("confirmModal")

          if (form && formModalEl && confirmModalEl) {
            const formModal = new bootstrap.Modal(formModalEl)
            const confirmModal = new bootstrap.Modal(confirmModalEl)

            form.addEventListener("submit", function (e) {
              e.preventDefault()

              setTimeout(() => {
                formModal.hide()
                confirmModal.show()
                form.reset()
              }, 500)
            })
          } else {
            console.warn("⚠️ Elementos do formulário não encontrados após load.")
          }
        }, 100) // garante que DOM está pronto após inserção
      }

    } else {
      console.error(`❌ Elemento destino "${targetElementId}" não encontrado no DOM`)
    }

  } catch (error) {
    console.error(`❌ Falha ao carregar o componente "${componentName}":`, error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM carregado, iniciando componentes...')

  loadComponent('footer', 'footer')
  loadComponent('header', 'header')
  loadComponent('forms', 'forms')
})
