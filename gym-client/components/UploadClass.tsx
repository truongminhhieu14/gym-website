"use client";

import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from "@/constants/uploadImage";
import { toast } from "react-toastify";
import DisplayImage from "./DisplayImage";
import SummaryApi from "@/services/SummaryApi";

interface ClassData {
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
}
const UploadClass: React.FC<{ onClose: () => void; fetchData: () => void }> = ({
  onClose,
  fetchData,
}) => {
  const [data, setData] = useState<ClassData>({
    className: "",
    trainerName: "",
    schedule: "",
    classImage: [],
    description: "",
    duration: 0,
    maxParticipants: 0,
    currentParticipants: 0,
    status: "active",
    goals: [],
  });

  const [openFullScreenImage, setOpenFullScreenImage] =
    useState<boolean>(false);
  const [fullScreenImage, setFullScreenImage] = useState<string>("");

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]:
        name === "duration" || name === "maxParticipants"
          ? Number(value)
          : value,
    }));
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setData((prev) => {
      const goals = checked
        ? [...prev.goals, value]
        : prev.goals.filter((goal) => goal !== value);
      return { ...prev, goals };
    });
  };
  const handleUploadClassImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const { url, error } = await uploadImage(file);

    if (url) {
      // Cập nhật URL hình ảnh vào state
      setData((prev) => ({
        ...prev,
        classImage: [...(prev.classImage || []), url],
      }));
    } else {
      // Hiển thị lỗi cho người dùng
      console.error(error);
    }
  };
  const handleDeleteClassImage = (index: number) => {
    const newClassImage = [...data.classImage];
    newClassImage.splice(index, 1);
    setData((prev) => ({ ...prev, classImage: newClassImage }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.uploadClass.url, {
      method: SummaryApi.uploadClass.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    } else {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[90%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Thêm lớp tập gym</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          {/* Tên lớp */}
          <label htmlFor="className">Tên lớp:</label>
          <input
            type="text"
            id="className"
            name="className"
            value={data.className}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Huấn luyện viên */}
          <label htmlFor="trainerName" className="mt-2">
            Huấn luyện viên:
          </label>
          <input
            type="text"
            id="trainerName"
            name="trainerName"
            value={data.trainerName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Lịch học */}
          <label htmlFor="schedule" className="mt-2">
            Lịch học:
          </label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={data.schedule}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Duration */}
          <label htmlFor="duration" className="mt-2">
            Thời lượng (phút):
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={data.duration}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Max Participants */}
          <label htmlFor="maxParticipants" className="mt-2">
            Số lượng tối đa:
          </label>
          <input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={data.maxParticipants}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          {/* Status */}
          <label htmlFor="status" className="mt-2">
            Trạng thái:
          </label>
          <select
            id="status"
            name="status"
            value={data.status}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="active">Mở đăng ký</option>
            <option value="inactive">Đã đóng</option>
            <option value="cancelled">Đã hủy</option>
          </select>

          {/* Goals */}
          <label className="mt-2">Mục tiêu lớp học:</label>
          <div className="flex flex-wrap gap-2">
            {[
              "Tăng cơ",
              "Giảm cân",
              "Sức bền",
              "Thư giãn",
              "Sức khỏe tổng thể",
            ].map((goal) => (
              <label key={goal} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  value={goal}
                  checked={data.goals.includes(goal)}
                  onChange={handleGoalChange}
                />
                {goal}
              </label>
            ))}
          </div>

          {/* Ảnh lớp */}
          <label className="mt-2">Ảnh lớp tập:</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Tải ảnh lớp tập</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadClassImage}
                />
              </div>
            </div>
          </label>

          {/* Hiển thị ảnh */}
          <div className="flex items-center gap-2 flex-wrap">
            {data.classImage.map((el, index) => (
              <div key={index} className="relative group">
                <img
                  src={el}
                  alt="Class"
                  width={80}
                  height={80}
                  className="bg-slate-100 border cursor-pointer"
                  onClick={() => {
                    setOpenFullScreenImage(true);
                    setFullScreenImage(el);
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                  onClick={() => handleDeleteClassImage(index)}
                >
                  <MdDelete />
                </div>
              </div>
            ))}
          </div>

          {/* Mô tả */}
          <label htmlFor="description" className="mt-2">
            Mô tả:
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Mô tả lớp tập"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            required
          ></textarea>

          {/* Nút Submit */}
          <button className="px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 mt-4 mb-10 rounded">
            Thêm lớp tập
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadClass;
