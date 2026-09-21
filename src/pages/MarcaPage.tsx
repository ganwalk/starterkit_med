import {
  Alert,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  PageBody,
  PageHeader,
  Select,
  Switch,
  TabPanel,
  Tabs,
} from '@/ds'
import { useState } from 'react'
import { Alert01Icon } from '@hugeicons/core-free-icons'
import { useTenant } from '@/tenant/TenantProvider'
import { cn } from '@/lib/cn'
import { Implantacao } from './marca/Implantacao'

/**
 * Motor de marca — §9 e §13. A customização é parâmetro, nunca fork:
 * esta tela é literalmente a interface de edição dos tokens do tenant.
 */
export function MarcaPage() {
  const { tenant, tenants, setTenantId } = useTenant()
  const [portalAtivo, setPortalAtivo] = useState(true)
  const [botAtivo, setBotAtivo] = useState(true)
  const [aba, setAba] = useState('marca')

  return (
    <PageBody>
      <PageHeader
        titulo="Motor de marca"
        resumo="Logo, cor, domínio e textos por clínica — sem uma linha de código por cliente"
        acoes={aba === 'marca' ? <Button variant="accent">Salvar e publicar</Button> : undefined}
      >
        <Tabs
          label="Seções do motor de marca"
          idBase="marca"
          ativo={aba}
          onChange={setAba}
          itens={[
            { id: 'marca', label: 'Marca' },
            { id: 'implantacao', label: 'Implantação' },
          ]}
        />
      </PageHeader>

      <TabPanel idBase="marca" id="implantacao" ativo={aba === 'implantacao'}>
        <Implantacao />
      </TabPanel>

      <TabPanel idBase="marca" id="marca" ativo={aba === 'marca'}>
      <div className="mb-5">
        <Alert tone="info" icon={Alert01Icon} titulo="O que dá para personalizar está nesta tela">
          Logo, cor, domínio e textos mudam por clínica. Pedido além disso vira um módulo à parte,
          orçado separadamente.
        </Alert>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-5">
          <Card>
            <CardHeader title="Identidade" caption="Aplica-se ao app, ao portal do paciente e às mensagens" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome da clínica">
                {(id) => <Input id={id} defaultValue={tenant.nome} key={tenant.id} />}
              </Field>
              <Field label="Domínio do portal" hint="Recomendamos domínio próprio da clínica">
                {(id) => <Input id={id} defaultValue={tenant.dominio} key={tenant.id} />}
              </Field>
              <Field label="Especialidade principal">
                {(id) => <Input id={id} defaultValue={tenant.especialidade} key={tenant.id} />}
              </Field>
              <Field label="Fuso de atendimento">
                {(id) => (
                  <Select id={id} defaultValue="gyn">
                    <option value="gyn">Goiânia (GMT-3)</option>
                    <option value="sp">São Paulo (GMT-3)</option>
                  </Select>
                )}
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Cor da marca"
              caption="A cor de destaque da clínica. O restante da interface não muda"
            />
            <div className="flex flex-wrap gap-3">
              {tenants.map((item) => {
                const ativo = item.id === tenant.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setTenantId(item.id)}
                    aria-pressed={ativo}
                    className={cn(
                      'flex min-h-[var(--target-comfortable)] items-center gap-2.5 rounded-lg border px-3 transition-base',
                      ativo ? 'border-accent bg-accent-soft' : 'border-subtle hover:border-line-strong',
                    )}
                  >
                    <span
                      className="size-5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.amostra }}
                      aria-hidden
                    />
                    <span className="text-primary text-sm font-medium">{item.marca}</span>
                  </button>
                )
              })}
            </div>
            <p className="text-faint mt-4 text-xs leading-relaxed">
              A mudança vale na hora, em todas as telas e no portal do paciente.
            </p>
          </Card>

          <Card>
            <CardHeader title="O que o paciente vê" caption="A clínica escolhe o que aparece no portal" />
            <div className="space-y-4">
              <Switch checked={portalAtivo} onChange={setPortalAtivo} label="Portal do paciente ativo" />
              <Switch checked={botAtivo} onChange={setBotAtivo} label="Assistente 24h no WhatsApp" />
            </div>
          </Card>
        </div>

        {/* Prévia ao vivo: o mesmo token que o app usa */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card padding="none" elevation="md" className="overflow-hidden">
            <div
              className="px-5 pt-8 pb-10"
              style={{
                background:
                  'linear-gradient(140deg, var(--accent) 0%, var(--accent-hover) 55%, color-mix(in srgb, var(--accent-hover) 70%, #000) 100%)',
              }}
            >
              <p className="text-2xs font-semibold text-white/70">{tenant.nome}</p>
              <p className="mt-1 text-h3 font-bold tracking-[-0.02em] text-white">Olá, Ana Beatriz</p>
            </div>
            <div className="p-5">
              <p className="text-primary text-sm font-semibold">Quinta, 24 de setembro</p>
              <p className="text-muted mt-1 text-xs">14:30 · Retorno · Dra. Helena Marques</p>
              <div className="mt-4 flex gap-2">
                <span className="bg-accent text-accent-contrast rounded-pill px-3 py-1.5 text-2xs font-semibold">
                  Confirmar presença
                </span>
                <span className="bg-sunken text-secondary rounded-pill px-3 py-1.5 text-2xs font-semibold">
                  Remarcar
                </span>
              </div>
              <p className="text-faint mt-4 text-2xs">{tenant.dominio}</p>
            </div>
          </Card>
          <p className="text-faint mt-3 px-1 text-xs">
            É a tela que o paciente vê, e onde a marca da clínica aparece maior.
          </p>
        </div>
      </div>
      </TabPanel>
    </PageBody>
  )
}
