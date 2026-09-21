import { useState } from 'react'
import { ArrowUpRight01Icon, WhatsappIcon } from '@hugeicons/core-free-icons'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  PageBody,
  PageHeader,
  Progress,
  Segmented,
  Sparkline,
  Stat,
  Table,
} from '@/ds'
import type { Column } from '@/ds'
import { PACIENTES } from '@/data/plataforma'
import type { Paciente } from '@/data/plataforma'

/**
 * Os três painéis básicos do MVP (§4: agendamentos e faltas, atendimentos,
 * faturamento) mais a reativação de pacientes (§13).
 */
export function IndicadoresPage() {
  const [periodo, setPeriodo] = useState('30d')

  const reativar = PACIENTES.filter((p) => p.inatividade >= 6)

  const colunas: Column<Paciente>[] = [
    {
      chave: 'nome',
      titulo: 'Paciente',
      render: (p) => (
        <div className="flex items-center gap-3">
          <Avatar nome={p.nome} size="sm" />
          <span className="text-primary font-medium">{p.nome}</span>
        </div>
      ),
    },
    { chave: 'ultima', titulo: 'Última consulta', render: (p) => <span className="text-secondary tabular">{p.ultimaConsulta}</span> },
    { chave: 'inatividade', titulo: 'Meses parado', numerico: true, render: (p) => <span className="text-primary font-semibold">{p.inatividade}</span> },
    {
      chave: 'consent',
      titulo: 'Pode receber campanha',
      render: (p) =>
        p.consentimentoMarketing ? (
          <Badge tone="success">Sim</Badge>
        ) : (
          <Badge tone="danger">Não · sem consentimento</Badge>
        ),
    },
  ]

  return (
    <PageBody>
      <PageHeader
        titulo="Indicadores"
        resumo="Agendamentos e faltas, atendimentos, faturamento e reativação"
        acoes={
          <Segmented
            label="Período"
            size="sm"
            value={periodo}
            onChange={setPeriodo}
            options={[
              { value: '7d', label: '7 dias' },
              { value: '30d', label: '30 dias' },
              { value: '12m', label: '12 meses' },
            ]}
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
            hint="Baseline das entrevistas: 19,2%"
            delta={{ value: '3,1%', trend: 'down' }}
            series={[22, 19, 24, 18, 20, 17, 19, 16, 18, 15, 17, 14]}
            tone="success"
          />
        </Card>
        <Card>
          <Stat
            label="Atendimentos"
            value="1.047"
            hint="Consultas realizadas"
            delta={{ value: '9%', trend: 'up' }}
            series={[30, 34, 31, 38, 36, 41, 39, 44, 42, 47, 45, 50]}
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

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Faltas por canal de confirmação"
            caption="Quem confirma pelo WhatsApp falta menos"
            action={{ icon: ArrowUpRight01Icon, label: 'Abrir relatório' }}
          />
          <div className="space-y-4">
            {[
              { canal: 'Confirmou pelo WhatsApp', pct: 6, tone: 'success' as const },
              { canal: 'Confirmou por telefone', pct: 14, tone: 'accent' as const },
              { canal: 'Não confirmou', pct: 41, tone: 'danger' as const },
            ].map((linha) => (
              <div key={linha.canal}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="text-secondary text-sm">{linha.canal}</span>
                  <span className="text-primary text-sm font-semibold tabular">{linha.pct}%</span>
                </div>
                <Progress valor={linha.pct} label={`Faltas: ${linha.canal}`} tone={linha.tone} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Origem dos pacientes"
            caption="Atribuição registrada no primeiro contato"
            action={{ icon: ArrowUpRight01Icon, label: 'Abrir relatório' }}
          />
          <div className="space-y-4">
            {[
              { origem: 'Instagram', n: 412, serie: [4, 6, 5, 8, 7, 9, 11] },
              { origem: 'Indicação', n: 336, serie: [6, 5, 7, 6, 8, 7, 8] },
              { origem: 'Google', n: 288, serie: [3, 4, 4, 5, 6, 5, 7] },
              { origem: 'Site da clínica', n: 248, serie: [2, 3, 4, 3, 5, 6, 6] },
            ].map((linha) => (
              <div key={linha.origem} className="flex items-center gap-4">
                <span className="text-secondary min-w-0 flex-1 truncate text-sm">{linha.origem}</span>
                <Sparkline values={linha.serie} tone="accent" className="h-6 w-20" />
                <span className="text-primary w-12 text-right text-sm font-semibold tabular">
                  {linha.n}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader
          title="Satisfação pós-consulta"
          caption="Respostas do portal. Nota geral de 1 a 5, coletada após o atendimento"
          action={{ icon: ArrowUpRight01Icon, label: 'Abrir relatório' }}
        />
        <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
          <div className="text-center sm:text-left">
            <p className="numeral text-primary text-display">4,6</p>
            <p className="text-muted text-sm">de 5 · 312 respostas</p>
            <p className="text-faint text-xs mt-1">Taxa de resposta: 41%</p>
          </div>
          <div className="space-y-3">
            {[
              { aspecto: 'Consulta com o profissional', nota: 4.8 },
              { aspecto: 'Atendimento da recepção', nota: 4.7 },
              { aspecto: 'Facilidade para agendar', nota: 4.5 },
              { aspecto: 'Tempo de espera', nota: 3.9 },
            ].map((linha) => (
              <div key={linha.aspecto}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="text-secondary text-sm">{linha.aspecto}</span>
                  <span className="text-primary text-sm font-semibold tabular">
                    {linha.nota.toFixed(1).replace('.', ',')}
                  </span>
                </div>
                <Progress
                  valor={linha.nota}
                  max={5}
                  label={`Satisfação: ${linha.aspecto}`}
                  tone={linha.nota < 4 ? 'warning' : 'success'}
                />
              </div>
            ))}
          </div>
        </div>
        <p className="text-faint mt-5 text-xs leading-relaxed">
          Tempo de espera é a nota mais baixa, e a única abaixo de 4. A tela da recepção mostra
          quem está esperando há mais tempo. Para usar um comentário em divulgação, é preciso a
          autorização que o paciente dá na própria pesquisa.
        </p>
      </Card>

      <Card className="mt-5" padding="none">
        <div className="p-6 pb-0">
          <CardHeader
            title="Reativação de pacientes"
            caption="Quem não retorna há 6 meses ou mais. A campanha só alcança quem aceitou receber contato"
          >
            <Button variant="accent" size="sm" icon={WhatsappIcon}>
              Criar campanha
            </Button>
          </CardHeader>
        </div>
        <Table
          label="Pacientes para reativação"
          colunas={colunas}
          linhas={reativar}
          chaveDe={(p) => p.id}
        />
      </Card>
    </PageBody>
  )
}
