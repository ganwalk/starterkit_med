import { chromium } from 'playwright'

const ROUTES = ['/design-system', '/agenda', '/portal']
const BASE = 'http://localhost:5173/starterkit_med/#'

const AUDIT = () => {
  const out = {
    fontSizes: {},
    fontWeights: {},
    opacities: {},
    spacings: {},
    radii: {},
    overflow: [],
    contrast: [],
    headings: [],
    smallTargets: [],
    truncated: [],
    rolagemLateral: [],
    zIndex: [],
    focusables: 0,
    noFocusStyle: [],
  }

  const SCALE_PX = [11, 12, 13, 15, 17, 20, 28, 40, 44, 56] // escala de tokens
  const SPACE_OK = new Set([0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96])

  const px = (v) => Math.round(parseFloat(v) || 0)

  const lum = (rgb) => {
    const [r, g, b] = rgb.map((v) => {
      const s = v / 255
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const parseRGB = (s) => {
    const m = s.match(/rgba?\(([^)]+)\)/)
    if (!m) return null
    const p = m[1].split(',').map((x) => parseFloat(x))
    return { rgb: [p[0], p[1], p[2]], a: p[3] === undefined ? 1 : p[3] }
  }
  const bgOf = (el) => {
    let node = el
    while (node && node !== document.documentElement) {
      const c = parseRGB(getComputedStyle(node).backgroundColor)
      if (c && c.a > 0.5) return c.rgb
      node = node.parentElement
    }
    return [255, 255, 255]
  }
  const ratio = (a, b) => {
    const l1 = lum(a),
      l2 = lum(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }

  const all = [...document.querySelectorAll('body *')]

  for (const el of all) {
    const cs = getComputedStyle(el)
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) continue
    // sr-only: visível só para leitor de tela. O recorte de 1px é o
    // comportamento correto, não um corte de conteúdo.
    if (cs.clip === 'rect(0px, 0px, 0px, 0px)' || cs.clipPath === 'inset(50%)') continue
    if (rect.width <= 1 && rect.height <= 1) continue

    const hasText = [...el.childNodes].some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 0,
    )

    // tipografia
    if (hasText) {
      const fs = px(cs.fontSize)
      out.fontSizes[fs] = (out.fontSizes[fs] || 0) + 1
      out.fontWeights[cs.fontWeight] = (out.fontWeights[cs.fontWeight] || 0) + 1

      // contraste
      const fg = parseRGB(cs.color)
      if (fg) {
        const r = ratio(fg.rgb, bgOf(el))
        const big = fs >= 24 || (fs >= 18.66 && parseInt(cs.fontWeight) >= 700)
        const min = big ? 3 : 4.5
        if (r < min) {
          out.contrast.push({
            texto: el.textContent.trim().slice(0, 40),
            tag: el.tagName.toLowerCase(),
            fs,
            peso: cs.fontWeight,
            ratio: +r.toFixed(2),
            minimo: min,
            cor: cs.color,
          })
        }
      }
    }

    // opacidade
    const op = parseFloat(cs.opacity)
    if (op < 1) {
      const k = op.toFixed(2)
      out.opacities[k] = (out.opacities[k] || 0) + 1
    }

    // espaçamento
    for (const prop of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'gap']) {
      const v = px(cs[prop])
      if (v > 0) out.spacings[v] = (out.spacings[v] || 0) + 1
    }

    // raio
    const br = px(cs.borderTopLeftRadius)
    if (br > 0) out.radii[br] = (out.radii[br] || 0) + 1

    // overflow / corte
    if (el.scrollWidth > el.clientWidth + 2 && cs.overflowX !== 'auto' && cs.overflowX !== 'scroll') {
      const clipped = cs.overflow === 'hidden' || cs.textOverflow === 'ellipsis'
      out.overflow.push({
        tag: el.tagName.toLowerCase(),
        classe: (el.className || '').toString().slice(0, 60),
        texto: el.textContent.trim().slice(0, 40),
        scrollW: el.scrollWidth,
        clientW: el.clientWidth,
        cortado: clipped,
      })
    }
    if (el.scrollHeight > el.clientHeight + 2 && cs.overflow === 'hidden') {
      out.truncated.push({
        tag: el.tagName.toLowerCase(),
        classe: (el.className || '').toString().slice(0, 60),
        texto: el.textContent.trim().slice(0, 40),
        scrollH: el.scrollHeight,
        clientH: el.clientHeight,
      })
    }

    // Container rolando no eixo X. Rolagem lateral esconde conteúdo atrás
    // de uma barra que o usuário precisa caçar; a saída é o conteúdo caber,
    // não o container rolar.
    if (['auto', 'scroll'].includes(cs.overflowX) && el.scrollWidth - el.clientWidth > 2) {
      out.rolagemLateral.push({
        tag: el.tagName.toLowerCase(),
        classe: (el.className || '').toString().slice(0, 70),
        texto: el.textContent.trim().slice(0, 40),
        excesso: el.scrollWidth - el.clientWidth,
        largura: el.clientWidth,
      })
    }

    // z-index
    if (cs.zIndex !== 'auto' && parseInt(cs.zIndex) !== 0) {
      out.zIndex.push({
        z: cs.zIndex,
        tag: el.tagName.toLowerCase(),
        classe: (el.className || '').toString().slice(0, 50),
        position: cs.position,
      })
    }
  }

  // hierarquia de headings
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
  let prev = 0
  for (const h of hs) {
    const lvl = +h.tagName[1]
    if (prev && lvl > prev + 1) {
      out.headings.push({ pulo: `h${prev} -> h${lvl}`, texto: h.textContent.trim().slice(0, 45) })
    }
    prev = lvl
  }
  out.headingSeq = hs.map((h) => h.tagName.toLowerCase() + ':' + h.textContent.trim().slice(0, 28))

  // alvos de toque
  const interactive = [...document.querySelectorAll('button,a,input,select,[role="switch"],[role="tab"]')]
  out.focusables = interactive.length
  for (const el of interactive) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    // sr-only não é alvo de toque: só existe para leitor de tela
    const cs2 = getComputedStyle(el)
    if (cs2.clip === 'rect(0px, 0px, 0px, 0px)' || cs2.clipPath === 'inset(50%)') continue
    if (r.height < 32 || r.width < 32) {
      out.smallTargets.push({
        tag: el.tagName.toLowerCase(),
        rotulo: (el.getAttribute('aria-label') || el.textContent.trim()).slice(0, 30),
        w: Math.round(r.width),
        h: Math.round(r.height),
      })
    }
  }

  return out
}

const browser = await chromium.launch()
const results = {}

for (const theme of ['light', 'dark']) {
  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
    if (theme === 'dark') {
      await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'))
    }
    await page.waitForTimeout(600)
    results[`${theme}${route}`] = await page.evaluate(AUDIT)
    await page.close()
  }
}

/* ------------------------------------------------------------------------
   Rolagem lateral em TODAS as rotas e larguras.

   A primeira versão deste script só olhava scrollWidth do documento, e por
   isso passou batido um container rolando de lado dentro da página — em
   1440px, inclusive. Página sem rolagem lateral não basta: nenhum container
   pode rolar de lado.
   ------------------------------------------------------------------------ */

const TODAS_ROTAS = [
  '/agenda', '/recepcao', '/pacientes', '/conversas', '/funil', '/indicadores',
  '/financeiro', '/migracao', '/marca', '/suporte', '/seguranca', '/portal',
  '/design-system',
]

const rolagens = []
for (const width of [390, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  for (const route of TODAS_ROTAS) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    const r = await page.evaluate(() => {
      const de = document.documentElement
      const rolando = []
      const inuteis = []
      for (const el of document.querySelectorAll('*')) {
        if (el === document.body || el === de) continue
        const cs = getComputedStyle(el)
        const podeX = ['auto', 'scroll'].includes(cs.overflowX)
        const podeY = ['auto', 'scroll'].includes(cs.overflowY)
        const exX = el.scrollWidth - el.clientWidth
        const exY = el.scrollHeight - el.clientHeight
        const classe = (el.className || '').toString().slice(0, 60)

        // Rolagem lateral de verdade: sempre falha.
        if (podeX && exX > 2) rolando.push({ eixo: 'X', excesso: exX, classe })

        // Barra REALMENTE desenhada, ocupando espaço de layout, sem conteúdo
        // que a justifique. Declarar overflow num eixo faz o outro virar
        // `auto` pela especificação do CSS, então um container que pede
        // rolagem sem precisar ganha a barra do eixo errado de brinde —
        // foi assim que um filtro de três abas apareceu com barra vertical.
        // Só faz sentido em container de rolagem de verdade: em elemento
        // inline o clientWidth é 0 e a conta abaixo não significa nada.
        if (!podeX && !podeY) continue
        if (el.clientWidth === 0 || el.clientHeight === 0) continue

        const bordaV = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)
        const bordaH = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth)
        const barraV = el.offsetWidth - el.clientWidth - bordaV
        const barraH = el.offsetHeight - el.clientHeight - bordaH
        if (barraV > 2 && exY <= 2) {
          inuteis.push({ classe, motivo: 'barra vertical sem conteúdo que a justifique' })
        }
        if (barraH > 2 && exX <= 2) {
          inuteis.push({ classe, motivo: 'barra horizontal sem conteúdo que a justifique' })
        }
      }
      return { pagina: de.scrollWidth - de.clientWidth, rolando, inuteis }
    })
    if (r.pagina > 1) rolagens.push(`${width}px ${route}: PÁGINA rola ${r.pagina}px`)
    for (const c of r.rolando) {
      rolagens.push(`${width}px ${route}: rola no eixo ${c.eixo} (${c.excesso}px) — ${c.classe}`)
    }
    for (const c of r.inuteis) {
      rolagens.push(`${width}px ${route}: rolagem declarada sem necessidade (${c.motivo}) — ${c.classe}`)
    }
  }
  await page.close()
}

await browser.close()

console.log(JSON.stringify(results, null, 1))
console.error('\n=== ROLAGEM ===')
console.error(
  rolagens.length
    ? rolagens.join('\n')
    : 'nenhuma rolagem lateral nem declarada sem necessidade, em 13 rotas x 3 larguras',
)
