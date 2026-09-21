import pkg from '/opt/node22/lib/node_modules/playwright/index.js'
const { chromium } = pkg

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

await browser.close()
console.log(JSON.stringify(results, null, 1))
