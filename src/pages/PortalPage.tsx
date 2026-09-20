import { useState } from 'react'
import {
  Calendar03Icon,
  Clock01Icon,
  Location01Icon,
  Tick02Icon,
  UserCircleIcon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Avatar, Badge, Button, Card, Field, Input, Select, Sheet, StatusPill, Switch } from '@/ds'
import { useTenant } from '@/tenant/TenantProvider'

const HISTORICO = [
  { data: '12 de agosto de 2026', profissional: 'Dra. Helena Marques', tipo: 'Retorno' },
  { data: '3 de junho de 2026', profissional: 'Dra. Helena Marques', tipo: 'Primeira consulta' },
  { data: '15 de março de 2026', profissional: 'Dr. Rafael Tavares', tipo: 'Eletrocardiograma' },
]

export function PortalPage() {
  const { tenant } = useTenant()
  const [confirmado, setConfirmado] = useState(false)
  const [remarcando, setRemarcando] = useState(false)
  const [lembretes, setLembretes] = useState(true)

  return (
    <div className="pb-20">
      {/* Zona de marca: o único lugar do sistema onde a cor da clínica ocupa
          área grande. No app da recepção isso atrapalharia a leitura o dia todo. */}
      <div
        className="relative overflow-hidden px-6 pt-14 pb-24"
        style={{
          background:
            'linear-gradient(140deg, var(--accent) 0%, var(--accent-hover) 55%, color-mix(in srgb, var(--accent-hover) 70%, #000) 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
            opacity: 'var(--opacity-decorative)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-white/70">{tenant.nome}</p>
          <h1 className="text-h1 mt-2 leading-[1.05] font-bold tracking-[-0.035em] text-white">
            Olá, Ana Beatriz
          </h1>
          <p className="mt-3 max-w-md text-white/80">
            Sua próxima consulta está marcada. Confirme sua presença para garantir o horário.
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-14 max-w-3xl space-y-6 px-6">
        <Card elevation="lg" className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <StatusPill status={confirmado ? 'confirmado' : 'agendado'} />
                <Badge tone="success">Sinal pago via Pix</Badge>
              </div>
              <h2 className="text-h2 text-primary mt-4 font-bold tracking-[-0.02em]">
                Quinta, 24 de setembro
              </h2>
              <div className="text-secondary mt-3 space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <HugeiconsIcon icon={Clock01Icon} size={18} strokeWidth={1.5} />
                  14:30 · Retorno · 30 minutos
                </p>
                <p className="flex items-center gap-2">
                  <HugeiconsIcon icon={UserCircleIcon} size={18} strokeWidth={1.5} />
                  Dra. Helena Marques · Clínica geral
                </p>
                <p className="flex items-center gap-2">
                  <HugeiconsIcon icon={Location01Icon} size={18} strokeWidth={1.5} />
                  Rua 9, 145 · Setor Oeste, Goiânia
                </p>
              </div>
            </div>
            <Avatar nome="Helena Marques" size="lg" />
          </div>

          <div className="border-subtle mt-6 flex flex-wrap gap-2 border-t pt-5">
            {confirmado ? (
              <span className="text-success flex items-center gap-2 text-sm font-semibold">
                <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2} />
                Presença confirmada. Você receberá um lembrete 2 horas antes.
              </span>
            ) : (
              <>
                <Button variant="accent" icon={Tick02Icon} onClick={() => setConfirmado(true)}>
                  Confirmar presença
                </Button>
                <Button variant="subtle" onClick={() => setRemarcando(true)}>
                  Remarcar
                </Button>
                <Button variant="ghost">Cancelar</Button>
              </>
            )}
          </div>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <h3 className="text-h4 text-primary font-semibold">Pré-consulta</h3>
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

          <Card>
            <h3 className="text-h4 text-primary font-semibold">Seus atendimentos</h3>
            <p className="text-secondary mt-1 text-sm">Histórico nesta clínica.</p>
            <ul className="mt-5 space-y-4">
              {HISTORICO.map((item) => (
                <li key={item.data} className="flex items-start gap-3">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    size={18}
                    strokeWidth={1.5}
                    className="text-faint mt-0.5 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-primary text-sm font-medium">{item.data}</p>
                    <p className="text-muted text-xs">
                      {item.tipo} · {item.profissional}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-h4 text-primary font-semibold">Lembretes por WhatsApp</h3>
              <p className="text-secondary mt-1 max-w-md text-sm">
                Enviamos 48 horas e 2 horas antes. O consentimento fica registrado e você pode
                retirá-lo a qualquer momento.
              </p>
            </div>
            <Switch checked={lembretes} onChange={setLembretes} label="Receber lembretes" />
          </div>
        </Card>

        <p className="text-faint text-center text-xs">
          {tenant.nome} · {tenant.dominio} — portal com a marca da clínica, operado pela plataforma
        </p>
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
                    className="border-subtle text-primary hover:border-accent hover:text-accent rounded-pill border px-4 py-2 text-sm font-medium transition-base"
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Sheet>
    </div>
  )
}
