"use client";

import { FaUsers } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { FaDumbbell } from "react-icons/fa6";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";


//components
import Achievements from "./Achievements";
import { useRouter } from "next/navigation";



const About = () => {
  const router = useRouter();
  const featured = [
    {
      icon: <FaUsers />,
      title: "Top Coach",
      subtitle:
        "Good trainers will help you achieve your fitness goals quickly.",
      onclick: () => router.push("top-trainers"),
    },
    {
      icon: <IoIosPricetag />,
      title: "Reasonable price",
      subtitle:
        "Flexible training packages to suit every budget.",
    },
    {
      icon: <FaDumbbell />,
      title: "modern equipment",
      subtitle:
        "Advanced exercise machine system supports maximum training.",
    },
  ];
  
  return (
    <section className="pt-8 pb-14 lg:pb-28" id="about">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-2 mb-8">
          <motion.h2
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="h2 text-center"
          >
            About us
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="max-w-[600px] mx-auto text-center"
          >
            Bringing you a comprehensive fitness experience, ensuring both
            physical and mental health
          </motion.p>
        </div>
        {/* featured items */}
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-16"
        >
          {featured.map((feature, index) => {
            return (
              <div
                className={`flex flex-col justify-center items-center gap-4 border p-10 
                  ${feature.onclick ? "cursor-pointer hover:bg-gray-100 transition" : ""}`}
                onClick={feature.onclick}
                key={index}
              >
                <div className="text-4xl bg-primary-300 text-white w-[80px] h-[80px] rounded-full flex justify-center items-center">
                  {feature.icon}
                </div>
                <div className="flex flex-col justify-center items-center gap-2 text-center">
                  <h4 className="h4 text-accent">{feature.title}</h4>
                  <p>{feature.subtitle}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
        {/* achievements */}
        <motion.div
          variants={fadeIn("up", 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Achievements />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
