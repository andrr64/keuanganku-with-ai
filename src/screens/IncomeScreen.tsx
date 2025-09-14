import IncomeDistributionChart from './components/IncomeChartDistribution'
import IncomeHeader from './components/IncomeHeader'
import IncomeSummary from './components/IncomeSummary'
import IncomeTable from './components/IncomeTable'
import MonthlyIncomeTrendChart from './components/MonthlyIncomeTrendChart'

export default function IncomeScreen() {
  return (
    <div className="min-h-screen">
      <IncomeHeader />
      <main className="space-y-6">
        {/* Ringkasan di atas */}
        <IncomeSummary />

        {/* Tabel & distribusi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <IncomeTable />
          </div>  
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            <div className="flex-1">
              <IncomeDistributionChart />
            </div>
            <div className="flex-1">
              <MonthlyIncomeTrendChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
