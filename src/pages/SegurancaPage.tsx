import { Download01Icon, SecurityCheckIcon, Shield01Icon } from '@hugeicons/core-free-icons'
import {
  Alert,
  Badge,
  Button,
  Card,
  CardHeader,
  DataList,
  PageBody,
  PageHeader,
  Table,
  Timeline,
} from '@/ds'
import type { Column } from '@/ds'
import { AUDITORIA, PAPEIS } from '@/data/plataforma'
import type { Papel } from '@/data/plataforma'

/**
 * Perfis de acesso, log de auditoria e trilha de consentimento — o
 * "compliance embutido" de §12, exigido pela LGPD em §8.
 */
export function SegurancaPage() {
  const colunas: Column<Papel>[] = [
    { chave: 'nome', titulo: 'Perfil', render: (p) => <span className="text-primary font-medium">{p.nome}</span> },
    { chave: 'pessoas', titulo: 'Pessoas', numerico: true, render: (p) => p.pessoas },
    {
      chave: 'permissoes',
      titulo: 'Acessa',
      render: (p) => (
        <div className="flex flex-wrap gap-1.5">
          {p.permissoes.map((perm) => (
            <Badge key={perm} tone="neutral">
              {perm}
            </Badge>
          ))}
        </div>
      ),
    },
  ]

  return (
    <PageBody>
      <PageHeader
        titulo="Acesso e auditoria"
        resumo="Quem vê o quê, e o registro de tudo que foi feito com dado de paciente"
        acoes={
          <Button variant="subtle" icon={Download01Icon}>
            Exportar log
          </Button>
        }
      />

      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <Alert tone="info" icon={Shield01Icon} titulo="A clínica é controladora, a plataforma é operadora">
          Dado de saúde é dado sensível. O contrato de operação define quem responde pelo quê, e a
          ANPD anunciou fiscalização sobre dados de saúde até o fim de 2026.
        </Alert>
        <Alert tone="warning" icon={SecurityCheckIcon} titulo="Incidente se comunica em até 3 dias úteis">
          O plano de resposta está versionado e o contato do encarregado fica publicado no portal.
        </Alert>
      </div>

      <Card padding="none" className="mb-5">
        <div className="p-6 pb-0">
          <CardHeader
            title="Perfis de acesso"
            caption="O suporte da Level só entra com acesso temporário concedido pela clínica, e o acesso fica registrado"
          />
        </div>
        <Table label="Perfis de acesso" colunas={colunas} linhas={PAPEIS} chaveDe={(p) => p.id} />
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Log de auditoria" caption="Toda leitura e exportação de dado de paciente" />
          <Timeline eventos={AUDITORIA} />
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Proteções ativas" />
            <DataList
              itens={[
                ['Criptografia em trânsito e repouso', <Badge key="a" tone="success">Ativa</Badge>],
                ['Backup diário verificado', <Badge key="b" tone="success">Ativo</Badge>],
                ['Exportação completa dos dados', <Badge key="c" tone="success">Disponível sempre</Badge>],
                ['Teste de invasão por terceiro', <Badge key="d" tone="warning">Previsto</Badge>],
                ['Prontuário certificado NGS2', <Badge key="e" tone="neutral">Não incluso</Badge>],
              ]}
            />
          </Card>

          <Card>
            <CardHeader
              title="Consentimento de marketing"
              caption="Separado do consentimento de atendimento, e revogável pelo paciente"
            />
            <DataList
              itens={[
                ['Pacientes que aceitaram', '7 de 10'],
                ['Revogações neste mês', '1'],
                ['Campanhas bloqueadas por falta de consentimento', '3'],
              ]}
            />
            <p className="text-faint mt-4 text-xs leading-relaxed">
              A trava é automática: uma campanha não consegue selecionar quem não aceitou. O mesmo
              vale para as regras de publicidade médica do CFM.
            </p>
          </Card>
        </div>
      </div>
    </PageBody>
  )
}
