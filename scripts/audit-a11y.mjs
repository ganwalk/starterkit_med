/**
 * Auditoria de teclado e leitor de tela.
 *
 * Complementa scripts/audit-ux.mjs, que cobre contraste, espaçamento e cortes.
 * Aqui o alvo é o que só aparece quando alguém navega sem mouse ou sem ver a
 * tela: nome acessível, ordem de foco, armadilha de foco em diálogo,
 * devolução do foco ao fechar, marcos de página e anúncio de mudança.
 *
 * Uso: npm run dev e, noutro terminal, node scripts/audit-a11y.mjs
 */
import { chromium } from 'playwright'

const BASE = 'http://localhost:5173/starterkit_med/#'
const ROTAS = [
  '/agenda', '/recepcao', '/pacientes', '/conversas', '/funil',
  '/indicadores', '/financeiro', '/migracao', '/marca', '/suporte',
  '/seguranca', '/portal', '/design-system',
]

/** Roda no browser: coleta o que precisa do DOM. */
const COLETA = () => {
  const SELETOR_FOCAVEL =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

  const nomeAcessivel = (el) => {
    const aria = el.getAttribute('aria-label')
    if (aria?.trim()) return aria.trim()
    const labelledby = el.getAttribute('aria-labelledby')
    if (labelledby) {
      const alvo = document.getElementById(labelledby)
      if (alvo?.textContent?.trim()) return alvo.textContent.trim()
    }
    if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
      const lbl = el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)
      if (lbl?.textContent?.trim()) return lbl.textContent.trim()
      const ph = el.getAttribute('placeholder')
      if (ph?.trim()) return `(placeholder) ${ph.trim()}`
    }
    const texto = el.textContent?.trim()
    if (texto) return texto
    const title = el.getAttribute('title')
    if (title?.trim()) return title.trim()
    return ''
  }

  const out = {
    semNome: [],
    ordemFoco: [],
    marcos: {},
    navAtiva: null,
    tabsSemPainel: [],
    cliqueSemTeclado: [],
    focaveis: 0,
    skipLink: false,
    regioesVivas: 0,
  }

  const focaveis = [...document.querySelectorAll(SELETOR_FOCAVEL)].filter((el) => {
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0
  })
  out.focaveis = focaveis.length

  for (const el of focaveis) {
    const nome = nomeAcessivel(el)
    if (!nome) {
      out.semNome.push({
        tag: el.tagName.toLowerCase(),
        classe: (el.className || '').toString().slice(0, 60),
        html: el.outerHTML.slice(0, 90),
      })
    }
    const r = el.getBoundingClientRect()
    out.ordemFoco.push({ nome: nome.slice(0, 30), top: Math.round(r.top), left: Math.round(r.left) })
  }

  // Marcos de página
  for (const [chave, sel] of [
    ['main', 'main, [role="main"]'],
    ['nav', 'nav, [role="navigation"]'],
    ['banner', 'header, [role="banner"]'],
  ]) {
    out.marcos[chave] = document.querySelectorAll(sel).length
  }

  // Link de pular para o conteúdo
  const primeiro = document.querySelector('body a, body button')
  out.skipLink = Boolean(primeiro && /pular|skip/i.test(primeiro.textContent || ''))

  // Item de navegação ativo precisa se anunciar
  const ativo = document.querySelector('nav a[aria-current], nav [aria-current]')
  out.navAtiva = ativo ? ativo.getAttribute('aria-current') : null

  // Abas precisam apontar para o painel que controlam
  for (const tab of document.querySelectorAll('[role="tab"]')) {
    if (!tab.getAttribute('aria-controls')) {
      out.tabsSemPainel.push(nomeAcessivel(tab).slice(0, 30))
    }
  }

  // Elemento clicável que não é botão nem link e não tem teclado
  for (const el of document.querySelectorAll('[onclick]')) {
    const tag = el.tagName.toLowerCase()
    if (tag === 'button' || tag === 'a') continue
    if (el.getAttribute('tabindex') === null) {
      out.cliqueSemTeclado.push(tag + '.' + (el.className || '').toString().slice(0, 40))
    }
  }

  out.regioesVivas = document.querySelectorAll('[aria-live], [role="status"], [role="alert"]').length

  return out
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const problemas = []
const resumo = []

for (const rota of ROTAS) {
  await page.goto(`${BASE}${rota}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const r = await page.evaluate(COLETA)

  // Ordem de foco deve acompanhar a ordem visual (tolerância de 1 linha)
  let saltos = 0
  for (let i = 1; i < r.ordemFoco.length; i += 1) {
    const a = r.ordemFoco[i - 1]
    const b = r.ordemFoco[i]
    if (b.top < a.top - 40) saltos += 1
  }

  resumo.push({
    rota,
    focaveis: r.focaveis,
    semNome: r.semNome.length,
    saltos,
    main: r.marcos.main,
    nav: r.marcos.nav,
    navAtiva: r.navAtiva,
    tabsSemPainel: r.tabsSemPainel.length,
    cliqueSemTeclado: r.cliqueSemTeclado.length,
    regioesVivas: r.regioesVivas,
    skipLink: r.skipLink,
  })

  for (const s of r.semNome) problemas.push(`${rota} · sem nome acessível: ${s.html}`)
  for (const t of r.tabsSemPainel) problemas.push(`${rota} · aba sem aria-controls: "${t}"`)
  for (const c of r.cliqueSemTeclado) problemas.push(`${rota} · clicável sem teclado: ${c}`)
}

console.log('\n=== POR ROTA ===')
console.log(
  'rota'.padEnd(16),
  'foco'.padEnd(6),
  's/nome'.padEnd(7),
  'saltos'.padEnd(7),
  'main'.padEnd(5),
  'nav'.padEnd(4),
  'atual'.padEnd(6),
  'vivas',
)
for (const r of resumo) {
  console.log(
    r.rota.padEnd(16),
    String(r.focaveis).padEnd(6),
    String(r.semNome).padEnd(7),
    String(r.saltos).padEnd(7),
    String(r.main).padEnd(5),
    String(r.nav).padEnd(4),
    String(r.navAtiva ?? '—').padEnd(6),
    String(r.regioesVivas),
  )
}

/* ---------------- Armadilha e devolução de foco em diálogo ---------------- */

console.log('\n=== DIÁLOGO: ARMADILHA E DEVOLUÇÃO DE FOCO ===')

const CASOS = [
  { rota: '/agenda', abrir: 'Novo agendamento' },
  { rota: '/pacientes', abrir: null, linha: true },
]

for (const caso of CASOS) {
  await page.goto(`${BASE}${caso.rota}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)

  if (caso.abrir) {
    await page.getByRole('button', { name: new RegExp(caso.abrir, 'i') }).first().click()
  } else if (caso.linha) {
    await page.locator('tbody tr').first().click()
  }
  await page.waitForTimeout(500)

  const temDialogo = await page.locator('[role="dialog"]').count()
  if (!temDialogo) {
    problemas.push(`${caso.rota} · diálogo não abriu no teste`)
    continue
  }

  // Foco inicial deve entrar no diálogo
  const focoInicialDentro = await page.evaluate(() =>
    Boolean(document.activeElement?.closest('[role="dialog"]')),
  )

  // Tab 25 vezes: o foco não pode escapar para trás do diálogo
  let escapou = 0
  for (let i = 0; i < 25; i += 1) {
    await page.keyboard.press('Tab')
    const dentro = await page.evaluate(() =>
      Boolean(document.activeElement?.closest('[role="dialog"]')),
    )
    if (!dentro) escapou += 1
  }

  await page.keyboard.press('Escape')
  await page.waitForTimeout(400)
  const fechou = (await page.locator('[role="dialog"]').count()) === 0
  const focoDevolvido = await page.evaluate(() => {
    const el = document.activeElement
    return el !== null && el !== document.body
  })

  console.log(
    `${caso.rota.padEnd(14)} foco entra: ${focoInicialDentro ? 'sim' : 'NAO'} | escapou em ${escapou}/25 tabs | Esc fecha: ${fechou ? 'sim' : 'NAO'} | foco devolvido: ${focoDevolvido ? 'sim' : 'NAO'}`,
  )

  if (!focoInicialDentro) problemas.push(`${caso.rota} · foco não entra no diálogo ao abrir`)
  if (escapou > 0) problemas.push(`${caso.rota} · foco escapa do diálogo (${escapou}/25 tabs)`)
  if (!fechou) problemas.push(`${caso.rota} · Escape não fecha o diálogo`)
  if (!focoDevolvido) problemas.push(`${caso.rota} · foco não volta ao gatilho ao fechar`)
}

/* -------------------------- Navegação só com Tab ------------------------- */

console.log('\n=== ALCANCE POR TECLADO ===')
await page.goto(`${BASE}/agenda`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
const alcance = await page.evaluate(async () => {
  const total = document.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
  ).length
  return total
})
console.log(`/agenda tem ${alcance} elementos focáveis`)

/* ------------------------------- Resultado ------------------------------- */

console.log('\n=== PROBLEMAS ===')
if (problemas.length === 0) {
  console.log('nenhum')
} else {
  const unicos = [...new Set(problemas)]
  unicos.slice(0, 40).forEach((p) => console.log('  ' + p))
  if (unicos.length > 40) console.log(`  ... e mais ${unicos.length - 40}`)
  console.log(`\ntotal: ${unicos.length} problemas únicos`)
}

await browser.close()
