import React from 'react'

function Settings() {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto border border-gray-200 rounded-md overflow-hidden bg-white font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-sm text-gray-900">Settings</h2>
          <button aria-label="Search" className="text-gray-400 hover:text-gray-600 focus:outline-none">
            <i className="fas fa-search text-base"></i>
          </button>
        </div>
        <nav className="flex flex-col px-6 py-4 space-y-3 text-sm text-gray-700 overflow-y-auto">
          <a href="#" className="flex items-center space-x-2 font-semibold text-gray-900 border-l-4 border-blue-500 pl-3 py-1">
            <i className="fas fa-user-circle text-gray-400"></i>
            <span>Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-2 font-semibold text-gray-900">
            <i className="fas fa-cog text-gray-400"></i>
            <span>Account</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <i className="fas fa-comment-alt text-gray-400"></i>
            <span>Chat</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <i className="fas fa-infinity text-gray-400"></i>
            <span>Voice &amp; video</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <i className="fas fa-desktop text-gray-400"></i>
            <span>Appearance</span>
          </a>
          <a href="#" className="flex items-center space-x-2">
            <i className="fas fa-bell text-gray-400"></i>
            <span>Notification</span>
          </a>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8">
        <form className="max-w-3xl space-y-6">
          {/* Profile picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile picture</label>
            <div className="flex items-center space-x-4">
              <img
                alt="Profile picture of a bearded man with glasses wearing a black shirt on a pink background"
                className="w-16 h-16 rounded-full object-cover"
                src="https://storage.googleapis.com/a1aa/image/22b53de1-9303-437c-a5ee-48196959edc4.jpg"
                width="64"
                height="64"
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Change picture
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-red-500 text-red-600 text-sm font-semibold rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete picture
              </button>
            </div>
          </div>
          {/* Profile name */}
          <div>
            <label htmlFor="profileName" className="block text-sm font-medium text-gray-700 mb-1">
              Profile name
            </label>
            <input
              id="profileName"
              name="profileName"
              type="text"
              defaultValue="Kevin Heart"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div>
              <div className="flex items-center rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 text-sm">
                <span className="mr-2 font-semibold text-gray-600">@</span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  readOnly
                  defaultValue="kevinunhuy"
                  className="bg-transparent w-full focus:outline-none focus:ring-0 focus:border-transparent text-gray-400 placeholder-gray-400"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">Available change in 25/04/2024</p>
            </div>
          </div>
          {/* Status recently */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status recently
            </label>
            <input
              id="status"
              name="status"
              type="text"
              defaultValue="On duty"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {/* About me */}
          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
              About me
            </label>
            <textarea
              id="about"
              name="about"
              rows="5"
              defaultValue="Discuss only on work hour, unless you wanna discuss about music 👍🏻"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>
          {/* Save changes button */}
          <div>
            <button
              type="submit"
              disabled
              className="px-4 py-2 bg-gray-300 text-white text-sm font-semibold rounded cursor-not-allowed"
            >
              Save changes
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Settings
