import {
  Bank,
  Building,
  Car,
  CurrencyCircleDollar,
  House,
  Receipt,
  MapPinArea,
  Wallet
} from '@phosphor-icons/react'
import type { Candidate } from 'types/candidate'

import styles from './styles.module.scss'

const convertFloatToCurrency = (currency: string | number) => {
  const value = Number(currency)

  if (!value) {
    return ''
  }

  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  }).format(value)
}

export const Properties = (candidate: Candidate) => {
  const total = convertFloatToCurrency(candidate.totalDeBens)

  const getIconProperty = (type: string) => {
    if (type.includes('automóvel')) {
      return <Car size={20} />
    } else if (type.includes('Apartamento')) {
      return <Building size={20} />
    } else if (type.includes('Casa')) {
      return <House size={20} />
    } else if (type.includes('Terreno')) {
      return <MapPinArea size={20} />
    } else if (
      type.includes('Investimentos') ||
      type.includes('Outros fundos')
    ) {
      return <CurrencyCircleDollar size={20} />
    } else if (type.includes('CDB') || type.includes('conta corrente')) {
      return <Bank size={20} />
    }

    return <Wallet size={20} />
  }

  const formatDescription = (value: string) => {
    const description = value.toLocaleLowerCase()

    if (
      description.includes('participação sociedade') ||
      description.includes('capital social')
    ) {
      return 'Partipação sociedade'
    } else if (description.includes('investimento')) {
      return 'Investimentos'
    }

    return description
  }

  return (
    <div className="card">
      <h2>
        <Receipt />
        Patrimônio declarado
        {total && <span className={styles.total}>{total}</span>}
      </h2>

      {!total ? (
        <p className={styles.empty}>Não há dados registrados!</p>
      ) : (
        <div className={styles.properties}>
          {candidate.bens.map(item => (
            <div
              key={item.ordem}
              className={styles.property}
              title={item.descricao}
            >
              <span>{getIconProperty(item.descricaoDeTipoDeBem)}</span>

              <div>
                <strong>{formatDescription(item.descricao)}</strong>
                <span>{convertFloatToCurrency(item.valor)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
