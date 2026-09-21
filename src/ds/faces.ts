import helena from '@/assets/faces/helena.webp'
import rafael from '@/assets/faces/rafael.webp'
import camila from '@/assets/faces/camila.webp'
import bruno from '@/assets/faces/bruno.webp'
import marina from '@/assets/faces/marina.webp'
import ana from '@/assets/faces/ana.webp'
import carlos from '@/assets/faces/carlos.webp'
import mariana from '@/assets/faces/mariana.webp'
import juliana from '@/assets/faces/juliana.webp'
import roberto from '@/assets/faces/roberto.webp'
import patricia from '@/assets/faces/patricia.webp'
import thiago from '@/assets/faces/thiago.webp'
import vanessa from '@/assets/faces/vanessa.webp'
import eduardo from '@/assets/faces/eduardo.webp'
import isabela from '@/assets/faces/isabela.webp'
import fernanda from '@/assets/faces/fernanda.webp'

/**
 * Retratos das pessoas do protótipo.
 *
 * São rostos SINTÉTICOS, gerados por rede neural — nenhuma pessoa real.
 * Num protótipo de saúde, colar o rosto de alguém identificável em
 * "faltou · Bradesco Saúde" é dado clínico fabricado sobre uma pessoa de
 * verdade, e esta tela vai ser printada e compartilhada.
 *
 * Os arquivos ficam no repositório, não num CDN: o portal do paciente não
 * faz requisição a terceiro, pelo mesmo motivo que a fonte é auto-hospedada.
 */
const RETRATOS: Record<string, string> = {
  'helena marques': helena,
  'rafael tavares': rafael,
  'camila nogueira': camila,
  'bruno salles': bruno,
  'marina prado': marina,
  'ana beatriz rocha': ana,
  'carlos eduardo lima': carlos,
  'mariana duarte': mariana,
  'juliana prado': juliana,
  'roberto nunes': roberto,
  'patrícia souza': patricia,
  'thiago barbosa': thiago,
  'vanessa coelho': vanessa,
  'eduardo ramos': eduardo,
  'isabela moreira': isabela,
  'fernanda castro': fernanda,
}

/** Retrato de uma pessoa, ou undefined — aí o Avatar cai nas iniciais. */
export function retratoDe(nome: string): string | undefined {
  const chave = nome
    .replace(/^(Dr|Dra)\.?\s+/i, '')
    .trim()
    .toLowerCase()
  return RETRATOS[chave]
}
