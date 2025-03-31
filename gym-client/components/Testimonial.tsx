"use client";

import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa6";

//import swiper components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper/modules";

// swiper styles
import "swiper/css";
import "swiper/css/pagination";

const testimonialData = [
  {
    img: "/assets/assets/img/testimonial/tramanh.jpg",
    massage:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Tram Anh Pham",
  },
  {
    img: "/assets/assets/img/testimonial/minhmanh.jpg",
    massage:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Minh Minh Manh",
  },
  {
    img: "/assets/assets/img/testimonial/phuonganh.jpg",
    massage:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Le Phuong Anh",
  },
  {
    img: "/assets/assets/img/testimonial/tramanh.jpg",
    massage:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Tram Anh Pham",
  },
  {
    img: "/assets/assets/img/testimonial/minhmanh.jpg",
    massage:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Minh Minh Manh",
  },
  {
    img: "/assets/assets/img/testimonial/phuonganh.jpg",
    massage:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Le Phuong Anh",
  },
];

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
const Testimonial = () => {
  return (
    <section className="py-12 xl:py-28" id="testimonial">
      <div className="container mx-auto">
        <motion.h2
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h2 text-center"
        >
          Our Testimonial
        </motion.h2>
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="h-[320px]"
          >
            {testimonialData.map((person, index) => {
              return (
                <SwiperSlide className="h-full" key={index}>
                  <div className="flex flex-col justify-center items-center gap-6 text-center h-full">
                    <Image
                      src={person.img}
                      width={90}
                      height={90}
                      alt=""
                      className="rounded-full border-2 border-accent"
                    />
                    <div className="flex flex-col justify-center items-center">
                      <FaQuoteLeft className="text-2xl text-gray-300" />
                      <p className="max-w-[380px] mb-4">{person.massage}</p>
                      <span className="text-2xl text-center">
                        {person.name}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
