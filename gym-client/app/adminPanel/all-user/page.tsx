"use client"

import ChangeUserRole from '@/components/ChangeUserRole';
import SummaryApi from '@/services/SummaryApi';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}
const AllUsers = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [openUpdateRole, setOpenUpdateRole] = useState<boolean>(false)
    const [updateUserDetails, setUpdateUserDetails] = useState<User | null>(null)
    const fetchAllUsers = async() => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })
        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }
        if(dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>#</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length > 0 ? (
            allUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{moment(user.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {openUpdateRole && updateUserDetails && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  )
}

export default AllUsers