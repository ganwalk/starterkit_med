/**
 * Lê a cor dominante do logo enviado.
 *
 * Sem isto, a clínica envia um logo verde e o sistema segue azul até alguém
 * digitar o hexadecimal à mão — e o hexadecimal exato da marca é justamente
 * o que a recepção não tem. Aqui o arquivo que ela já tem responde sozinho.
 *
 * Desenha num canvas de 32px (amostra suficiente e barata), ignora pixels
 * transparentes e neutros — o fundo e o contorno preto não são a marca — e
 * devolve o tom mais saturado entre os mais frequentes.
 */
export function corDominante(dataUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onerror = () => resolve(null)
    img.onload = () => {
      const lado = 32
      const canvas = document.createElement('canvas')
      canvas.width = lado
      canvas.height = lado
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return resolve(null)
      ctx.drawImage(img, 0, 0, lado, lado)

      let dados: Uint8ClampedArray
      try {
        dados = ctx.getImageData(0, 0, lado, lado).data
      } catch {
        // SVG sem dimensão intrínseca pode sujar o canvas em alguns motores
        return resolve(null)
      }

      const baldes = new Map<string, { n: number; r: number; g: number; b: number }>()
      for (let i = 0; i < dados.length; i += 4) {
        const [r, g, b, a] = [dados[i], dados[i + 1], dados[i + 2], dados[i + 3]]
        if (a < 200) continue
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        // Neutro (cinza, branco, preto) não é identidade de marca
        if (max - min < 28) continue
        if (max < 40 || max > 245) continue
        // Agrupa em faixas de 32 para tons vizinhos caírem no mesmo balde
        const chave = [r, g, b].map((v) => v >> 5).join(',')
        const atual = baldes.get(chave) ?? { n: 0, r: 0, g: 0, b: 0 }
        baldes.set(chave, { n: atual.n + 1, r: atual.r + r, g: atual.g + g, b: atual.b + b })
      }

      if (baldes.size === 0) return resolve(null)

      const vencedor = [...baldes.values()].sort((a, b) => b.n - a.n)[0]
      const media = [vencedor.r, vencedor.g, vencedor.b].map((soma) =>
        Math.round(soma / vencedor.n),
      )
      resolve('#' + media.map((v) => v.toString(16).padStart(2, '0')).join(''))
    }
    img.src = dataUrl
  })
}
