"use client"

import ROLE from '@/constants/roles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const adminPanel = () => {
    const user = useSelector((state: any) => state?.user?.user)
    const router = useRouter()

    useEffect(() => {
        if(!user || user.role !== ROLE.ADMIN) {
            router.push("/")
        }
    },[user, router])

    if(!user) return <p>Loading...</p>
  return (
    <div className="min-h-screen md:flex hidden">
      {/* Sidebar */}
      <aside className="bg-white h-full w-full max-w-60">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer flex justify-center">
            <FaRegUserCircle />
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name || "Admin"}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className="grid p-4">
          <Link href="/adminPanel/all-user" className="px-2 py-1 hover:bg-slate-100">Tất cả người dùng</Link>
          <Link href="/adminPanel/membership-cards" className="px-2 py-1 hover:bg-gray-100 rounded">🎫 Quản lý thẻ thành viên</Link>
          <Link href="/adminPanel/trainers" className="px-2 py-1 hover:bg-gray-100 rounded">🏋️ Quản lý huấn luyện viên</Link>
          <Link href="/adminPanel/personal-data" className="px-2 py-1 hover:bg-gray-100 rounded">📊 Phân tích dữ liệu cá nhân</Link>
          <Link href="/adminPanel/promotions" className="px-2 py-1 hover:bg-gray-100 rounded">🎁 Chương trình khuyến mãi</Link>
          <Link href="/adminPanel/support" className="px-2 py-1 hover:bg-gray-100 rounded">🛠️ Hỗ trợ & giải quyết vấn đề</Link>
          <Link href="/adminPanel/all-class" className="px-2 py-1 hover:bg-gray-100 rounded">📚 Tổ chức khóa học & đào tạo</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full h-full p-2">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Chào mừng đến với bảng điều khiển Admin!</p>
      </main>
    </div>
  )
}

export default adminPanel