"use client";

import ChangeTrainerRole from "@/components/ChangeTrainerRole";
import SummaryApi from "@/services/SummaryApi";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";

interface Trainer {
    _id: string;
    name: string;
    email: string;
    phone?: string; // Chỉ dùng cho trainer
    specialization?: string; // Chỉ dùng cho trainer
    role: string;
    createdAt: string;
}

const TrainersPage = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [openUpdateTrainer, setOpenUpdateTrainer] = useState<boolean>(false);
  const [updateTrainerDetails, setUpdateTrainerDetails] = useState<Trainer | null>(null);

    const fetchTrainers = async () => {
        try {
          const response = await fetch(SummaryApi.getTrainers.url, {
            method: SummaryApi.getTrainers.method,
            credentials: "include",
          });
          const dataApi = await response.json();
    
          if (dataApi.success) {
            setTrainers(dataApi.data);
          } else {
            toast.error(dataApi.message);
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách HLV:", error);
          toast.error("Không thể tải danh sách HLV!");
        }
      };
    
      useEffect(() => {
        fetchTrainers();
      }, []);
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>#</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Chuyên môn</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {trainers.length > 0 ? (
            trainers.map((trainer, index) => (
              <tr key={trainer._id}>
                <td>{index + 1}</td>
                <td>{trainer.name}</td>
                <td>{trainer.email}</td>
                <td>{trainer.specialization || "N/A"}</td>
                <td>{trainer.phone || "N/A"}</td>
                <td className="capitalize">{trainer.role}</td>
                <td>{moment(trainer.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateTrainerDetails(trainer);
                      setOpenUpdateTrainer(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4">
                Không có huấn luyện viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal cập nhật trainer */}
      {openUpdateTrainer && updateTrainerDetails && (
        <ChangeTrainerRole
          onClose={() => setOpenUpdateTrainer(false)}
          trainerId={updateTrainerDetails._id}
          name={updateTrainerDetails.name}
          email={updateTrainerDetails.email}
          phone={updateTrainerDetails.phone}
          specialization={updateTrainerDetails.specialization}
          role={updateTrainerDetails.role}
          callFunc={fetchTrainers}
        />
      )}
    </div>
  );
};

export default TrainersPage;
