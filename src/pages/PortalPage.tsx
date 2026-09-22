import { useState } from 'react'
import {
  Calendar03Icon,
  Clock01Icon,
  Download01Icon,
  Location01Icon,
  Navigation03Icon,
  SecurityCheckIcon,
  Tick02Icon,
  UserCircleIcon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
  Field,
  Input,
  Marca,
  Select,
  Sheet,
  StatusPill,
  Switch,
} from '@/ds'
import { cn } from '@/lib/cn'
import { useTenant } from '@/tenant/TenantProvider'
import { PesquisaSatisfacao } from './portal/PesquisaSatisfacao'

const HISTORICO = [
  { data: '12 de agosto de 2026', profissional: 'Dra. Helena Marques', tipo: 'Retorno' },
  { data: '3 de junho de 2026', profissional: 'Dra. Helena Marques', tipo: 'Primeira consulta' },
  { data: '15 de março de 2026', profissional: 'Dr. Rafael Tavares', tipo: 'Eletrocardiograma' },
]

const DOCUMENTOS = [
  {
    nome: 'Receita — Losartana 50mg',
    detalhe: '12 de agosto de 2026 · Dra. Helena Marques',
    validade: 'Válida até 12 de fevereiro',
  },
  {
    nome: 'Pedido de exame — Hemograma',
    detalhe: '12 de agosto de 2026 · Dra. Helena Marques',
    validade: null,
  },
  {
    nome: 'Laudo — Eletrocardiograma',
    detalhe: '15 de março de 2026 · Dr. Rafael Tavares',
    validade: null,
  },
]

/** O que acontece no dia, para o paciente não chegar sem saber */
const JORNADA = [
  { titulo: 'Confirmação', detalhe: 'Você confirma por aqui ou pelo WhatsApp' },
  { titulo: 'Check-in', detalhe: 'Aponte a câmera para o QR Code na recepção' },
  { titulo: 'Consulta', detalhe: 'A recepção chama você pelo nome' },
]

export function PortalPage() {
  const { tenant } = useTenant()
  const [confirmado, setConfirmado] = useState(false)
  const [remarcando, setRemarcando] = useState(false)
  const [lembretes, setLembretes] = useState(true)
  const [marketing, setMarketing] = useState(false)

  return (
    <main
      className="bg-page min-h-screen pb-20"
      style={
        {
          '--target-min': 'var(--target-toque)',
          '--target-comfortable': 'var(--target-toque)',
        } as React.CSSProperties
      }
    >
      {/* Zona de marca: o único lugar do sistema onde a cor da clínica ocupa
          área grande. No app da recepção isso cansaria numa jornada de 8h. */}
      <header
        className="relative overflow-hidden px-4 pt-10 pb-28 sm:px-6 sm:pt-14"
        style={{
          background:
            'linear-gradient(140deg, var(--accent) 0%, var(--accent-hover) 55%, color-mix(in srgb, var(--accent-hover) 70%, #000) 100%)',
        }}
      >
        {/* Textura: dá densidade ao bloco de cor sem custar uma imagem */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
            backgroundSize: '22px 22px',
            opacity: 0.18,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex items-center gap-2.5">
            <Marca tone="sobreCor" />
            <p className="text-sm font-semibold text-white/85">{tenant.nome}</p>
          </div>
          <h1 className="text-h1 mt-5 leading-[1.05] font-bold tracking-[-0.035em] text-white">
            Olá, Ana Beatriz
          </h1>
          <p className="mt-3 max-w-md text-white/80">
            {confirmado
              ? 'Tudo certo para quinta-feira. Seu horário está guardado.'
              : 'Sua próxima consulta está marcada. Confirme sua presença para garantir o horário.'}
          </p>
        </div>
      </header>

      {/* relative: o hero é posicionado e, sem isto, pinta por cima do
          cartão que sobe sobre ele — o dia e o status sumiam atrás do
          gradiente. */}
      <div className="relative z-10 mx-auto -mt-20 max-w-3xl space-y-5 px-4 sm:px-6">
        {/* Próxima consulta: o objeto principal da tela */}
        <Card elevation="lg" padding="none" className="overflow-hidden">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6 sm:p-6">
            {/* Bloco de data: o dia é o que a pessoa procura primeiro */}
            <div className="bg-accent-soft flex shrink-0 flex-row items-center gap-4 rounded-xl px-5 py-4 sm:w-28 sm:flex-col sm:gap-0 sm:px-0 sm:py-5">
              <p className="text-accent-text text-2xs font-bold tracking-wide uppercase">Quinta</p>
              <p className="numeral text-accent-text text-display leading-none sm:mt-1">24</p>
              <p className="text-accent-text text-xs font-semibold sm:mt-1">Setembro</p>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={confirmado ? 'confirmado' : 'agendado'} />
                <Badge tone="success">Sinal pago</Badge>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Avatar nome="Helena Marques" size="lg" />
                <div className="min-w-0">
                  <p className="text-primary truncate text-h4 font-semibold">Dra. Helena Marques</p>
                  <p className="text-muted truncate text-sm">Clínica geral · CRM-GO 12.345</p>
                </div>
              </div>

              <dl className="text-secondary mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Horário</dt>
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size={17}
                    strokeWidth={1.5}
                    className="shrink-0"
                  />
                  <dd>14:30, retorno de 30 minutos</dd>
                </div>
                <div className="flex items-start gap-2">
                  <dt className="sr-only">Endereço</dt>
                  <HugeiconsIcon
                    icon={Location01Icon}
                    size={17}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                  />
                  <dd className="min-w-0">
                    Rua 9, 145 · Setor Oeste, Goiânia
                    <button className="text-accent-text ml-2 inline-flex min-h-[var(--target-min)] items-center gap-1 align-middle text-xs font-semibold transition-base hover:underline">
                      <HugeiconsIcon icon={Navigation03Icon} size={13} strokeWidth={2} />
                      Como chegar
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="border-subtle bg-sunken border-t px-5 py-4 sm:px-6">
            {confirmado ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-success flex items-center gap-2 text-sm font-semibold">
                  <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
                  Presença confirmada. Enviamos um lembrete 2 horas antes.
                </span>
                <Button variant="subtle" size="sm" icon={Calendar03Icon}>
                  Adicionar ao calendário
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Button variant="accent" icon={Tick02Icon} onClick={() => setConfirmado(true)}>
                  Confirmar presença
                </Button>
                <Button variant="subtle" onClick={() => setRemarcando(true)}>
                  Remarcar
                </Button>
                <Button variant="ghost">Cancelar</Button>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-h4 text-primary font-semibold">No dia da consulta</h2>
          <ol className="mt-5 grid gap-5 sm:grid-cols-3">
            {JORNADA.map((etapa, i) => {
              const feito = i === 0 ? confirmado : false
              return (
                <li key={etapa.titulo} className="flex gap-3 sm:flex-col sm:gap-2">
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full text-2xs font-bold',
                      feito ? 'bg-accent text-accent-contrast' : 'bg-sunken text-muted',
                    )}
                    aria-hidden
                  >
                    {feito ? '✓' : i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-primary text-sm font-semibold">{etapa.titulo}</p>
                    <p className="text-muted mt-0.5 text-xs leading-relaxed">{etapa.detalhe}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h2 className="text-h4 text-primary font-semibold">Pré-consulta</h2>
            <p className="text-secondary mt-1 text-sm">
              Responder antes agiliza seu atendimento na recepção.
            </p>
            <div className="mt-5 space-y-4">
              <Field label="Motivo principal da consulta">
                {(id) => <Input id={id} placeholder="Descreva em poucas palavras" />}
              </Field>
              <Field label="Usa alguma medicação contínua?">
                {(id) => (
                  <Select id={id} defaultValue="nao">
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </Select>
                )}
              </Field>
              <Button variant="subtle" size="sm">
                Salvar respostas
              </Button>
            </div>
          </Card>

          <Card padding="none">
            <div className="p-6 pb-2">
              <h2 className="text-h4 text-primary font-semibold">Seus atendimentos</h2>
              <p className="text-secondary mt-1 text-sm">Histórico nesta clínica.</p>
            </div>
            <ul className="divide-subtle divide-y">
              {HISTORICO.map((item) => (
                <li key={item.data} className="flex items-center gap-3 px-6 py-3.5">
                  <Avatar nome={item.profissional} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-primary truncate text-sm font-medium">{item.tipo}</p>
                    <p className="text-muted truncate text-xs">
                      {item.data} · {item.profissional}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Documentos: o motivo nº 1 de o paciente ligar para a recepção é
            pedir a receita de novo. Cada item aqui é uma ligação a menos. */}
        <Card padding="none">
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
            <h2 className="text-h4 text-primary font-semibold">Documentos</h2>
            <p className="text-faint text-xs">Emitidos pela {tenant.nome}</p>
          </div>
          <ul className="divide-subtle border-subtle divide-y border-t">
            {DOCUMENTOS.map((doc) => (
              <li
                key={doc.nome}
                className="hover:bg-hover flex items-center gap-3.5 px-5 py-3.5 transition-base sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-primary truncate text-sm font-medium">{doc.nome}</p>
                  <p className="text-muted truncate text-xs">{doc.detalhe}</p>
                </div>
                {doc.validade && (
                  <span className="hidden sm:block">
                    <Badge tone="neutral">{doc.validade}</Badge>
                  </span>
                )}
                <IconButton icon={Download01Icon} label={`Baixar ${doc.nome}`} />
              </li>
            ))}
          </ul>
        </Card>

        <PesquisaSatisfacao />

        <Card>
          <h2 className="text-h4 text-primary font-semibold">Suas preferências</h2>
          <p className="text-secondary mt-1 text-sm">
            Você escolhe o que recebe, e pode mudar a qualquer momento.
          </p>
          <div className="mt-5 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 max-w-md">
                <p className="text-primary text-sm font-medium">Lembretes da consulta</p>
                <p className="text-muted mt-0.5 text-xs leading-relaxed">
                  Enviamos 48 horas e 2 horas antes, pelo WhatsApp.
                </p>
              </div>
              <Switch
                checked={lembretes}
                onChange={setLembretes}
                label="Receber lembretes da consulta"
                hideLabel
              />
            </div>

            <div className="border-subtle flex flex-wrap items-start justify-between gap-3 border-t pt-5">
              <div className="min-w-0 max-w-md">
                <p className="text-primary text-sm font-medium">Novidades e campanhas</p>
                <p className="text-muted mt-0.5 text-xs leading-relaxed">
                  Separado dos lembretes. Desligar aqui não afeta os avisos da sua consulta.
                </p>
              </div>
              <Switch
                checked={marketing}
                onChange={setMarketing}
                label="Receber novidades e campanhas"
                hideLabel
              />
            </div>
          </div>

          <div className="border-subtle mt-5 border-t pt-4">
            <Accordion titulo="Seus dados e seus direitos">
              <div className="space-y-3">
                <p className="text-secondary text-sm leading-relaxed">
                  A {tenant.nome} é responsável pelos seus dados, e a plataforma os trata a pedido
                  dela. Você pode pedir uma cópia, corrigir o que estiver errado ou pedir a
                  exclusão a qualquer momento.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="subtle" size="sm" icon={Download01Icon}>
                    Baixar meus dados
                  </Button>
                  <Button variant="ghost" size="sm" icon={UserCircleIcon}>
                    Falar com o encarregado
                  </Button>
                </div>
              </div>
            </Accordion>
          </div>
        </Card>

        <Alert tone="neutral" icon={SecurityCheckIcon}>
          Nunca pedimos senha, código ou pagamento por mensagem. Na dúvida, ligue para a clínica.
        </Alert>

        <footer className="text-faint pt-2 text-center text-xs">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Marca />
            <p className="text-secondary text-sm font-semibold">{tenant.nome}</p>
          </div>
          <p className="mt-1">Rua 9, 145 · Setor Oeste, Goiânia</p>
          <p>
            (62) 3286-5300 · {tenant.dominio}
          </p>
        </footer>
      </div>

      <Sheet
        open={remarcando}
        onClose={() => setRemarcando(false)}
        position="center"
        title="Escolher novo horário"
        subtitle={`${tenant.nome} · Dra. Helena Marques`}
        footer={
          <>
            <Button variant="ghost" onClick={() => setRemarcando(false)}>
              Voltar
            </Button>
            <Button variant="accent" icon={WhatsappIcon} onClick={() => setRemarcando(false)}>
              Confirmar novo horário
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <p className="text-secondary text-sm">
            Horários livres com a mesma profissional nos próximos dias:
          </p>
          {[
            { dia: 'Sexta, 25 de setembro', horas: ['09:00', '11:30', '15:00'] },
            { dia: 'Segunda, 28 de setembro', horas: ['08:30', '14:00', '16:30'] },
          ].map((bloco) => (
            <div key={bloco.dia}>
              <p className="text-primary mb-2 text-sm font-semibold">{bloco.dia}</p>
              <div className="flex flex-wrap gap-2">
                {bloco.horas.map((hora) => (
                  <button
                    key={hora}
                    className="border-subtle text-primary hover:border-accent hover:text-accent-text min-h-[var(--target-min)] rounded-pill border px-4 text-sm font-medium tabular transition-base"
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Sheet>
    </main>
  )
}
