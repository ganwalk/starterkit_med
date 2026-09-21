import { useState } from 'react'
import { Alert01Icon, SparklesIcon, WhatsappIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Alert, Avatar, Badge, Button, Card, Input, PageBody, PageHeader, Tabs } from '@/ds'
import { cn } from '@/lib/cn'
import { CONVERSAS } from '@/data/plataforma'

export function ConversasPage() {
  const [aba, setAba] = useState('humano')
  const [ativaId, setAtivaId] = useState(CONVERSAS[0].id)

  const lista = CONVERSAS.filter((c) =>
    aba === 'humano' ? c.aguardandoHumano : aba === 'bot' ? c.comBot : true,
  )
  const ativa = CONVERSAS.find((c) => c.id === ativaId) ?? CONVERSAS[0]

  return (
    <PageBody>
      <PageHeader
        titulo="Conversas"
        resumo="Caixa compartilhada do WhatsApp. O assistente resolve horário; o resto vai para a recepção"
      />

      <div className="mb-4">
        <Alert tone="info" icon={SparklesIcon} titulo="O assistente só trata de horário">
          Ele agenda, confirma e remarca. Pergunta clínica é passada para a recepção, porque a
          Resolução CFM 2.454/2026 não permite que a IA comunique diagnóstico ou conduta.
        </Alert>
      </div>

      <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
        <Card padding="none" elevation="sm" className="overflow-hidden">
          <div className="px-3 pt-3">
            <Tabs
              label="Filtrar conversas"
              idBase="conversas"
              ativo={aba}
              onChange={setAba}
              itens={[
                { id: 'humano', label: 'Aguardando', contador: CONVERSAS.filter((c) => c.aguardandoHumano).length },
                { id: 'bot', label: 'Com o bot', contador: CONVERSAS.filter((c) => c.comBot).length },
                { id: 'todas', label: 'Todas', contador: CONVERSAS.length },
              ]}
            />
          </div>

          <ul
            id={`conversas-painel-${aba}`}
            role="tabpanel"
            aria-labelledby={`conversas-aba-${aba}`}
            className="max-h-[32rem] overflow-y-auto"
          >
            {lista.map((conversa) => (
              <li key={conversa.id}>
                <button
                  onClick={() => setAtivaId(conversa.id)}
                  className={cn(
                    'border-subtle flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-base',
                    conversa.id === ativaId ? 'bg-accent-soft' : 'hover:bg-hover',
                  )}
                >
                  <Avatar nome={conversa.paciente} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-primary truncate text-sm font-medium">{conversa.paciente}</p>
                      <span className="text-faint shrink-0 text-2xs">{conversa.hora}</span>
                    </div>
                    <p className="text-muted truncate text-xs">{conversa.ultimaMensagem}</p>
                    {conversa.aguardandoHumano && (
                      <span className="mt-1.5 inline-block">
                        <Badge tone="warning">Aguarda recepção</Badge>
                      </span>
                    )}
                  </div>
                  {conversa.naoLidas > 0 && (
                    <span className="bg-accent text-accent-contrast mt-1 flex size-5 shrink-0 items-center justify-center rounded-full text-2xs font-bold tabular">
                      {conversa.naoLidas}
                    </span>
                  )}
                </button>
              </li>
            ))}
            {lista.length === 0 && (
              <li className="text-faint px-4 py-10 text-center text-sm">Nenhuma conversa aqui</li>
            )}
          </ul>
        </Card>

        <Card padding="none" elevation="sm" className="flex min-h-[32rem] flex-col overflow-hidden">
          <header className="border-subtle flex items-center gap-3 border-b px-5 py-3.5">
            <Avatar nome={ativa.paciente} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-primary truncate text-sm font-semibold">{ativa.paciente}</p>
              <p className="text-muted text-xs">{ativa.telefone}</p>
            </div>
            {ativa.aguardandoHumano && <Badge tone="warning">Transferida pelo bot</Badge>}
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {ativa.mensagens.map((msg, i) => {
              const daClinica = msg.de !== 'paciente'
              return (
                <div key={i} className={cn('flex', daClinica ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3.5 py-2.5',
                      daClinica ? 'bg-accent text-accent-contrast' : 'bg-sunken text-primary',
                    )}
                  >
                    {msg.de === 'bot' && (
                      <span className="mb-1 flex items-center gap-1.5 text-2xs font-bold opacity-80">
                        <HugeiconsIcon icon={SparklesIcon} size={12} strokeWidth={2} />
                        Assistente
                      </span>
                    )}
                    <p className="text-sm leading-snug">{msg.texto}</p>
                    <span className="mt-1 block text-2xs opacity-70">{msg.hora}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <footer className="border-subtle border-t p-4">
            {ativa.aguardandoHumano && (
              <div className="mb-3">
                <Alert tone="warning" icon={Alert01Icon}>
                  O bot transferiu esta conversa. O paciente está esperando resposta humana.
                </Alert>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <Input placeholder="Escreva uma mensagem" aria-label="Mensagem" />
              </div>
              <Button variant="accent" icon={WhatsappIcon}>
                Enviar
              </Button>
            </div>
            <p className="text-faint mt-2 text-2xs">
              Envio pelo WhatsApp oficial. A Meta cobra por mensagem, e o valor aparece separado
              na sua fatura.
            </p>
          </footer>
        </Card>
      </div>
    </PageBody>
  )
}
