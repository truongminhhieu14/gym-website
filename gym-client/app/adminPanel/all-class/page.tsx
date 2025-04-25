"use client"

import AdminClassCard from "@/components/AdminClassCard";
import UploadClass from "@/components/UploadClass";
import SummaryApi from "@/services/SummaryApi";
import React, { useEffect, useState } from "react";

interface Rating {
  userId: string;
  content: string;
  stars: number;
}
// Define the type for a single class object
interface GymClass {
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

const AllClasses = () => {
  // State to handle the modal for uploading a new class
  const [openUploadClass, setOpenUploadClass] = useState<boolean>(false);

  // State to store all the fetched gym classes
  const [allClasses, setAllClasses] = useState<GymClass[]>([]);

  // Function to fetch all gym classes
  const fetchAllClasses = async () => {
    try {
      const response = await fetch(SummaryApi.allClasses.url);
      const dataResponse = await response.json();
      console.log("Classes data:", dataResponse);
      setAllClasses(dataResponse?.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lớp:", error);
    }
  };

  // Fetch the classes once on component mount
  useEffect(() => {
    fetchAllClasses();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Tất cả lớp tập gym</h2>
        <button
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadClass(true)}
        >
          Thêm lớp mới
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allClasses.map((gymClass) => (
          <AdminClassCard
            key={gymClass._id}
            data={gymClass}
            fetchData={fetchAllClasses}
          />
        ))}
      </div>

      {openUploadClass && (
        <UploadClass
          onClose={() => setOpenUploadClass(false)}
          fetchData={fetchAllClasses}
        />
      )}
    </div>
  );
};

export default AllClasses;
