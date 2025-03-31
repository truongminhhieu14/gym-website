"use client";

import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { image, img } from "framer-motion/client";

const trainerData = [
  {
    image: "/assets/assets/img/trainers/tramanh.jpg",
    name: "Trâm Anh",
    role: "Body builder coach",
    description: "beautiful girl",
    social: [
      { icon: FaFacebook, href: "https://www.facebook.com/Chem1909" },
      { icon: FaInstagram, href: "https://www.instagram.com" },
      { icon: FaTiktok, href: "https://www.tiktok.com/@tramanh19092" },
    ],
  },
  {
    image: "/assets/assets/img/trainers/minhmanh.jpg",
    name: "Minh Minh Mạnh",
    role: "Body builder coach",
    description: "Handsome",
    social: [
      { icon: FaFacebook, href: "https://www.facebook.com/bopdepzai" },
      { icon: FaInstagram, href: "https://www.instagram.com" },
      { icon: FaTiktok, href: "https://www.tiktok.com/@decaffeine" },
    ],
  },
  {
    image: "/assets/assets/img/trainers/phuonganh.jpg",
    name: "Lê Phương Anh",
    role: "Body builder coach",
    description: "beautiful girl",
    social: [
      { icon: FaFacebook, href: "https://www.facebook.com/phuongganhh.le.5" },
      { icon: FaInstagram, href: "https://www.instagram.com" },
      { icon: FaTiktok, href: "https://www.tiktok.com/@phuonganhcun97" },
    ],
  },
  {
    image: "/assets/assets/img/trainers/david.jpg",
    name: "David Lee",
    role: "Body builder coach",
    description: "handsome",
    social: [
      { icon: FaFacebook, href: "https://www.facebook.com" },
      { icon: FaInstagram, href: "https://www.instagram.com" },
      { icon: FaTiktok, href: "https://www.tiktok.com" },
    ],
  },
];
const Team = () => {
  return (
    <section className="py-12 xl:h-[110vh]" id="team">
      <div className="container mt-auto h-full flex flex-col items-center justify-center">
        <motion.h2
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h2 text-center mb-6"
        >
          Our trainers
        </motion.h2>
        {/* trainers grid */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-12"
        >
          {trainerData.map((trainer, index) => {
            return (
              <div
                className="flex flex-col items-center text-center"
                key={index}
              >
                {/* image */}
                <div className="relative w-[320px] h-[360px] mx-auto mb-4">
                  <Image src={trainer.image} fill alt="" />
                </div>
                {/* name */}
                <h4 className="h4 mb-2">{trainer.name}</h4>
                {/* role */}
                <p className="uppercase text-xs tracking-[3px] mb-2">
                  {trainer.role}
                </p>
                {/* description */}
                <p className="mb-6 max-w-[320px] mx-auto">
                  {trainer.description}
                </p>
                {/* socials */}
                <div className="flex gap-12 justify-center">
                  {trainer.social.map((social, index) => {
                    return (
                      <div key={index}>
                        <Link
                          href={social.href}
                          className="hover:text-accent transition-all"
                        >
                          <social.icon className="text-lg" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.div>
        {/* btn */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <CustomButton
            containerStyles="w-[196px] h-[62px]"
            text="See all trainers"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
