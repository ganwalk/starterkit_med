import { useMemo, useState } from 'react'
import { Add01Icon, Download01Icon, Search01Icon, UserMultiple02Icon, WhatsappIcon } from '@hugeicons/core-free-icons'
import {
  Avatar,
  Badge,
  Button,
  Card,
  DataList,
  EmptyState,
  Input,
  PageBody,
  PageHeader,
  Segmented,
  Sheet,
  Table,
  Timeline,
  Toolbar,
} from '@/ds'
import type { Column } from '@/ds'
import { PACIENTES } from '@/data/plataforma'
import type { Paciente } from '@/data/plataforma'

type Filtro = 'todos' | 'agendados' | 'reativar'

export function PacientesPage() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [selecionado, setSelecionado] = useState<Paciente | null>(null)

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return PACIENTES.filter((p) => {
      if (termo && !p.nome.toLowerCase().includes(termo) && !p.telefone.includes(termo)) return false
      if (filtro === 'agendados') return p.proximaConsulta !== null
      // Reativação: quem não volta há 6 meses ou mais (§13, dashboard de reativação)
      if (filtro === 'reativar') return p.inatividade >= 6
      return true
    })
  }, [busca, filtro])

  const colunas: Column<Paciente>[] = [
    {
      chave: 'nome',
      titulo: 'Paciente',
      render: (p) => (
        <div className="flex items-center gap-3">
          <Avatar nome={p.nome} size="sm" />
          <div className="min-w-0">
            <p className="text-primary truncate font-medium">{p.nome}</p>
            <p className="text-muted text-xs">{p.telefone}</p>
          </div>
        </div>
      ),
    },
    { chave: 'convenio', titulo: 'Convênio', render: (p) => <span className="text-secondary">{p.convenio}</span> },
    { chave: 'origem', titulo: 'Origem', render: (p) => <Badge tone="neutral">{p.origem}</Badge> },
    { chave: 'ultima', titulo: 'Última consulta', render: (p) => <span className="text-secondary tabular">{p.ultimaConsulta}</span> },
    {
      chave: 'proxima',
      titulo: 'Próxima',
      render: (p) =>
        p.proximaConsulta ? (
          <span className="text-primary tabular font-medium">{p.proximaConsulta}</span>
        ) : p.inatividade >= 6 ? (
          <Badge tone="warning">Reativar · {p.inatividade} meses</Badge>
        ) : (
          <span className="text-faint">—</span>
        ),
    },
  ]

  return (
    <PageBody>
      <PageHeader
        titulo="Pacientes"
        resumo={`${PACIENTES.length} cadastros · cadastro único alimenta agenda, funil e portal`}
        acoes={
          <>
            <Button variant="subtle" icon={Download01Icon}>
              Exportar
            </Button>
            <Button variant="accent" icon={Add01Icon}>
              Novo paciente
            </Button>
          </>
        }
      />

      <Toolbar
        fim={
          <Segmented
            label="Filtrar pacientes"
            size="sm"
            value={filtro}
            onChange={(v) => setFiltro(v as Filtro)}
            options={[
              { value: 'todos', label: 'Todos' },
              { value: 'agendados', label: 'Com horário' },
              { value: 'reativar', label: 'Reativar' },
            ]}
          />
        }
      >
        <div className="w-full sm:w-72">
          <Input
            icon={Search01Icon}
            placeholder="Nome ou telefone"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </Toolbar>

      <Card padding="none" elevation="sm" className="overflow-hidden">
        <Table
          label="Lista de pacientes"
          colunas={colunas}
          linhas={lista}
          chaveDe={(p) => p.id}
          onLinhaClick={setSelecionado}
          vazio={
            <EmptyState
              icon={UserMultiple02Icon}
              titulo="Nenhum paciente encontrado"
              descricao="Ajuste a busca ou o filtro. Se a base ainda não foi importada, comece pela migração."
              acao={<Button variant="subtle">Ir para migração</Button>}
            />
          }
        />
      </Card>

      <Sheet
        open={selecionado !== null}
        onClose={() => setSelecionado(null)}
        title={selecionado?.nome ?? ''}
        subtitle={selecionado?.telefone}
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelecionado(null)}>
              Fechar
            </Button>
            <Button variant="accent" icon={WhatsappIcon}>
              Abrir conversa
            </Button>
          </>
        }
      >
        {selecionado && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone="neutral">{selecionado.convenio}</Badge>
              <Badge tone="neutral">Origem: {selecionado.origem}</Badge>
              {selecionado.consentimentoMarketing ? (
                <Badge tone="success">Aceita marketing</Badge>
              ) : (
                <Badge tone="danger">Sem consentimento de marketing</Badge>
              )}
            </div>

            <DataList
              itens={[
                ['Última consulta', selecionado.ultimaConsulta],
                ['Próxima consulta', selecionado.proximaConsulta ?? 'Sem agendamento'],
                ['Meses sem retornar', String(selecionado.inatividade)],
              ]}
            />

            <div className="border-subtle border-t pt-5">
              <h3 className="text-primary mb-3 text-sm font-semibold">Linha do tempo</h3>
              <Timeline
                eventos={[
                  { quando: selecionado.ultimaConsulta, quem: 'Dra. Helena Marques', oque: 'Consulta realizada', tone: 'success' },
                  { quando: '2 dias antes', quem: 'Paciente', oque: 'Confirmou pelo WhatsApp' },
                  { quando: '—', quem: selecionado.origem, oque: 'Origem do primeiro contato', tone: 'accent' },
                ]}
              />
            </div>
          </div>
        )}
      </Sheet>
    </PageBody>
  )
}
