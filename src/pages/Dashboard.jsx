import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { EcoChart, BarChartComponent, PieChartComponent } from '@/components/dashboard/EcoChart'

const Dashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Mock data for charts
  const monthlySalesData = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 1398 },
    { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 },
    { name: 'May', value: 4800 },
  ]

  const categoryData = [
    { name: 'Clothing', value: 45 },
    { name: 'Home', value: 30 },
    { name: 'Electronics', value: 15 },
    { name: 'Beauty', value: 10 },
  ]

  const ecoScoreData = [
    { name: 'Week 1', eco: 65 },
    { name: 'Week 2', eco: 72 },
    { name: 'Week 3', eco: 68 },
    { name: 'Week 4', eco: 81 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your sustainable shopping impact
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Purchases</p>
            <p className="text-3xl font-bold text-eco-600">24</p>
            <p className="text-gray-500 text-xs mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Eco Impact Score</p>
            <p className="text-3xl font-bold text-eco-600">74/100</p>
            <p className="text-gray-500 text-xs mt-2">↑ 8% improvement</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Carbon Saved (kg)</p>
            <p className="text-3xl font-bold text-eco-600">45.2</p>
            <p className="text-gray-500 text-xs mt-2">Equivalent to 2 trees</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Plastic Saved (g)</p>
            <p className="text-3xl font-bold text-eco-600">2,450</p>
            <p className="text-gray-500 text-xs mt-2">↓ 5 plastic bottles</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EcoChart
            type="bar"
            data={monthlySalesData}
            dataKey="value"
            title="Monthly Purchases"
          />
          <EcoChart
            type="pie"
            data={categoryData}
            title="Category Distribution"
            colors={['#22c55e', '#f59e0b', '#ef4444', '#3b82f6']}
          />
          <EcoChart
            type="line"
            data={ecoScoreData}
            dataKey="eco"
            title="Eco Score Trend"
            stroke="#22c55e"
            name="Eco Score"
          />
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Recent Achievements
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-2xl">🏅</span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Eco Champion</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Purchased 10 eco products
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Green Guardian</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Saved 40kg of carbon
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">♻️</span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Recycler</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Purchased 5 recycled products
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
