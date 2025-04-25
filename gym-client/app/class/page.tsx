"use client"

import SummaryApi from '@/services/SummaryApi';
import Image from 'next/image';
import {useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface Rating {
  userId: string;
  content: string;
  stars: number;
}
interface classDetail {
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
const ClassesPage = () => {
  const [classDetail, setClassDetail] = useState<classDetail | null>(null);
  const searchParams = useSearchParams();
  const className = searchParams.get('className');

  useEffect(() => {
    if (className) {
      const fetchClassDetail = async () => {
        try {
          const response = await fetch(
           `${SummaryApi.getClassDetail.url}/${encodeURIComponent(className)}`,
            {
              method: SummaryApi.getClassDetail.method,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        
          const data = await response.json();
          console.log("Fetched class data:", data);
          if (data.success) {
            setClassDetail(data.data);
          } else {
            toast.success('Class not found');
          }
        } catch (err) {
          toast.error('An error occurred while fetching class details');
        }
      };

      fetchClassDetail();
    }
  }, [className]);
  const averageRating = (ratings: Rating[]) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r.stars, 0);
    return (total / ratings.length).toFixed(1);
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      {classDetail ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Ảnh lớp học */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={classDetail.classImage[0]}
                alt={classDetail.className}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Thông tin lớp học */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {classDetail.className}
            </h1>
            <div className="space-y-2 text-lg text-gray-700">
              <p><span className="font-semibold">Trainer:</span> {classDetail.trainerName}</p>
              <p><span className="font-semibold">Schedule:</span> {classDetail.schedule}</p>
              <p><span className="font-semibold">Duration:</span> {classDetail.duration}h</p>
              <p><span className="font-semibold">Participants:</span> {classDetail.currentParticipants}/{classDetail.maxParticipants}</p>
              <p><span className="font-semibold">Status:</span> {classDetail.status}</p>
              <p><span className="font-semibold">Average Rating:</span> {averageRating(classDetail.ratings)} ⭐</p>
            </div>
            <p className="text-gray-600 leading-relaxed">{classDetail.description}</p>

            {classDetail.goals.length > 0 && (
              <div>
                <p className="font-semibold text-gray-800">Goals:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {classDetail.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Join Class
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 italic">Loading class details...</p>
        </div>
      )}
    </div>
  )
}

export default ClassesPage