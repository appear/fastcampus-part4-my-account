import dynamic from 'next/dynamic'

import withAuth from '@hooks/withAuth'
import Spacing from '@/components/shared/Spacing'

const MonthlyChart = dynamic(() => import('@components/account/MonthlyChart'))
const PiggybankRow = dynamic(() => import('@components/account/PiggybankRow'))
const CategoryPieChart = dynamic(
  () => import('@components/account/CategoryPieChart'),
)
const Transactions = dynamic(() => import('@components/account/Transactions'))

function AccountPage() {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0 ' }}
      />

      <PiggybankRow />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0 ' }}
      />

      <CategoryPieChart chartData={generatePieChartData()} />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0 ' }}
      />
      <Transactions />
    </div>
  )
}

function generatePieChartData() {
  return ['카페', '쇼핑', '여행', '커피'].map((label) => ({
    label,
    amount: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
  }))
}

function generateMonthlyChartData() {
  return [
    '2023-01-31',
    '2023-02-28',
    '2023-03-31',
    '2023-04-30',
    '2023-05-31',
    '2023-06-30',
    '2023-07-31',
    '2023-08-31',
    '2023-09-30',
    '2023-10-31',
    '2023-11-30',
    '2023-12-31',
  ].map((date) => ({
    date,
    balance: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
  }))
}

export default withAuth(AccountPage)
