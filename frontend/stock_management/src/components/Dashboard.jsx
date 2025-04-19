import React from 'react'

function Dashboard() {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-10 min-h-screen">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-bold text-gray-900 text-lg sm:text-xl md:text-2xl">
              Welcome to APADE Stock Management System!
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Today is {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
            <button aria-label="Select date range" className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm md:text-base hover:bg-gray-50">
              <i className="far fa-calendar-alt"></i>
              <span>Sep 11 — Oct 10</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
            <button aria-label="Select monthly filter" className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm md:text-base hover:bg-gray-50">
              Monthly
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
            <button aria-label="Filter" className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm md:text-base hover:bg-gray-50">
              <i className="fas fa-filter"></i>
              Filter
            </button>
            <button aria-label="Export" className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm md:text-base hover:bg-gray-50">
              <i className="fas fa-file-export"></i>
              Export
            </button>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-1">
              <img
                alt="Profile picture"
                className="rounded-full w-8 h-8 object-cover"
                src="https://storage.googleapis.com/a1aa/image/9228a177-4710-423a-0c1b-d3c929e71085.jpg"
                width="32"
                height="32"
              />
              <div className="text-gray-700 text-xs sm:text-sm">
                <p className="font-semibold leading-none">Admin User</p>
                <p className="leading-none">Stock Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats cards */}
        <section aria-label="Summary statistics" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div aria-labelledby="total-users" className="bg-white rounded-lg p-4 flex flex-col justify-between shadow-sm border border-gray-200" role="region">
            <div className="flex items-center gap-2">
              <div className="text-orange-500 text-xl">
                <i className="fas fa-users"></i>
              </div>
              <h2 className="font-semibold text-gray-900 text-lg md:text-xl" id="total-users">
                250
              </h2>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-1">Total Users</p>
            <p className="text-green-600 text-xs md:text-sm mt-3 flex items-center gap-1">
              <i className="fas fa-arrow-up text-xs"></i>
              12 more than last quarter
            </p>
          </div>
          {/* Card 2 */}
          <div aria-labelledby="total-products" className="bg-white rounded-lg p-4 flex flex-col justify-between shadow-sm border border-gray-200" role="region">
            <div className="flex items-center gap-2">
              <div className="text-red-600 text-xl">
                <i className="fas fa-box"></i>
              </div>
              <h2 className="font-semibold text-gray-900 text-lg md:text-xl" id="total-products">
                200
              </h2>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-1">Total Products</p>
            <p className="text-green-600 text-xs md:text-sm mt-3 flex items-center gap-1">
              <i className="fas fa-arrow-up text-xs"></i>
              0.2% more than last quarter
            </p>
          </div>
          {/* Card 3 */}
          <div aria-labelledby="stock-in" className="bg-white rounded-lg p-4 flex flex-col justify-between shadow-sm border border-gray-200" role="region">
            <div className="flex items-center gap-2">
              <div className="text-purple-600 text-xl">
                <i className="fas fa-arrow-down"></i>
              </div>
              <h2 className="font-semibold text-gray-900 text-lg md:text-xl" id="stock-in">
                38
              </h2>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-1">Stock In</p>
            <p className="text-green-600 text-xs md:text-sm mt-3 flex items-center gap-1">
              <i className="fas fa-arrow-up text-xs"></i>
              4% more than last quarter
            </p>
          </div>
          {/* Card 4 */}
          <div aria-labelledby="stock-out" className="bg-white rounded-lg p-4 flex flex-col justify-between shadow-sm border border-gray-200" role="region">
            <div className="flex items-center gap-2">
              <div className="text-blue-600 text-xl">
                <i className="fas fa-arrow-up"></i>
              </div>
              <h2 className="font-semibold text-gray-900 text-lg md:text-xl" id="stock-out">
                8
              </h2>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-1">Stock Out</p>
            <p className="text-green-600 text-xs md:text-sm mt-3 flex items-center gap-1">
              <i className="fas fa-check text-xs"></i>
              Without changes
            </p>
          </div>
        </section>

        {/* Cards row 2 */}
        <section aria-label="Detailed summary cards" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stock activity card */}
          <article aria-labelledby="stock-activity-title" className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <header className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg" id="stock-activity-title">
                Stock Activity
              </h3>
              <button aria-label="More options" className="text-gray-400 hover:text-gray-600" type="button">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </header>
            <div className="overflow-x-auto">
              {/* Placeholder for bar or line chart */}
              <svg width="100%" height="180" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Y axis lines and labels */}
                <text x="10" y="20" fill="#4b5563" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="start">600k</text>
                <line x1="40" y1="30" x2="350" y2="30" stroke="#e5e7eb" strokeWidth="1" />
                <text x="10" y="60" fill="#4b5563" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="start">500k</text>
                <line x1="40" y1="70" x2="350" y2="70" stroke="#e5e7eb" strokeWidth="1" />
                <text x="10" y="100" fill="#4b5563" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="start">400k</text>
                <line x1="40" y1="110" x2="350" y2="110" stroke="#e5e7eb" strokeWidth="1" />
                <text x="10" y="140" fill="#4b5563" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="start">300k</text>
                <line x1="40" y1="150" x2="350" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                <text x="10" y="180" fill="#4b5563" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="start">0k</text>
                {/* Bars */}
                <rect x="50" y="90" width="15" height="60" fill="#ef4444" />
                <rect x="50" y="70" width="15" height="20" fill="#fbbf24" />
                <rect x="50" y="50" width="15" height="20" fill="#a78bfa" />
                <rect x="90" y="80" width="15" height="70" fill="#ef4444" />
                <rect x="90" y="50" width="15" height="30" fill="#fbbf24" />
                <rect x="90" y="40" width="15" height="10" fill="#a78bfa" />
                <rect x="130" y="70" width="15" height="80" fill="#ef4444" />
                <rect x="130" y="40" width="15" height="30" fill="#fbbf24" />
                <rect x="130" y="30" width="15" height="10" fill="#a78bfa" />
                <rect x="170" y="90" width="15" height="60" fill="#ef4444" />
                <rect x="170" y="50" width="15" height="40" fill="#fbbf24" />
                <rect x="170" y="30" width="15" height="20" fill="#a78bfa" />
                <rect x="210" y="80" width="15" height="70" fill="#ef4444" />
                <rect x="210" y="40" width="15" height="40" fill="#fbbf24" />
                <rect x="210" y="30" width="15" height="10" fill="#a78bfa" />
                {/* X axis labels */}
                <text x="57" y="175" fill="#6b7280" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">30 Sep</text>
                <text x="97" y="175" fill="#6b7280" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">10 Oct</text>
                <text x="137" y="175" fill="#6b7280" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">20 Oct</text>
                <text x="177" y="175" fill="#6b7280" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">30 Oct</text>
                <text x="217" y="175" fill="#6b7280" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">10 Nov</text>
                {/* Legend */}
                <rect x="260" y="10" width="10" height="10" fill="#ef4444" />
                <text x="275" y="19" fill="#4b5563" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="start">Net salary</text>
                <rect x="260" y="25" width="10" height="10" fill="#fbbf24" />
                <text x="275" y="34" fill="#4b5563" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="start">Tax</text>
                <rect x="260" y="40" width="10" height="10" fill="#a78bfa" />
                <text x="275" y="49" fill="#4b5563" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="start">Loan</text>
              </svg>
            </div>
          </article>
          {/* Total income */}
          <article aria-labelledby="total-income-title" className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col justify-between">
            <header className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg" id="total-income-title">
                Total income
              </h3>
              <button aria-label="More options" className="text-gray-400 hover:text-gray-600" type="button">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </header>
            <div className="flex flex-col flex-grow">
              <p className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
                $11,800,000.00
              </p>
              <p className="text-green-600 text-xs md:text-sm flex items-center gap-1 mb-4">
                <i className="fas fa-arrow-up text-xs"></i>
                21% vs last month
              </p>
              <div className="relative flex-grow">
                <svg aria-hidden="true" fill="none" height="120" viewBox="0 0 360 120" width="100%" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid lines */}
                  <line stroke="#e5e7eb" strokeWidth="1" x1="40" x2="350" y1="20" y2="20" />
                  <line stroke="#e5e7eb" strokeWidth="1" x1="40" x2="350" y1="40" y2="40" />
                  <line stroke="#e5e7eb" strokeWidth="1" x1="40" x2="350" y1="60" y2="60" />
                  <line stroke="#e5e7eb" strokeWidth="1" x1="40" x2="350" y1="80" y2="80" />
                  <line stroke="#e5e7eb" strokeWidth="1" x1="40" x2="350" y1="100" y2="100" />
                  {/* Y axis labels */}
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="start" x="10" y="25">
                    15m
                  </text>
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="start" x="10" y="45">
                    12m
                  </text>
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="start" x="10" y="65">
                    9m
                  </text>
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="start" x="10" y="85">
                    6m
                  </text>
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="start" x="10" y="105">
                    3m
                  </text>
                  {/* X axis labels */}
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" x="57" y="115">
                    30 Sep
                  </text>
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" x="97" y="115">
                    10 Oct
                  </text>
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" x="137" y="115">
                    20 Oct
                  </text>
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" x="177" y="115">
                    30 Oct
                  </text>
                  <text fill="#6b7280" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" x="217" y="115">
                    10 Nov
                  </text>
                  {/* Area fill */}
                  <defs>
                    <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                      <stop stopColor="#a78bfa" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M40 100 L57 100 L97 80 L137 40 L177 60 L217 20 L217 100 Z" fill="url(#gradientArea)" stroke="none" />
                  {/* Line */}
                  <polyline fill="none" points="40,100 57,100 97,80 137,40 177,60 217,20" stroke="#7c3aed" strokeLinejoin="round" strokeWidth="2" />
                  {/* Highlight circle */}
                  <circle cx="97" cy="80" fill="#ef4444" r="6" stroke="white" strokeWidth="2" />
                  {/* Tooltip */}
                  <rect fill="#ef4444" height="24" rx="4" ry="4" width="80" x="80" y="50" />
                  <text fill="white" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" textAnchor="middle" x="120" y="68">
                    $3,400,849
                  </text>
                </svg>
              </div>
            </div>
          </article>
        </section>

        {/* Bottom tables */}
        <section aria-label="Tables section" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Payment vouchers */}
          <article aria-labelledby="payment-vouchers-title" className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <header className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg" id="payment-vouchers-title">
                Payment vouchers
              </h3>
              <button aria-label="More options" className="text-gray-400 hover:text-gray-600" type="button">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </header>
            <table className="w-full text-left text-xs md:text-sm text-gray-700">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-1 w-8">S/N</th>
                  <th className="py-2 px-1">Subject</th>
                  <th className="py-2 px-1 w-24">Date</th>
                  <th className="py-2 px-1 w-20">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-1 font-semibold">01</td>
                  <td className="py-2 px-1">Request for FARS for October 2022</td>
                  <td className="py-2 px-1">25/10/2025</td>
                  <td className="py-2 px-1 text-orange-500 font-semibold">Pending</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-1 font-semibold">02</td>
                  <td className="py-2 px-1">Request for project proposal fee</td>
                  <td className="py-2 px-1">19/10/2025</td>
                  <td className="py-2 px-1 text-green-600 font-semibold">Approved</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-1 font-semibold">03</td>
                  <td className="py-2 px-1">Request for FARS for October 2022</td>
                  <td className="py-2 px-1">10/10/2025</td>
                  <td className="py-2 px-1 text-green-600 font-semibold">Approved</td>
                </tr>
                <tr>
                  <td className="py-2 px-1 font-semibold">04</td>
                  <td className="py-2 px-1">Request for project proposal fee</td>
                  <td className="py-2 px-1">05/10/2025</td>
                  <td className="py-2 px-1 text-orange-500 font-semibold">Pending</td>
                </tr>
              </tbody>
            </table>
          </article>
          {/* Budget history */}
          <article aria-labelledby="budget-history-title" className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <header className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-base md:text-lg" id="budget-history-title">
                Budget history
              </h3>
              <button aria-label="More options" className="text-gray-400 hover:text-gray-600" type="button">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </header>
            <table className="w-full text-left text-xs md:text-sm text-gray-700">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-1 w-8">S/N</th>
                  <th className="py-2 px-1">Budget No.</th>
                  <th className="py-2 px-1 w-28">Budgeted Amount ($)</th>
                  <th className="py-2 px-1 w-28">Actual Amount ($)</th>
                  <th className="py-2 px-1 w-24">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-1 font-semibold">01</td>
                  <td className="py-2 px-1">00211235</td>
                  <td className="py-2 px-1">$1,400,000.00</td>
                  <td className="py-2 px-1">$1,380,000.00</td>
                  <td className="py-2 px-1">25/10/2025</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-1 font-semibold">02</td>
                  <td className="py-2 px-1">36211235</td>
                  <td className="py-2 px-1">$400,000.00</td>
                  <td className="py-2 px-1">$500,000.00</td>
                  <td className="py-2 px-1">22/10/2025</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-1 font-semibold">03</td>
                  <td className="py-2 px-1">00214465</td>
                  <td className="py-2 px-1">$2,000,000.00</td>
                  <td className="py-2 px-1">$1,400,000.00</td>
                  <td className="py-2 px-1">20/10/2025</td>
                </tr>
                <tr>
                  <td className="py-2 px-1 font-semibold">04</td>
                  <td className="py-2 px-1">00214465</td>
                  <td className="py-2 px-1">$800,000.00</td>
                  <td className="py-2 px-1">$180,000.00</td>
                  <td className="py-2 px-1">20/10/2025</td>
                </tr>
              </tbody>
            </table>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
