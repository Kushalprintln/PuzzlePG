'use client'

import Image from 'next/image'
import puzzleIcon from '../../public/PuzzleIcon.png'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import AuthModal from './AuthModal'
import { useAuth } from '@/context/authContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (err) {
      console.error('Logout failed:', err)
    }
    logout()
    setDropdownOpen(false)
    window.location.href = '/'
  }

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <Image src={puzzleIcon} alt="Logo" className="h-8 w-8 object-contain" />
        <span className="text-2xl font-bold text-blue-600">PuzzlePG</span>
      </div>

      {!user ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
      ) : (
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <FaUserCircle className="text-blue-600" size={28} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border shadow-md rounded-md z-10 p-4">
              <p className="font-bold text-sm text-gray-800">{user.name || 'User'}</p>
              <p className="text-xs font-bold text-gray-500">{user.email}</p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
