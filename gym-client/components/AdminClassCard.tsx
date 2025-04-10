"use client"

import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditClass from "./AdminEditClass";


// Định nghĩa kiểu dữ liệu cho props của AdminClassCard
interface ClassData {
  className: string;
  trainerName: string;
  schedule: string;
  classImage: string[];
}

interface AdminClassCardProps {
  data: ClassData;
  fetchData: () => void;
}

const AdminClassCard: React.FC<AdminClassCardProps> = ({ data, fetchData }) => {
  const [editClass, setEditClass] = useState<boolean>(false);

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        {/* Hình ảnh lớp tập gym */}
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.classImage[0] || ''}
            alt={data?.className || "Class Image"}
            className="mx-auto object-fill h-full"
          />
        </div>
        
        {/* Tên lớp tập */}
        <h1 className="text-ellipsis line-clamp-2 font-bold">{data.className}</h1>
        
        {/* Tên huấn luyện viên */}
        <p className="text-sm text-gray-600">HLV: {data.trainerName}</p>

        {/* Lịch học */}
        <p className="text-sm text-gray-600">Lịch: {data.schedule}</p>

        {/* Nút chỉnh sửa */}
        <div
          className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
          onClick={() => setEditClass(true)}
        >
          <MdModeEditOutline />
        </div>
      </div>

      {/* Modal chỉnh sửa lớp tập gym */}
      {editClass && (
        <AdminEditClass
          classData={data}
          onClose={() => setEditClass(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminClassCard;
