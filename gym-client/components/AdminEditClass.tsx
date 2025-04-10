"use client"

import React, { useState, ChangeEvent, FormEvent } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import DisplayImage from "./DisplayImage";
import uploadImage from "@/constants/uploadImage";
import SummaryApi from "@/services/SummaryApi";

// Define the type for class data
interface ClassData {
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
  const [data, setData] = useState<ClassData>({
    ...classData,
    className: classData?.className,
    trainerName: classData?.trainerName,
    schedule: classData?.schedule,
    classImage: classData?.classImage || [],
    description: classData?.description,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState<boolean>(false);
  const [fullScreenImage, setFullScreenImage] = useState<string>("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadClassImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImage = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        classImage: [...prev.classImage, uploadedImage.url],
      }));
    }
  };

  const handleDeleteClassImage = (index: number): void => {
    const newClassImage = [...data.classImage];
    newClassImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      classImage: [...newClassImage],
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateClasses.url, {
      method: SummaryApi.updateClasses.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Chỉnh sửa lớp tập gym</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          <label htmlFor="className">Tên lớp tập:</label>
          <input
            type="text"
            id="className"
            placeholder="Nhập tên lớp tập"
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
            placeholder="Nhập tên HLV"
            value={data.trainerName}
            name="trainerName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="schedule" className="mt-3">Lịch học:</label>
          <input
            type="text"
            id="schedule"
            placeholder="Nhập lịch học"
            value={data.schedule}
            name="schedule"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="classImage" className="mt-3">Hình ảnh lớp tập:</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Tải ảnh lớp tập lên</p>
                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadClassImage} />
              </div>
            </div>
          </label>
          
          <div>
            {data?.classImage[0] ? (
              <div className="flex items-center gap-2">
                {data.classImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt="class-image"
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
            ) : (
              <p className="text-red-600 text-xs">*Vui lòng tải ảnh lớp tập lên</p>
            )}
          </div>

          <label htmlFor="description" className="mt-3">Mô tả:</label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Nhập mô tả lớp tập"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          />

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">Cập nhật lớp tập</button>
        </form>
      </div>

      {/** Hiển thị ảnh ở chế độ toàn màn hình */}
      {openFullScreenImage && <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />}
    </div>
  );
};

export default AdminEditClass;
