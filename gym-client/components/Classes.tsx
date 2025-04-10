"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import CustomButton from "./CustomButton";
import Link from "next/link";

const classes = [
  {
    name: "gym",
    img: "/assets/assets/img/classes/gym.jpg",
    description:
      "Enhance your physical strength and overall fitness with guided workouts using free weights and machines. Ideal for building muscle, endurance, and improving body composition.",
  },
  {
    name: "yoga",
    img: "/assets/assets/img/classes/yoga.jpg",
    description:
      "A mindful practice that combines breathing techniques, meditation, and poses to improve flexibility, reduce stress, and enhance mental clarity and body awareness., and improves your respiratory system and endurance. Cardio is important for fat loss, improving cardiovascular health, and improving overall fitness..",
  },
  {
    name: "pilates",
    img: "/assets/assets/img/classes/pilates.jpg",
    description:
      "Strengthen your core, improve posture, and develop a lean, balanced body with controlled, low-impact movements focused on alignment and flexibility.",
  },
  {
    name: "kick boxing",
    img: "/assets/assets/img/classes/kickboxing.jpg",
    description:
      "A high-energy workout that blends martial arts techniques and cardio to boost stamina, coordination, and burn calories while relieving stress.",
  },
];
const Classes = () => {
  const handleClick = (className: string) => {
    console.log("Class clicked:", className); // Hành động bổ sung (nếu cần)
  };
  return (
    <section id="class">
      <motion.div
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2"
      >
        {classes.map((item, index) => {
          return (
            <div
              className="relative w-full h-[300px] lg:h-[485px] flex flex-col justify-center items-center"
              key={index}
            >
              {/* overlay */}
              <div className="bg-black/50 absolute w-full h-full top-0 z-10 "></div>
              <Image src={item.img} fill className="object-cover" alt="" />
              {/* text & btn */}
              <div className="z-30 max-w-[380px] text-center flex flex-col items-center justify-center gap-4">
                <motion.h3
                  variants={fadeIn("up", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="h3 text-accent"
                >
                  {item.name}
                </motion.h3>
                <motion.p
                  variants={fadeIn("up", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="text-white "
                >
                  {item.description}
                </motion.p>
                <motion.div
                  variants={fadeIn("up", 0.8)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <Link href={{
                      pathname: "/class",
                      query: { className: item.name},
                    }}>
                    <CustomButton
                      containerStyles="w-[164px] h-[46px]"
                      text="Read more"
                      onClick={()=>handleClick(item.name)}
                    
                    />
                  </Link>
                </motion.div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Classes;
