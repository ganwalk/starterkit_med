import { Button, PageBody, PageHeader, TabPanel, Tabs } from '@/ds'
import { useState } from 'react'
import { Implantacao } from './marca/Implantacao'
import { Identidade } from './marca/Identidade'

/**
 * Motor de marca — §9 e §13. A customização é parâmetro, nunca fork:
 * esta tela é literalmente a interface de edição dos tokens do tenant.
 */
export function MarcaPage() {

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
        <Identidade />
      </TabPanel>
    </PageBody>
  )
}
