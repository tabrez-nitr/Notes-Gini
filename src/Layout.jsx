import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import NavBar from './components/NavBar'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoaderButton from './lib/LoaderButton'

function Layout() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user !== null) {
      navigate('/note')
    }
  }, [user, navigate])

  if (loading) {
    return <LoaderButton />
  }

  return (
    <div className="app-bg">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
