import { useState } from 'react'
import {
  Add01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  Search01Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  IconButton,
  Input,
  Segmented,
  Select,
  Sheet,
  Sparkline,
  Stat,
  StatusPill,
  Switch,
} from '@/ds'
import type { AgendaStatus } from '@/ds'
import { useTenant } from '@/tenant/TenantProvider'

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-subtle border-t py-12 first:border-t-0 first:pt-0">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-h2 text-primary font-bold tracking-[-0.02em]">{title}</h2>
        {description && <p className="text-secondary mt-2">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function Swatch({ token, nome }: { token: string; nome: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="border-subtle h-16 w-full rounded-lg border"
        style={{ background: `var(${token})` }}
      />
      <div className="min-w-0">
        <p className="text-primary text-xs font-semibold">{nome}</p>
        <p className="text-faint text-2xs truncate font-mono">{token}</p>
      </div>
    </div>
  )
}

const NEUTROS = [
  ['--neutral-0', '0'],
  ['--neutral-50', '50'],
  ['--neutral-100', '100'],
  ['--neutral-200', '200'],
  ['--neutral-300', '300'],
  ['--neutral-400', '400'],
  ['--neutral-500', '500'],
  ['--neutral-600', '600'],
  ['--neutral-700', '700'],
  ['--neutral-800', '800'],
  ['--neutral-900', '900'],
  ['--neutral-950', '950'],
]

const STATUS_LIST: AgendaStatus[] = [
  'agendado',
  'confirmado',
  'chegou',
  'atendimento',
  'faltou',
  'cancelado',
]

const ESCALA = [
  { token: '--text-display', nome: 'Display', classe: 'text-display numeral', amostra: '1.284' },
  { token: '--text-h1', nome: 'H1', classe: 'text-h1 font-light tracking-[-0.03em]', amostra: 'Agenda da semana' },
  { token: '--text-h2', nome: 'H2', classe: 'text-h2 font-bold tracking-[-0.02em]', amostra: 'Pacientes de hoje' },
  { token: '--text-h3', nome: 'H3', classe: 'text-h3 font-semibold', amostra: 'Confirmações pendentes' },
  { token: '--text-body', nome: 'Corpo', classe: 'text-body', amostra: 'Retorno de consulta · Convênio Unimed' },
  { token: '--text-sm', nome: 'Pequeno', classe: 'text-sm text-secondary', amostra: 'Última alteração há 2 minutos' },
  { token: '--text-2xs', nome: 'Micro', classe: 'text-2xs font-semibold text-muted', amostra: 'CONFIRMADO' },
]

export function DesignSystemPage() {
  const { tenant } = useTenant()
  const [aba, setAba] = useState('dia')
  const [notificar, setNotificar] = useState(true)
  const [sheetAberto, setSheetAberto] = useState(false)

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <div className="mb-14 max-w-3xl">
        <h1 className="text-h1 text-primary font-light tracking-[-0.03em]">
          Design system white label
        </h1>
        <p className="text-secondary mt-4 text-[1.0625rem] leading-relaxed">
          Uma base de código, N clínicas. Neutros, elevação e estado ativo são fixos; só o acento
          de marca varia. Troque a clínica no topo da página e observe que nenhum componente muda
          de forma — muda de dono.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {['Leve', 'Silencioso', 'Preciso', 'Respirado', 'Premium sem peso'].map((adj) => (
            <Badge key={adj} tone="neutral">
              {adj}
            </Badge>
          ))}
        </div>
      </div>

      <Section
        title="Cor"
        description="Os neutros e os status são iguais em toda clínica. O acento é a única variável de marca — é o que permite trocar de dono sem reescrever componente."
      >
        <div className="space-y-10">
          <div>
            <h3 className="text-h4 text-primary mb-4 font-semibold">Neutros</h3>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-12">
              {NEUTROS.map(([token, nome]) => (
                <Swatch key={token} token={token} nome={nome} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-h4 text-primary mb-1 font-semibold">
              Acento — {tenant.nome}
            </h3>
            <p className="text-muted text-sm mb-4">
              Redefinido por <code className="font-mono text-xs">[data-tenant]</code>. Nenhum
              componente conhece a clínica.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Swatch token="--accent-soft" nome="Acento suave" />
              <Swatch token="--accent-muted" nome="Acento médio" />
              <Swatch token="--accent" nome="Acento" />
              <Swatch token="--accent-hover" nome="Acento pressionado" />
            </div>
          </div>

          <div>
            <h3 className="text-h4 text-primary mb-1 font-semibold">Status do paciente</h3>
            <p className="text-muted text-sm mb-4">
              Os seis estados da agenda definidos no escopo (§11.1). Cor sempre em dose mínima.
            </p>
            <div className="flex flex-wrap gap-2">
              {STATUS_LIST.map((status) => (
                <StatusPill key={status} status={status} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Tipografia"
        description="Manrope variável. Títulos e numerais grandes vivem em peso leve: a hierarquia vem do tamanho, não do negrito."
      >
        <Card padding="none" elevation="sm" className="divide-subtle divide-y overflow-hidden">
          {ESCALA.map((item) => (
            <div
              key={item.token}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <div className="w-28 shrink-0">
                <p className="text-primary text-xs font-semibold">{item.nome}</p>
                <p className="text-faint text-2xs font-mono">{item.token}</p>
              </div>
              <p className={`text-primary min-w-0 ${item.classe}`}>{item.amostra}</p>
            </div>
          ))}
        </Card>
      </Section>

      <Section
        title="Elevação e raio"
        description="Separação por sombra difusa, não por borda dura. A borda entra só como reforço."
      >
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
          {[
            { nome: 'Plana', elevation: 'flat' as const },
            { nome: 'Sombra sm', elevation: 'sm' as const },
            { nome: 'Sombra md', elevation: 'md' as const },
            { nome: 'Sombra lg', elevation: 'lg' as const },
          ].map((item) => (
            <Card key={item.nome} elevation={item.elevation} padding="comfortable">
              <p className="text-primary text-sm font-semibold">{item.nome}</p>
              <p className="text-faint text-xs mt-1 font-mono">shadow-{item.elevation}</p>
            </Card>
          ))}
          <div className="flex flex-col justify-center gap-2">
            {['--radius-md', '--radius-lg', '--radius-xl', '--radius-2xl'].map((token) => (
              <div key={token} className="flex items-center gap-3">
                <div
                  className="bg-accent-muted size-9 shrink-0"
                  style={{ borderRadius: `var(${token})` }}
                />
                <span className="text-faint text-2xs font-mono">{token}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Ações"
        description="Preto é o estado ativo, o acento é a ação principal da clínica, e o círculo fantasma é a ação secundária padrão."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader title="Botões" />
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="accent" icon={Add01Icon}>
                Novo agendamento
              </Button>
              <Button variant="active">Ativo</Button>
              <Button variant="subtle">Secundário</Button>
              <Button variant="ghost">Fantasma</Button>
              <Button variant="danger">Cancelar consulta</Button>
              <Button variant="subtle" disabled>
                Desabilitado
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button size="sm" variant="subtle">
                Pequeno
              </Button>
              <Button size="md" variant="subtle">
                Médio
              </Button>
              <Button size="lg" variant="subtle">
                Grande
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Botões de ícone" />
            <div className="flex flex-wrap items-center gap-3">
              <IconButton icon={Search01Icon} label="Buscar paciente" />
              <IconButton icon={Calendar03Icon} label="Abrir calendário" />
              <IconButton icon={WhatsappIcon} label="Enviar WhatsApp" variant="accent" />
              <IconButton icon={ArrowUpRight01Icon} label="Abrir detalhe" variant="active" />
              <IconButton icon={Add01Icon} label="Adicionar" size="sm" />
              <IconButton icon={Add01Icon} label="Adicionar" size="lg" />
            </div>
            <div className="mt-6">
              <Segmented
                label="Visão da agenda"
                value={aba}
                onChange={setAba}
                options={[
                  { value: 'dia', label: 'Dia' },
                  { value: 'semana', label: 'Semana' },
                  { value: 'mes', label: 'Mês' },
                ]}
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section
        title="Dados"
        description="Numeral grande em peso fino, tendência em barra fina, sem eixo nem grade."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <Stat
              label="Agendamentos"
              value="1.284"
              hint="Últimos 30 dias"
              delta={{ value: '12%', trend: 'up' }}
              series={[8, 12, 9, 14, 11, 16, 13, 18, 15, 21, 19, 24]}
              tone="accent"
            />
          </Card>
          <Card>
            <Stat
              label="Faltas"
              value="18,4%"
              hint="Meta: abaixo de 15%"
              delta={{ value: '3,1%', trend: 'down' }}
              series={[22, 19, 24, 18, 20, 17, 19, 16, 18, 15, 17, 14]}
              tone="success"
            />
          </Card>
          <Card>
            <Stat
              label="Confirmação por WhatsApp"
              value="87%"
              hint="Respondem em até 2 horas"
              delta={{ value: '5%', trend: 'up' }}
              series={[60, 66, 62, 71, 69, 74, 78, 76, 81, 84, 83, 87]}
              tone="accent"
            />
          </Card>
          <Card>
            <Stat
              label="Faturamento"
              value="R$ 142k"
              hint="Particular e convênio"
              delta={{ value: '0,4%', trend: 'flat' }}
              series={[40, 44, 42, 46, 43, 45, 44, 47, 45, 46, 45, 46]}
            />
          </Card>
        </div>

        <Card className="mt-5">
          <CardHeader
            title="Ocupação por profissional"
            caption="Percentual de horários preenchidos nesta semana"
            action={{ icon: ArrowUpRight01Icon, label: 'Abrir relatório' }}
          />
          <div className="space-y-4">
            {[
              { nome: 'Dra. Helena Marques', pct: 92, series: [6, 8, 7, 9, 8, 10, 9] },
              { nome: 'Dr. Rafael Tavares', pct: 78, series: [5, 6, 8, 6, 7, 6, 8] },
              { nome: 'Dra. Camila Nogueira', pct: 64, series: [4, 5, 4, 6, 5, 5, 6] },
            ].map((item) => (
              <div key={item.nome} className="flex items-center gap-4">
                <Avatar nome={item.nome} size="sm" />
                <span className="text-primary min-w-0 flex-1 truncate text-sm font-medium">
                  {item.nome}
                </span>
                <Sparkline values={item.series} tone="accent" className="h-6 w-24" />
                <span className="numeral text-primary w-14 text-right text-h4">{item.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        title="Identidade e formulário"
        description="Avatares são conteúdo: a agenda é multiprofissional e a pessoa precisa ser reconhecível de relance."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader title="Pessoas" />
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Avatar nome="Helena Marques" size="xs" />
                <Avatar nome="Rafael Tavares" size="sm" />
                <Avatar nome="Camila Nogueira" size="md" />
                <Avatar nome="Bruno Salles" size="lg" />
              </div>
              <Avatar nome="Helena Marques" size="md" active />
              <AvatarGroup
                nomes={[
                  'Helena Marques',
                  'Rafael Tavares',
                  'Camila Nogueira',
                  'Bruno Salles',
                  'Marina Prado',
                  'Igor Lemos',
                ]}
                size="md"
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Campos" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Paciente">
                {(id) => <Input id={id} icon={Search01Icon} placeholder="Nome ou CPF" />}
              </Field>
              <Field label="Profissional">
                {(id) => (
                  <Select id={id} defaultValue="helena">
                    <option value="helena">Dra. Helena Marques</option>
                    <option value="rafael">Dr. Rafael Tavares</option>
                  </Select>
                )}
              </Field>
              <Field label="Convênio" hint="Campo previsto desde o MVP (§4)">
                {(id) => <Input id={id} placeholder="Particular" />}
              </Field>
              <Field label="Telefone" error="Informe um número com DDD">
                {(id) => <Input id={id} defaultValue="62 9" />}
              </Field>
            </div>
            <div className="mt-5 flex items-center gap-6">
              <Switch
                checked={notificar}
                onChange={setNotificar}
                label="Confirmar por WhatsApp 48h antes"
              />
              <Button variant="subtle" size="sm" onClick={() => setSheetAberto(true)}>
                Abrir painel lateral
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Sheet
        open={sheetAberto}
        onClose={() => setSheetAberto(false)}
        title="Ana Beatriz Rocha"
        subtitle={`${tenant.nome} · Quinta, 14:30`}
        footer={
          <>
            <Button variant="ghost" onClick={() => setSheetAberto(false)}>
              Fechar
            </Button>
            <Button variant="accent" icon={WhatsappIcon}>
              Enviar confirmação
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <StatusPill status="confirmado" />
          <p className="text-secondary text-sm leading-relaxed">
            Painel lateral padrão para detalhe de agendamento. A mesma estrutura serve para
            histórico de alterações, exigido no escopo (§11.1, item 8).
          </p>
          <div className="border-subtle space-y-3 border-t pt-5">
            {[
              ['Tipo', 'Retorno · 30 min'],
              ['Convênio', 'Particular'],
              ['Origem', 'Instagram'],
              ['Sinal', 'Pago via Pix'],
            ].map(([chave, valor]) => (
              <div key={chave} className="flex items-center justify-between gap-4">
                <span className="text-muted text-sm">{chave}</span>
                <span className="text-primary text-sm font-medium">{valor}</span>
              </div>
            ))}
          </div>
        </div>
      </Sheet>
    </div>
  )
}
