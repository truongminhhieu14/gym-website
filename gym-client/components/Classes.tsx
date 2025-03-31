"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import CustomButton from "./CustomButton";
import { div } from "framer-motion/client";

const classes = [
  {
    name: "body building",
    img: "/assets/assets/img/classes/bodybuilding.jpg",
    description:
      "Focus on building muscle through weight training and a scientific diet to get the most toned, balanced and aesthetic body.",
  },
  {
    name: "cardio",
    img: "/assets/assets/img/classes/cardio.jpg",
    description:
      "Cardiovascular exercise increases your heart rate, burns calories, and improves your respiratory system and endurance. Cardio is important for fat loss, improving cardiovascular health, and improving overall fitness..",
  },
  {
    name: "fitness",
    img: "/assets/assets/img/classes/fitness.jpg",
    description:
      "a lifestyle that promotes physical and mental health through exercise, nutrition, and rest.",
  },
  {
    name: "crossfit",
    img: "/assets/assets/img/classes/crossfit.jpg",
    description:
      "High-intensity interval training (HIIT) combines strength, conditioning, cardio, and functional movement exercises.",
  },
];
const Classes = () => {
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
                  <CustomButton
                    containerStyles="w-[164px] h-[46px]"
                    text="Read more"
                  />
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
