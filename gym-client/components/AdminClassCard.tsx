"use client"

import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditClass from "./AdminEditClass";

interface Rating {
  userId: string;
  content: string;
  stars: number;
}
// Định nghĩa kiểu dữ liệu cho props của AdminClassCard
interface ClassData {
  _id: string;
  className: string;
  trainerName: string;
  schedule: string;
  classImage: string[];
  description: string;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  status: string;
  goals: string[];
  ratings: Rating[];
}

interface AdminClassCardProps {
  data: ClassData;
  fetchData: () => void;
}

const AdminClassCard: React.FC<AdminClassCardProps> = ({ data, fetchData }) => {
  const [editClass, setEditClass] = useState<boolean>(false);

  // Tính trung bình đánh giá
  const averageRating = (ratings: Rating[]) => {
    if (ratings.length === 0) return "0.0";
    const total = ratings.reduce((sum, r) => sum + r.stars, 0);
    return (total / ratings.length).toFixed(1);
  };
  return (
    <div className="bg-white p-4 rounded shadow-md w-72 space-y-2">
      {/* Hình ảnh lớp học */}
      <div className="w-full h-40 overflow-hidden rounded-md">
        <img
          src={data?.classImage?.[0] || "/no-image.png"}
          alt={data.className}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tên lớp */}
      <h1 className="text-lg font-bold text-gray-800 line-clamp-2">
        {data.className}
      </h1>

      {/* Thông tin lớp học */}
      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-semibold">HLV:</span> {data.trainerName}</p>
        <p><span className="font-semibold">Lịch:</span> {data.schedule}</p>
        <p><span className="font-semibold">Thời lượng:</span> {data.duration} phút</p>
        <p><span className="font-semibold">Sĩ số:</span> {data.currentParticipants}/{data.maxParticipants}</p>
        <p><span className="font-semibold">Trạng thái:</span> {data.status}</p>
        <p><span className="font-semibold">Đánh giá:</span> ⭐ {averageRating(data.ratings)}</p>
      </div>

      {/* Nút chỉnh sửa */}
      <div
        className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
        onClick={() => setEditClass(true)}
      >
        <MdModeEditOutline size={20} />
      </div>

      {/* Modal chỉnh sửa */}
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
