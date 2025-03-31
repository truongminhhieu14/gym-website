"use client"

import ROLE from '@/constants/roles';
import SummaryApi from '@/services/SummaryApi';
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

interface ChangeUserRoleProps {
    name: string;
    email: string;
    role: string;
    userId: string;
    onClose: () => void;
    callFunc: () => void;
}
const ChangeUserRole: React.FC<ChangeUserRoleProps> = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState<string>(role);

    const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserRole(e.target.value)
    }

    const updateUserRole = async() => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole,
            })
        })
        const responseData = await fetchResponse.json();
        if(responseData.success) {
            toast.success(responseData.message)
            onClose(),
            callFunc()
        }
        console.log("role updated", responseData)
    }
    
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        {/* Close Button */}
        <button className="block ml-auto text-gray-600 hover:text-red-500" onClick={onClose}>
          <IoMdClose size={24} />
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold pb-4">Change User Role</h1>

        {/* User Details */}
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>

        {/* Role Selection */}
        <div className="flex items-center justify-between my-4">
          <p className="font-medium">Role:</p>
          <select
            className="border px-4 py-1 rounded-md"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-2 mt-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  )
}

export default ChangeUserRole