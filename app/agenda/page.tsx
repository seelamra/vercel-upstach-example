'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AgendaDisplay from '../components/AgendaDisplay'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Agenda() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profileData = sessionStorage.getItem('userData')
      if (profileData) {
        //const parsedData = JSON.parse(profileData)
        setUserName(profileData)
      }
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loading && userName === null) {
      router.push('/')
    }
  }, [userName, loading, router])

  if (loading || userName === null) {
    return null
  }

  return (
    <div className="py-0">
      <Header activeLink="agenda" />
      <div className="py-1">
        <AgendaDisplay />
      </div>
      <Footer />
    </div>
  )
}