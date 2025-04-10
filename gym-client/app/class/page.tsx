"use client"

import SummaryApi from '@/services/SummaryApi';
import Image from 'next/image';
import {useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface classDetail {
  _id: string;
  className: string;
  trainerName: string;
  schedule: string;
  classImage: string[];
  description: string;
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
  return (
    <div className="max-w-7xl mx-auto p-6">
      {classDetail ? (
        <div className="flex flex-col lg:flex-row gap-8">
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
          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {classDetail.className}
            </h1>
            <div className="space-y-2">
              <p className="text-xl text-gray-700">
                <span className="font-semibold">Trainer:</span> {classDetail.trainerName}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Schedule:</span> {classDetail.schedule}
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {classDetail.description}
            </p>
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