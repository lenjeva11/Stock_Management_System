import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function HomeIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3z" />
    </svg>
  )
}

function CubeIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function ArrowDownTrayIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ArrowUpTrayIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
      <polyline points="17 14 12 9 7 14" />
      <line x1="12" y1="9" x2="12" y2="21" />
    </svg>
  )
}

function Cog6ToothIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { to: '/products', label: 'Products', icon: CubeIcon },
    { to: '/stock-in', label: 'Stock In', icon: ArrowDownTrayIcon },
    { to: '/stock-out', label: 'Stock Out', icon: ArrowUpTrayIcon },
    { to: '/settings', label: 'Settings', icon: Cog6ToothIcon },
  ]

  return (
    <div className="flex">
      <aside className={`bg-white border-r border-gray-200 h-screen p-4 flex flex-col ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-xl font-bold text-primary ${isOpen ? 'block' : 'hidden'}`}>APADE Stock</h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        <nav className="flex flex-col space-y-2">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-3 p-2 rounded hover:bg-primary hover:text-white transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700'
                }`}
              >
                <Icon className="h-6 w-6" />
                {isOpen && <span className="text-sm font-medium">{label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50 min-h-screen overflow-auto">{/* Content will be rendered here */}</main>
    </div>
  )
}

export default Navigation
