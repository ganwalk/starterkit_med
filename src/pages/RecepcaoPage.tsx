import { useState } from 'react'
import { QrCode01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  PageBody,
  PageHeader,
  Stat,
  StatusPill,
} from '@/ds'
import { cn } from '@/lib/cn'
import { FILA } from '@/data/plataforma'

const CHECKIN_LABEL = {
  qrcode: 'QR Code',
  recepcao: 'Recepção',
  pendente: 'Não chegou',
}

/** Check-in e fila da recepção — §4 do escopo, fase 2 */
export function RecepcaoPage() {
  const [chegaram, setChegaram] = useState<string[]>([])

  const naSala = FILA.filter((f) => f.status === 'chegou' || chegaram.includes(f.id))
  const emAtendimento = FILA.filter((f) => f.status === 'atendimento')
  const aguardados = FILA.filter((f) => f.checkin === 'pendente' && !chegaram.includes(f.id))

  // Espera acima disso vira alerta visível para a recepção agir
  const ESPERA_ALERTA = 15

  return (
    <PageBody>
      <PageHeader
        titulo="Recepção"
        resumo="Fila de espera e check-in do dia"
        acoes={
          <Button variant="accent" icon={QrCode01Icon}>
            Exibir QR Code de check-in
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <Stat label="Na sala de espera" value={String(naSala.length)} hint="Fizeram check-in" />
        </Card>
        <Card>
          <Stat label="Em atendimento" value={String(emAtendimento.length)} hint="Consultórios ocupados" />
        </Card>
        <Card>
          <Stat
            label="Maior espera"
            value={`${Math.max(0, ...naSala.map((f) => f.esperaMinutos))} min`}
            hint={`Alerta acima de ${ESPERA_ALERTA} min`}
            delta={
              Math.max(0, ...naSala.map((f) => f.esperaMinutos)) > ESPERA_ALERTA
                ? { value: 'atenção', trend: 'down' }
                : undefined
            }
          />
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card padding="none">
          <div className="p-6 pb-4">
            <CardHeader
              title="Sala de espera"
              caption="Ordenada por tempo de espera, não por horário marcado"
            />
          </div>
          <ul className="divide-subtle divide-y">
            {naSala.map((item) => {
              const demorado = item.esperaMinutos > ESPERA_ALERTA
              return (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-6">
                  <Avatar nome={item.paciente} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-primary truncate text-sm font-medium">{item.paciente}</p>
                    <p className="text-muted truncate text-xs">
                      {item.horario} · {item.profissional}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden sm:inline">
                      <Badge tone="neutral">{CHECKIN_LABEL[item.checkin]}</Badge>
                    </span>
                    <span
                      className={cn(
                        'w-14 text-right text-sm font-semibold tabular',
                        demorado ? 'text-danger' : 'text-secondary',
                      )}
                    >
                      {item.esperaMinutos} min
                    </span>
                  </div>
                </li>
              )
            })}
            {naSala.length === 0 && (
              <li className="text-faint px-4 py-10 text-center text-sm sm:px-6">Sala de espera vazia</li>
            )}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card padding="none">
            <div className="p-6 pb-4">
              <CardHeader title="Em atendimento" />
            </div>
            <ul className="divide-subtle divide-y">
              {emAtendimento.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-6">
                  <Avatar nome={item.paciente} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-primary truncate text-sm font-medium">{item.paciente}</p>
                    <p className="text-muted truncate text-xs">{item.profissional}</p>
                  </div>
                  <StatusPill status="atendimento" />
                </li>
              ))}
            </ul>
          </Card>

          <Card padding="none">
            <div className="p-6 pb-4">
              <CardHeader
                title="Esperados hoje"
                caption="Confirmados que ainda não chegaram"
              />
            </div>
            <ul className="divide-subtle divide-y">
              {aguardados.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-6">
                  <Avatar nome={item.paciente} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-primary truncate text-sm font-medium">{item.paciente}</p>
                    <p className="text-muted truncate text-xs">
                      {item.horario} · {item.profissional}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="subtle"
                    icon={Tick02Icon}
                    onClick={() => setChegaram((c) => [...c, item.id])}
                  >
                    Chegou
                  </Button>
                </li>
              ))}
              {aguardados.length === 0 && (
                <li className="text-faint px-4 py-8 text-center text-sm sm:px-6">
                  Todos os confirmados já chegaram
                </li>
              )}
            </ul>
          </Card>
        </div>
      </div>

      <Card className="mt-5">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="bg-sunken text-faint flex size-24 shrink-0 items-center justify-center rounded-xl">
            <HugeiconsIcon icon={QrCode01Icon} size={48} strokeWidth={1.2} />
          </div>
          <div className="min-w-0">
            <h3 className="text-h4 text-primary font-semibold">Check-in por QR Code</h3>
            <p className="text-secondary mt-1 max-w-lg text-sm">
              O paciente aponta a câmera e entra na fila sozinho, sem passar pelo balcão. O código
              muda a cada dia e carrega a marca da clínica. Totem com hardware fica para depois
              (§4): começamos por QR Code e recepção.
            </p>
          </div>
        </div>
      </Card>
    </PageBody>
  )
}
