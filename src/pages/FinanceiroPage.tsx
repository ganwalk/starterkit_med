import { Add01Icon, Download01Icon } from '@hugeicons/core-free-icons'
import {
  Alert,
  Badge,
  Button,
  Card,
  CardHeader,
  PageBody,
  PageHeader,
  Stat,
  Table,
} from '@/ds'
import type { Column } from '@/ds'
import { LANCAMENTOS } from '@/data/plataforma'
import type { Lancamento } from '@/data/plataforma'

const real = (v: number) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

const STATUS: Record<Lancamento['status'], { label: string; tone: 'success' | 'warning' | 'accent' }> = {
  pago: { label: 'Pago', tone: 'success' },
  pendente: { label: 'Pendente', tone: 'warning' },
  sinal: { label: 'Sinal pago', tone: 'accent' },
}

/** Financeiro básico do MVP: Pix, link de pagamento e sinal (§4). */
export function FinanceiroPage() {
  const recebido = LANCAMENTOS.filter((l) => l.status === 'pago').reduce((s, l) => s + l.valor, 0)
  const sinais = LANCAMENTOS.filter((l) => l.status === 'sinal').reduce((s, l) => s + l.valor, 0)
  const pendente = LANCAMENTOS.filter((l) => l.status === 'pendente').reduce((s, l) => s + l.valor, 0)

  const colunas: Column<Lancamento>[] = [
    { chave: 'paciente', titulo: 'Paciente', render: (l) => <span className="text-primary font-medium">{l.paciente}</span> },
    { chave: 'descricao', titulo: 'Descrição', render: (l) => <span className="text-secondary">{l.descricao}</span> },
    { chave: 'forma', titulo: 'Forma', render: (l) => <Badge tone="neutral">{l.forma}</Badge> },
    { chave: 'status', titulo: 'Status', render: (l) => <Badge tone={STATUS[l.status].tone}>{STATUS[l.status].label}</Badge> },
    { chave: 'valor', titulo: 'Valor', numerico: true, render: (l) => <span className="text-primary font-semibold">{real(l.valor)}</span> },
  ]

  return (
    <PageBody>
      <PageHeader
        titulo="Financeiro"
        resumo="Pix, link de pagamento e sinal vinculados ao horário"
        acoes={
          <>
            <Button variant="subtle" icon={Download01Icon}>
              Exportar
            </Button>
            <Button variant="accent" icon={Add01Icon}>
              Novo lançamento
            </Button>
          </>
        }
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Stat label="Recebido hoje" value={real(recebido)} hint="Pix, cartão e dinheiro" delta={{ value: '8%', trend: 'up' }} />
        </Card>
        <Card>
          <Stat label="Sinais retidos" value={real(sinais)} hint="Vinculados a horários futuros" />
        </Card>
        <Card>
          <Stat label="A receber de convênio" value={real(pendente)} hint="Fora do MVP faturar TISS" />
        </Card>
        <Card>
          <Stat
            label="Faltas com sinal"
            value="2,1%"
            hint="Contra 18,4% sem sinal"
            delta={{ value: '16 p.p.', trend: 'down' }}
            series={[9, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2]}
            tone="success"
          />
        </Card>
      </div>

      <div className="mb-5">
        <Alert tone="success" titulo="O sinal é a alavanca mais forte contra falta">
          Horários com sinal pago faltam 2,1% contra 18,4% do restante. É o argumento comercial
          mais direto do produto, e ele se mede sozinho a partir da agenda.
        </Alert>
      </div>

      <Card padding="none">
        <div className="p-6 pb-0">
          <CardHeader title="Lançamentos de hoje" caption="Gerados a partir dos agendamentos" />
        </div>
        <Table
          label="Lançamentos financeiros"
          colunas={colunas}
          linhas={LANCAMENTOS}
          chaveDe={(l) => l.id}
        />
      </Card>

      <p className="text-faint mt-4 text-xs">
        Financeiro completo e conciliação bancária ficam para a fase 3, por integração ou adiamento
        (§4) — estão fora do coração de um CRM.
      </p>
    </PageBody>
  )
}
