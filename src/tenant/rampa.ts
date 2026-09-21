/**
 * Deriva a rampa de marca a partir de um único hexadecimal.
 *
 * Um tenant do catálogo traz cinco variáveis escritas à mão. A clínica que
 * cola a cor dela tem uma só, e o resto do sistema precisa das cinco: o
 * `accent-soft` do bloco de data no portal, o `accent-hover` do fim do
 * gradiente, o `accent-muted` das bordas. Sem derivar, a cor personalizada
 * pintaria o botão e deixaria todo o resto azul.
 */

function paraRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '').trim()
  const cheio = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(cheio.slice(i, i + 2), 16) || 0) as [number, number, number]
}

function paraHex(rgb: number[]): string {
  return '#' + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
}

/** `true` só para o que dá para usar como cor — o campo aceita digitação parcial */
export function hexValido(hex: string): boolean {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex.trim())
}

function misturarComBranco(rgb: number[], proporcao: number): string {
  return paraHex(rgb.map((v) => v + (255 - v) * proporcao))
}

function escurecer(rgb: number[], fator: number): string {
  return paraHex(rgb.map((v) => v * fator))
}

export interface RampaMarca {
  '--brand-50': string
  '--brand-100': string
  '--brand-500': string
  '--brand-600': string
  '--brand-contrast': string
}

export function rampaDeMarca(hex: string): RampaMarca | null {
  if (!hexValido(hex)) return null
  const rgb = paraRgb(hex)
  return {
    '--brand-50': misturarComBranco(rgb, 0.93),
    '--brand-100': misturarComBranco(rgb, 0.84),
    '--brand-500': paraHex(rgb),
    '--brand-600': escurecer(rgb, 0.8),
    // Branco sobre a cor é o padrão do sistema; o alerta de contraste da
    // tela de marca avisa quando a cor escolhida não sustenta isso.
    '--brand-contrast': '#ffffff',
  }
}
