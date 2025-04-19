import { useState } from 'react'

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New stock added for Product A', time: '2023-06-10 10:00', read: false },
    { id: 2, message: 'User admin logged in', time: '2023-06-10 09:30', read: true },
    { id: 3, message: 'Stock out recorded for Product B', time: '2023-06-09 16:45', read: false },
  ])

  const toggleRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n))
  }

  const deleteNotification = (id) => {
    if (window.confirm('Delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== id))
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map(n => (
          <li
            key={n.id}
            className={`p-4 rounded shadow flex justify-between items-center ${
              n.read ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div>
              <p className="font-medium">{n.message}</p>
              <p className="text-sm text-gray-500">{n.time}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleRead(n.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                {n.read ? 'Mark Unread' : 'Mark Read'}
              </button>
              <button
                onClick={() => deleteNotification(n.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="text-center py-4 text-gray-500">No notifications</li>
        )}
      </ul>
    </div>
  )
}

export default Notifications
