"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const ListPortfolio = () => {

    const [Portfolios, setPortfolios] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchPortfolios()
    }, [])

    const fetchPortfolios = async () => {
        try {
            const { data } = await axios.get("/api/portfolios")
            setPortfolios(data)
            console.log(data)

        } catch (error) {
            console.log(error)
        } finally {
           setIsLoading(false) 
        }
    }

    if (isLoading) {
        return <div className="p-8 flex items-center justify-center min-h-[50vh]"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
    } 
  
  return (
    <div>
        {Portfolios.map((p) => (
            <div key={p.id} className='text-slate-800'>
                    <p>{p.title}</p>
                    <p>{p.company}</p>
            </div>
        ))}
    </div>
  )
}

export default ListPortfolio