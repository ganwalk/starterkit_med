import { useState } from 'react'
import { Alert01Icon, Download01Icon, SecurityCheckIcon, Tick02Icon } from '@hugeicons/core-free-icons'
import {
  Alert,
  Badge,
  Button,
  Card,
  CardHeader,
  DataList,
  PageBody,
  PageHeader,
  Progress,
  Sheet,
  Stat,
  Stepper,
  Table,
} from '@/ds'
import type { Column } from '@/ds'
import { MIGRACAO } from '@/data/plataforma'
import type { OrigemMigracao } from '@/data/plataforma'

const STATUS: Record<OrigemMigracao['status'], { label: string; tone: 'success' | 'accent' | 'neutral' | 'danger' }> = {
  concluido: { label: 'Concluído', tone: 'success' },
  rodando: { label: 'Migrando', tone: 'accent' },
  pendente: { label: 'Na fila', tone: 'neutral' },
  erro: { label: 'Erro', tone: 'danger' },
}

const ETAPAS = [
  { id: 'contrato', titulo: 'Contrato de operação' },
  { id: 'diagnostico', titulo: 'Diagnóstico dos dados' },
  { id: 'importacao', titulo: 'Importação' },
  { id: 'conciliacao', titulo: 'Conciliação' },
  { id: 'virada', titulo: 'Virada' },
]

/**
 * Migração total com prova de fidelidade — o diferencial declarado em §11.2.
 * O relatório de conciliação é o que transforma "migramos" em "provamos que
 * nada se perdeu".
 */
export function MigracaoPage() {
  const [relatorioAberto, setRelatorioAberto] = useState(false)

  const total = MIGRACAO.reduce((s, m) => s + m.registros, 0)
  const migrados = MIGRACAO.reduce((s, m) => s + m.migrados, 0)
  const falhas = MIGRACAO.reduce((s, m) => s + m.falhas, 0)
  const pct = Math.round((migrados / total) * 100)

  const colunas: Column<OrigemMigracao>[] = [
    { chave: 'sistema', titulo: 'Conjunto de dados', render: (m) => <span className="text-primary font-medium">{m.sistema}</span> },
    { chave: 'registros', titulo: 'Na origem', numerico: true, render: (m) => m.registros.toLocaleString('pt-BR') },
    { chave: 'migrados', titulo: 'Migrados', numerico: true, render: (m) => m.migrados.toLocaleString('pt-BR') },
    {
      chave: 'falhas',
      titulo: 'Não migrados',
      numerico: true,
      render: (m) =>
        m.falhas > 0 ? (
          <span className="text-danger font-semibold">{m.falhas}</span>
        ) : (
          <span className="text-faint">0</span>
        ),
    },
    {
      chave: 'progresso',
      titulo: 'Progresso',
      largura: '9rem',
      render: (m) => (
        <Progress
          valor={m.migrados}
          max={m.registros}
          label={`Progresso de ${m.sistema}`}
          tone={m.status === 'concluido' ? 'success' : 'accent'}
          mostrarValor
        />
      ),
    },
    { chave: 'status', titulo: 'Status', render: (m) => <Badge tone={STATUS[m.status].tone}>{STATUS[m.status].label}</Badge> },
  ]

  return (
    <PageBody>
      <PageHeader
        titulo="Migração"
        resumo="Clínica Vida · origem: Doctor's Office (PES)"
        acoes={
          <Button variant="accent" icon={Download01Icon} onClick={() => setRelatorioAberto(true)}>
            Relatório de conciliação
          </Button>
        }
      >
        <Stepper steps={ETAPAS} atual={3} />
      </PageHeader>

      <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Stat label="Registros na origem" value={total.toLocaleString('pt-BR')} hint="Contagem verificada antes de importar" />
        </Card>
        <Card>
          <Stat label="Migrados" value={migrados.toLocaleString('pt-BR')} hint={`${pct}% do total`} />
        </Card>
        <Card>
          <Stat
            label="Não migrados"
            value={String(falhas)}
            hint="Cada um com motivo registrado"
            delta={falhas > 0 ? { value: 'revisar', trend: 'down' } : undefined}
          />
        </Card>
        <Card>
          <Stat label="Fidelidade" value={`${((migrados / (migrados + falhas)) * 100).toFixed(2)}%`} hint="Migrado sem perda" />
        </Card>
      </div>

      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <Alert tone="warning" icon={Alert01Icon} titulo="68 lançamentos financeiros não migraram">
          Todos do mesmo tipo: estornos sem contrapartida no sistema de origem. Aparecem
          nominalmente no relatório de conciliação, com o motivo — é isso que diferencia a
          migração da Level da conversão de dados dos concorrentes (§11.2).
        </Alert>
        <Alert tone="info" icon={SecurityCheckIcon} titulo="Contrato de operação assinado em 18/09">
          Nenhum arquivo foi recebido antes da assinatura. Transferência criptografada, acesso
          restrito e eliminação dos arquivos de migração ao final, conforme §8.
        </Alert>
      </div>

      <Card padding="none">
        <div className="p-6 pb-0">
          <CardHeader
            title="Conjuntos de dados"
            caption="O histórico clínico entra como arquivo somente leitura, enquanto não há decisão sobre prontuário"
          />
        </div>
        <Table label="Progresso da migração" colunas={colunas} linhas={MIGRACAO} chaveDe={(m) => m.id} />
      </Card>

      <Sheet
        open={relatorioAberto}
        onClose={() => setRelatorioAberto(false)}
        title="Relatório de conciliação"
        subtitle="Clínica Vida · 24 de setembro de 2026"
        footer={
          <>
            <Button variant="ghost" onClick={() => setRelatorioAberto(false)}>
              Fechar
            </Button>
            <Button variant="accent" icon={Download01Icon}>
              Baixar PDF
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <Alert tone="success" icon={Tick02Icon} titulo="Contagens conferem em 5 de 6 conjuntos">
            O relatório é entregue ao cliente e comparado com o sistema de origem antes da virada.
          </Alert>

          <div>
            <h3 className="text-primary mb-3 text-sm font-semibold">Antes e depois</h3>
            <DataList
              itens={MIGRACAO.map((m) => [
                m.sistema,
                <span key={m.id} className="tabular">
                  {m.registros.toLocaleString('pt-BR')} → {m.migrados.toLocaleString('pt-BR')}
                </span>,
              ])}
            />
          </div>

          <div className="border-subtle border-t pt-5">
            <h3 className="text-primary mb-2 text-sm font-semibold">Itens não migrados</h3>
            <p className="text-secondary text-sm leading-relaxed">
              68 lançamentos financeiros do tipo estorno, sem contrapartida na origem. Listados um
              a um no PDF, com identificador do registro original para conferência manual.
            </p>
          </div>

          <div className="border-subtle border-t pt-5">
            <h3 className="text-primary mb-2 text-sm font-semibold">Garantia de saída</h3>
            <p className="text-secondary text-sm leading-relaxed">
              A exportação completa dos dados fica disponível a qualquer momento e no cancelamento,
              no mesmo formato de entrada (§11.2). Sem armadilha de saída.
            </p>
          </div>
        </div>
      </Sheet>
    </PageBody>
  )
}
