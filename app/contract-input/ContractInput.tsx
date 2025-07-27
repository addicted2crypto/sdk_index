"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const ContractInput = () => {
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const validateAddress = (value: string) => {
    // Basic evm address validation will to change here if needed diff than 42
    const addressValid = /^0x[a-fA-F0-9]{40}$/
    if (!addressValid.test(value)) {
      setError('Invalid address format. Go back to solana')
      return false
  }
  setError('')
  return true
  } 

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateAddress(address)) {
      // Will delete this is for testing
      console.log('Valid address submitted:', address)
      // You can add further logic here, like calling a function to fetch data
    } else {
      console.error('Invalid addres:', address)
    }
  }
  return (
    <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
      <form onSubmit={handleAddressSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter contract address"
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <Button variant="outline">Button</Button>
      </form>
      </div>
  )
}
