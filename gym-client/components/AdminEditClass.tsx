"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import DisplayImage from "./DisplayImage";
import uploadImage from "@/constants/uploadImage";
import SummaryApi from "@/services/SummaryApi";

// Define the type for class data
interface ClassData {
  _id: string;
  className: string;
  trainerName: string;
  schedule: string;
  classImage: string[];
  description: string;
}

interface AdminEditClassProps {
  onClose: () => void;
  classData: ClassData;
  fetchData: () => void;
}

const AdminEditClass: React.FC<AdminEditClassProps> = ({ onClose, classData, fetchData }) => {
  const [data, setData] = useState<ClassData>(classData);
  const [openFullScreenImage, setOpenFullScreenImage] = useState<boolean>(false);
  const [fullScreenImage, setFullScreenImage] = useState<string>("");

  useEffect(() => {
    if (classData) {
      setData(classData);
    }
  }, [classData]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadClassImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedImage = await uploadImage(file);
      setData(prev => ({
        ...prev,
        classImage: [...prev.classImage, uploadedImage.url],
      }));
    } catch (err) {
      toast.error("Lỗi khi tải ảnh lên.");
    }
  };

  const handleDeleteClassImage = (index: number) => {
    const updatedImages = [...data.classImage];
    updatedImages.splice(index, 1);
    setData(prev => ({
      ...prev,
      classImage: updatedImages,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(SummaryApi.updateClasses.url, {
        method: SummaryApi.updateClasses.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Cập nhật thành công.");
        onClose();
        fetchData();
      } else {
        toast.error(result.message || "Đã xảy ra lỗi.");
      }
    } catch (error) {
      toast.error("Lỗi kết nối đến máy chủ.");
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[90%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Chỉnh sửa lớp tập gym</h2>
          <button onClick={onClose} className="text-2xl hover:text-red-600">
            <CgClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-2 overflow-y-scroll h-full pb-5">
          <label htmlFor="className">Tên lớp tập:</label>
          <input
            type="text"
            id="className"
            name="className"
            value={data.className}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="trainerName" className="mt-3">Tên huấn luyện viên:</label>
          <input
            type="text"
            id="trainerName"
            name="trainerName"
            value={data.trainerName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="schedule" className="mt-3">Lịch học:</label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={data.schedule}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="classImage" className="mt-3">Hình ảnh lớp tập:</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex flex-col items-center gap-2">
                <span className="text-4xl"><FaCloudUploadAlt /></span>
                <p className="text-sm">Tải ảnh lớp tập lên</p>
              </div>
              <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadClassImage} />
            </div>
          </label>

          <div className="flex gap-2 mt-2 flex-wrap">
            {data.classImage.length > 0 ? (
              data.classImage.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`class-${index}`}
                    className="w-20 h-20 object-cover cursor-pointer border"
                    onClick={() => {
                      setFullScreenImage(url);
                      setOpenFullScreenImage(true);
                    }}
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hidden group-hover:block"
                    onClick={() => handleDeleteClassImage(index)}
                  >
                    <MdDelete />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-red-600 text-xs">*Vui lòng tải ảnh lớp tập lên</p>
            )}
          </div>

          <label htmlFor="description" className="mt-3">Mô tả:</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            className="h-28 bg-slate-100 border p-2 resize-none"
            placeholder="Nhập mô tả lớp tập"
            required
          />

          <button type="submit" className="px-3 py-2 bg-red-600 text-white mt-4 hover:bg-red-700">
            Cập nhật lớp tập
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => {
            setFullScreenImage("");
            setOpenFullScreenImage(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminEditClass;
