"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { fadeIn } from '@/lib/variants';
import { useRouter } from 'next/navigation';
import SummaryApi from '@/services/SummaryApi';
import { toast } from 'react-toastify';


interface Trainer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  avatar: string; // Link ảnh đại diện
}

const TopTrainersPage = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(SummaryApi.getTrainers.url, {
          method: SummaryApi.getTrainers.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch trainers.");
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setTrainers(data.data);
          toast.success("Trainers loaded successfully!");
        } else {
          toast.error("No trainers found.");
        }
      } catch (error) {
        toast.error("Error fetching trainers.");
      }
    };

    fetchTrainers();
  }, []);

  return (
    <section className="pt-8 pb-14 lg:pb-28">
      <div className="container mx-auto">
        <motion.h2
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h2 text-center mb-8"
        >
          Top Trainers
        </motion.h2>

        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {trainers.length > 0 ? (
            trainers.map((trainer) => (
              <div
                key={trainer._id}
                className="border p-6 rounded-lg shadow-md flex flex-col items-center transition hover:shadow-lg cursor-pointer hover:scale-105"
                onClick={() => router.push(`/trainers/${trainer._id}`)}
              >
                <img
                  src={trainer.avatar || "/assets/assets/img/trainers/tramanh.jpg"}
                  alt={trainer.name}
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-center">
                  {trainer.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {trainer.specialization}
                </p>
                <p className="text-gray-500">{trainer.phone}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No trainers available</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TopTrainersPage;
