"use client"

import SummaryApi from '@/services/SummaryApi'
import React, { useEffect, useState } from 'react'
import moment from 'moment'


interface MembershipItem {
    name: string
    price: number
    quantity: number
  }
  interface PaymentDetails {
    paymentIntentId?: string
    payment_method_type?: string[]
    payment_status?: string
  }
  
  interface MembershipData {
    _id: string
    membershipDetails: MembershipItem[]
    email: string
    userId: string
    paymentDetails: PaymentDetails
    totalAmount: number
    createdAt: string
  }

const MembershipPage: React.FC = () => {
    const [data, setData] = useState<MembershipData[]>([])

    const fetchMembershipDetails = async() => {
        const response = await fetch(SummaryApi.getMembership.url, {
            method: SummaryApi.getMembership.method,
            credentials: "include"
        })
        const responseData = await response.json()
        setData(responseData.data || [])
        console.log("membership list", responseData)
    }

    useEffect(()=> {
        fetchMembershipDetails()
    },[])
  return (  
    <div className="p-4">
      {!data.length && <p>No Membership found.</p>}

      {data.map((item, index) => (
        <div key={item._id + index} className="border rounded p-4 mb-4 bg-white shadow-md">
          <p className="font-bold text-lg">Membership Date: {moment(item.createdAt).format('LL')}</p>
          <p>Email: {item.email}</p>
          <p>User ID: {item.userId}</p>

          <div className="mt-2">
            <p className="font-semibold text-md mb-1">Membership Details:</p>
            {item.membershipDetails.map((membership, idx) => (
              <div key={membership.name + idx} className="ml-4">
                <p className="text-sm">🧾 Name: {membership.name}</p>
                <p className="text-sm">💰 Price: {membership.price.toLocaleString('vi-VN')} VND</p>
                <p className="text-sm">📦 Quantity: {membership.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <p className="font-semibold">Payment Info:</p>
            <p>Payment Method: {item.paymentDetails.payment_method_type?.[0] || 'N/A'}</p>
            <p>Status: {item.paymentDetails.payment_status || 'N/A'}</p>
            <p>Payment Intent ID: {item.paymentDetails.paymentIntentId || 'N/A'}</p>
          </div>

          <div className="font-bold text-right mt-2 text-red-600">
            Total: {item.totalAmount.toLocaleString('vi-VN')} VND
          </div>
        </div>
      ))}
    </div>
  )
}

export default MembershipPage