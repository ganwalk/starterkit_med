import { useMemo, useRef, useState } from 'react'
import {
  Alert01Icon,
  Delete02Icon,
  Image01Icon,
  SecurityCheckIcon,
  Tick02Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Marca,
  Segmented,
  Select,
  Switch,
} from '@/ds'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'
import { corDominante } from './corDoLogo'
import { hexValido } from '@/tenant/rampa'

/* ----------------------------------------------------------- contraste --- */

function luminancia([r, g, b]: number[]): number {
  const f = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function hexParaRgb(hex: string): number[] {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}

function contraste(a: string, b: string): number {
  const [l1, l2] = [luminancia(hexParaRgb(a)), luminancia(hexParaRgb(b))]
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

/** Escurece a cor até ela passar em 4.5:1 sobre branco */
function escurecerAtePassar(hex: string): string {
  let [r, g, b] = hexParaRgb(hex)
  for (let i = 0; i < 60 && contraste(rgbParaHex([r, g, b]), '#ffffff') < 4.5; i += 1) {
    r = Math.max(0, Math.round(r * 0.94))
    g = Math.max(0, Math.round(g * 0.94))
    b = Math.max(0, Math.round(b * 0.94))
  }
  return rgbParaHex([r, g, b])
}

function rgbParaHex([r, g, b]: number[]): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

/* ------------------------------------------------------------- tela ------ */

const TONS = [
  { id: 'proximo', nome: 'Próximo', exemplo: 'Oi, Ana! Sua consulta é quinta às 14:30. Confirma pra gente?' },
  { id: 'neutro', nome: 'Neutro', exemplo: 'Olá, Ana. Sua consulta está marcada para quinta, 14:30. Pode confirmar?' },
  { id: 'formal', nome: 'Formal', exemplo: 'Prezada Ana, informamos sua consulta em quinta-feira, às 14:30. Solicitamos confirmação.' },
]

export function Identidade() {
  const { tenant, tenants, setTenantId, logo, setLogo, corMarca, setCorMarca } = useTenant()
  const arquivoLogo = useRef<HTMLInputElement>(null)
  const seletorCor = useRef<HTMLInputElement>(null)
  const [portalAtivo, setPortalAtivo] = useState(true)
  const [botAtivo, setBotAtivo] = useState(true)
  const [agendamentoOnline, setAgendamentoOnline] = useState(true)
  const [tom, setTom] = useState('neutro')
  const [corDoLogo, setCorDoLogo] = useState<string | null>(null)
  // O campo aceita digitação parcial ("#0f7"), que não serve como cor ainda.
  // A rampa só é aplicada quando o hexadecimal fecha; até lá vale a anterior.
  const [rascunho, setRascunho] = useState<string | null>(null)

  const cor = corMarca ?? tenant.amostra

  /**
   * A cor da clínica não é só gosto: ela vira texto sobre fundo claro no
   * app inteiro. Se reprovar em contraste, todo rótulo de acento fica
   * ilegível — e a clínica não tem como saber disso sozinha.
   */
  const analise = useMemo(() => {
    const sobreBranco = contraste(cor, '#ffffff')
    const textoBrancoSobreCor = contraste(cor, '#ffffff')
    return {
      sobreBranco,
      passaTexto: sobreBranco >= 4.5,
      passaBotao: textoBrancoSobreCor >= 4.5,
      sugestao: escurecerAtePassar(cor),
    }
  }, [cor])

  const exemplo = TONS.find((t) => t.id === tom) ?? TONS[1]

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-5">
        <Card>
          <CardHeader title="Identidade" caption="Aplica-se ao app, ao portal e às mensagens" />

          <div className="mb-5 flex flex-wrap items-center gap-4">
            {/* O selo é o próprio controle: clicar nele escolhe a cor, como
                acontece no avatar da clínica no menu. Um <input type="color">
                solto na tela é ferramenta de editor, não de recepcionista. */}
            <button
              type="button"
              onClick={() => seletorCor.current?.click()}
              aria-label={`Cor da marca, hoje ${cor}. Escolher outra cor`}
              className={cn(
                'focus-ring relative size-16 shrink-0 overflow-hidden rounded-xl transition-base hover:opacity-90',
                !logo && 'bg-accent',
              )}
            >
              {logo ? (
                <img src={logo} alt="" className="size-full object-contain" />
              ) : (
                <span className="text-h3 font-extrabold text-white">{tenant.marca[0]}</span>
              )}
            </button>
            <input
              ref={seletorCor}
              type="color"
              value={cor}
              onChange={(e) => setCorMarca(e.target.value)}
              className="sr-only"
              tabIndex={-1}
              aria-hidden
            />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="subtle"
                  size="sm"
                  icon={Image01Icon}
                  onClick={() => arquivoLogo.current?.click()}
                >
                  {logo ? 'Trocar logo' : 'Enviar logo'}
                </Button>
                {logo && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Delete02Icon}
                    onClick={() => {
                      setLogo(null)
                      setCorDoLogo(null)
                    }}
                  >
                    Remover
                  </Button>
                )}
              </div>
              <p className="text-faint mt-1.5 text-xs">
                {logo
                  ? 'O logo já está valendo no menu, no portal e na prévia ao lado.'
                  : 'SVG ou PNG com fundo transparente, no mínimo 512px. Sem logo, usamos o monograma.'}
              </p>
            </div>
            <input
              ref={arquivoLogo}
              type="file"
              accept="image/png,image/svg+xml,image/jpeg,image/webp"
              className="sr-only"
              aria-label="Arquivo do logo"
              onChange={(e) => {
                const arquivo = e.target.files?.[0]
                if (!arquivo) return
                // FileReader e não URL.createObjectURL: a data URL sobrevive
                // ao recarregamento do módulo em dev e não precisa de revoke.
                const leitor = new FileReader()
                leitor.onload = () => {
                  const url = String(leitor.result)
                  setLogo(url)
                  corDominante(url).then(setCorDoLogo)
                }
                leitor.readAsDataURL(arquivo)
                e.target.value = ''
              }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome da clínica">
              {(id) => <Input id={id} defaultValue={tenant.nome} key={tenant.id} />}
            </Field>
            <Field label="Nome curto" hint="Aparece no menu e nas mensagens">
              {(id) => <Input id={id} defaultValue={tenant.marca} key={tenant.id} />}
            </Field>
            <Field label="Especialidade principal">
              {(id) => <Input id={id} defaultValue={tenant.especialidade} key={tenant.id} />}
            </Field>
            <Field label="Fuso de atendimento">
              {(id) => (
                <Select id={id} defaultValue="gyn">
                  <option value="gyn">Goiânia (GMT-3)</option>
                  <option value="sp">São Paulo (GMT-3)</option>
                </Select>
              )}
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Cor da marca"
            caption="A única variável de cor do sistema. Neutros e estado ativo não mudam"
          />

          <div className="flex flex-wrap gap-3">
            {tenants.map((item) => {
              const ativo = item.id === tenant.id && !corMarca
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTenantId(item.id)
                    setCorMarca(null)
                  }}
                  aria-pressed={ativo}
                  className={cn(
                    'flex min-h-[var(--target-comfortable)] items-center gap-2.5 rounded-lg border px-3 transition-base',
                    ativo ? 'border-accent bg-accent-soft' : 'border-subtle hover:border-line-strong',
                  )}
                >
                  <span
                    className="size-5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.amostra }}
                    aria-hidden
                  />
                  <span className="text-primary text-sm font-medium">{item.marca}</span>
                </button>
              )
            })}
          </div>

          <div className="border-subtle mt-5 border-t pt-5">
            <Field
              label="Cor personalizada"
              hint="Cole o hexadecimal da identidade, ou clique no selo acima para escolher"
            >
              {(id) => (
                <Input
                  id={id}
                  value={rascunho ?? cor}
                  onChange={(e) => {
                    const valor = e.target.value.startsWith('#')
                      ? e.target.value
                      : `#${e.target.value}`
                    setRascunho(valor)
                    if (hexValido(valor)) setCorMarca(valor)
                  }}
                  onBlur={() => setRascunho(null)}
                  className="font-mono"
                  spellCheck={false}
                />
              )}
            </Field>
          </div>

          {/* A cor sai do arquivo que a clínica já tem. Pedir o hexadecimal a
              uma recepcionista é pedir o que ela não sabe onde achar. */}
          {corDoLogo && corDoLogo.toLowerCase() !== cor.toLowerCase() && (
            <div className="border-subtle mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-dashed p-3">
              <span
                className="size-8 shrink-0 rounded-md"
                style={{ backgroundColor: corDoLogo }}
                aria-hidden
              />
              <p className="text-secondary min-w-0 flex-1 text-sm">
                O logo enviado usa{' '}
                <span className="text-primary font-mono font-semibold">{corDoLogo}</span>. A cor da
                marca ainda está diferente dele.
              </p>
              <Button size="sm" variant="subtle" onClick={() => setCorMarca(corDoLogo)}>
                Usar a cor do logo
              </Button>
            </div>
          )}

          {/* Verificação de contraste: o ponto em que o motor de marca
              encosta na acessibilidade. Sem isso, uma clínica escolhe um
              amarelo bonito e deixa todo rótulo de acento ilegível. */}
          <div className="mt-5">
            {analise.passaTexto ? (
              <Alert tone="success" icon={Tick02Icon} titulo="A cor passa em contraste">
                {analise.sobreBranco.toFixed(2)}:1 sobre fundo claro, acima do mínimo de 4,5:1.
              </Alert>
            ) : (
              <Alert
                tone="warning"
                icon={Alert01Icon}
                titulo="A cor não passa em contraste"
                acao={
                  <Button
                    size="sm"
                    variant="subtle"
                    onClick={() => setCorMarca(analise.sugestao)}
                  >
                    Usar tom ajustado
                  </Button>
                }
              >
                {analise.sobreBranco.toFixed(2)}:1 sobre fundo claro, abaixo do mínimo de 4,5:1.
                Rótulos e links nesta cor ficam difíceis de ler. O tom ajustado{' '}
                <span className="font-mono font-semibold">{analise.sugestao}</span> mantém a
                identidade e passa.
              </Alert>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Endereço na internet" caption="Onde o paciente acessa o portal" />
          <div className="space-y-4">
            <Field label="Domínio próprio" hint="Recomendado para dado de saúde">
              {(id) => <Input id={id} defaultValue={tenant.dominio} key={tenant.id} />}
            </Field>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="success">DNS verificado</Badge>
              <Badge tone="success">Certificado ativo</Badge>
              <Badge tone="neutral">Renova em 67 dias</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Tom das mensagens" caption="Como a clínica fala com o paciente" />
          <Segmented
            label="Tom das mensagens"
            value={tom}
            onChange={setTom}
            options={TONS.map((t) => ({ value: t.id, label: t.nome }))}
          />
          <div className="bg-sunken mt-4 rounded-lg p-4">
            <p className="text-faint mb-2 flex items-center gap-1.5 text-2xs font-semibold">
              <HugeiconsIcon icon={WhatsappIcon} size={13} strokeWidth={2} />
              Prévia da confirmação de 48 horas
            </p>
            <p className="text-primary text-sm leading-relaxed">{exemplo.exemplo}</p>
          </div>
          <p className="text-faint mt-3 text-xs leading-relaxed">
            Modelos de mensagem passam por aprovação da Meta antes de entrar no ar. Mudar o tom
            reenvia os modelos para aprovação.
          </p>
        </Card>

        <Card>
          <CardHeader title="O que o paciente vê" caption="A clínica escolhe o que aparece" />
          <div className="divide-subtle divide-y">
            {[
              {
                titulo: 'Portal do paciente',
                detalhe: 'Onde o paciente confirma, remarca e vê documentos.',
                valor: portalAtivo,
                mudar: setPortalAtivo,
              },
              {
                titulo: 'Agendamento online pelo portal',
                detalhe: 'O paciente escolhe o horário sozinho, dentro da agenda livre.',
                valor: agendamentoOnline,
                mudar: setAgendamentoOnline,
                dependeDoPortal: true,
              },
              {
                titulo: 'Assistente 24h no WhatsApp',
                detalhe: 'Responde fora do horário e passa para a recepção quando trava.',
                valor: botAtivo,
                mudar: setBotAtivo,
              },
            ].map((item) => {
              const bloqueado = item.dependeDoPortal && !portalAtivo
              return (
                <div
                  key={item.titulo}
                  className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        bloqueado ? 'text-faint' : 'text-primary',
                      )}
                    >
                      {item.titulo}
                    </p>
                    <p className="text-muted mt-0.5 text-xs leading-relaxed">
                      {bloqueado ? 'Precisa do portal ligado para funcionar.' : item.detalhe}
                    </p>
                  </div>
                  <Switch
                    checked={item.valor && !bloqueado}
                    onChange={item.mudar}
                    label={item.titulo}
                    hideLabel
                  />
                </div>
              )
            })}
          </div>
          {!portalAtivo && (
            <div className="mt-4">
              <Alert tone="warning" icon={Alert01Icon}>
                Com o portal desligado, o paciente confirma só pelo WhatsApp. A pesquisa de
                satisfação e a pré-consulta deixam de existir.
              </Alert>
            </div>
          )}
        </Card>
      </div>

      {/* Prévia ao vivo, com as superfícies onde a marca aparece */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="space-y-4">
          <Card padding="none" elevation="md" className="overflow-hidden">
            <div
              className="relative overflow-hidden px-5 pt-7 pb-9"
              style={{
                background:
                  'linear-gradient(140deg, var(--accent) 0%, var(--accent-hover) 100%)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
                  backgroundSize: '18px 18px',
                  opacity: 0.18,
                }}
                aria-hidden
              />
              <div className="relative flex items-center gap-2">
                <Marca tone="sobreCor" />
                <p className="text-2xs font-semibold text-white/85">{tenant.nome}</p>
              </div>
              <p className="relative mt-3 text-h3 font-bold tracking-[-0.02em] text-white">
                Olá, Ana Beatriz
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2.5">
                <Avatar nome="Helena Marques" size="sm" />
                <div className="min-w-0">
                  <p className="text-primary truncate text-sm font-semibold">
                    Quinta, 24 de setembro
                  </p>
                  <p className="text-muted truncate text-xs">14:30 · Dra. Helena Marques</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-accent rounded-pill px-3 py-1.5 text-2xs font-semibold text-white">
                  Confirmar presença
                </span>
                <span className="bg-sunken text-secondary rounded-pill px-3 py-1.5 text-2xs font-semibold">
                  Remarcar
                </span>
              </div>
              <p className="text-faint mt-4 text-2xs">{tenant.dominio}</p>
            </div>
          </Card>

          <Card padding="compact">
            <p className="text-faint mb-2 flex items-center gap-1.5 text-2xs font-semibold">
              <HugeiconsIcon icon={WhatsappIcon} size={13} strokeWidth={2} />
              WhatsApp
            </p>
            <div className="bg-sunken rounded-lg rounded-tl-sm p-3">
              <p className="text-primary text-xs leading-relaxed">{exemplo.exemplo}</p>
              <p className="text-faint mt-1.5 text-[10px]">{tenant.nome} · 14:02</p>
            </div>
          </Card>

          <div className="flex items-start gap-2 px-1">
            <HugeiconsIcon
              icon={SecurityCheckIcon}
              size={15}
              strokeWidth={1.5}
              className="text-faint mt-0.5 shrink-0"
            />
            <p className="text-faint text-xs leading-relaxed">
              A prévia usa os mesmos tokens do produto. O que você vê aqui é o que vai ao ar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
