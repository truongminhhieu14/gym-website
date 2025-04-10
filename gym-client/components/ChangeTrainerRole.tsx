import SummaryApi from "@/services/SummaryApi";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

interface ChangeTrainerRoleProps {
  trainerId: string;
  name: string;
  email: string;
  phone?: string; // Chỉ dùng cho trainer
  specialization?: string; // Chỉ dùng cho trainer
  role: string;
  onClose: () => void;
  callFunc: () => void;
}

const ChangeTrainerRole: React.FC<ChangeTrainerRoleProps> = ({
  trainerId,
  name,
  email,
  phone,
  specialization,
  role,
  onClose,
  callFunc,
}) => {
  const [trainerRole, setTrainerRole] = useState<string>(role);
  const [trainerPhone, setTrainerPhone] = useState<string>(phone || "");
  const [trainerSpecialization, setTrainerSpecialization] = useState<string>(
    specialization || ""
  );

  const handleOnChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrainerRole(e.target.value);
  };

  const handleUpdateTrainer = async () => {
    try {
      const response = await fetch(
        `${SummaryApi.updateTrainer.url}/${trainerId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: trainerRole,
            phone: trainerRole === "trainer" ? trainerPhone : undefined,
            specialization:
              trainerRole === "trainer" ? trainerSpecialization : undefined,
          }),
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin HLV:", error);
      toast.error("Không thể cập nhật thông tin HLV.");
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        {/* Close Button */}
        <button
          className="block ml-auto text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold pb-4">
          Cập nhật thông tin Huấn Luyện Viên
        </h1>

        {/* Trainer Details */}
        <p>
          <strong>Tên:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>

        {/* Role Selection */}
        <div className="my-3">
          <label className="font-medium">Vai trò:</label>
          <select
            className="border w-full px-4 py-1 rounded-md"
            value={trainerRole}
            onChange={handleOnChangeRole}
          >
            <option value="trainer">Huấn luyện viên</option>
            <option value="admin">Quản trị viên</option>
            <option value="member">Thành viên</option>
          </select>
        </div>

        {/* Phone (Chỉ dành cho Trainer) */}
        {trainerRole === "trainer" && (
          <div className="my-3">
            <label className="font-medium">Số điện thoại:</label>
            <input
              type="text"
              className="border w-full px-4 py-1 rounded-md"
              value={trainerPhone}
              onChange={(e) => setTrainerPhone(e.target.value)}
            />
          </div>
        )}

        {/* Specialization (Chỉ dành cho Trainer) */}
        {trainerRole === "trainer" && (
          <div className="my-3">
            <label className="font-medium">Chuyên môn:</label>
            <input
              type="text"
              className="border w-full px-4 py-1 rounded-md"
              value={trainerSpecialization}
              onChange={(e) => setTrainerSpecialization(e.target.value)}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          className="w-full py-2 mt-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={handleUpdateTrainer}
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default ChangeTrainerRole;
