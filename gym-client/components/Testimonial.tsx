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
    message:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Tram Anh Pham",
  },
  {
    img: "/assets/assets/img/testimonial/minhmanh.jpg",
    message:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Minh Minh Manh",
  },
  {
    img: "/assets/assets/img/testimonial/phuonganh.jpg",
    message:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Le Phuong Anh",
  },
  {
    img: "/assets/assets/img/testimonial/tramanh.jpg",
    message:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Tram Anh Pham",
  },
  {
    img: "/assets/assets/img/testimonial/minhmanh.jpg",
    message:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Minh Minh Manh",
  },
  {
    img: "/assets/assets/img/testimonial/phuonganh.jpg",
    message:
      "Completed Personal Trainer training program and fully meets the standards of knowledge, skills and professional ethics in the field of fitness.",
    name: "Le Phuong Anh",
  },
];

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { useEffect, useState } from "react";
import SummaryApi from "@/services/SummaryApi";
import { toast } from "react-toastify";
import uploadImage from "@/constants/uploadImage";
import Cookies from "js-cookie"

const Testimonial = () => {
  const [showForm, setShowForm] = useState(false);
  const [testimonial, setTestimonial] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const handleToggleForm = () => setShowForm(!showForm);

  const fetchTestimonial = async () => {
    try {
      const response = await fetch(SummaryApi.getAllTestimonial.url, {
        method: SummaryApi.getAllTestimonial.method,
      });
      const data = await response.json();
      console.log("Fetched testimonials:", data);
      setTestimonial(data.data || []);
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || !img) {
      toast.error("Please fill in the information and select a photo.");
      return;
    }
    try {
      const uploaded = await uploadImage(img);
      if (!uploaded?.url) {
        toast.error("Tải ảnh lên thất bại.");
        return;
      }

      const token = Cookies.get("token");

      const res = await fetch(SummaryApi.createTestimonial.url, {
        method: SummaryApi.createTestimonial.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          message,
          img: uploaded.url,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Gửi đánh giá thành công!");
        setName("");
        setMessage("");
        setImg(null);
        setShowForm(false);
        fetchTestimonial();
      } else {
        toast.error(result.message || "Lỗi khi gửi đánh giá.");
      }
    } catch (err) {
      toast.error("Lỗi kết nối khi gửi đánh giá.");
    }
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);
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
            {testimonial.map((person: any, index: number) => {
              return (
                <SwiperSlide className="h-full" key={index}>
                  <div className="flex flex-col justify-center items-center gap-6 text-center h-full">
                    <Image
                      src={person.img}
                      width={90}
                      height={90}
                      alt={person.name}
                      className="rounded-full border-2 border-accent"
                    />
                    <div className="flex flex-col justify-center items-center">
                      <FaQuoteLeft className="text-2xl text-gray-300" />
                      <p className="max-w-[380px] mb-4">{person.message}</p>
                      <span className="text-2xl text-center">
                        {person.name}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* Nút Đánh Giá */}
          <div className="text-center mt-8">
            <button
              onClick={handleToggleForm}
              className="bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-6 rounded-xl shadow transition"
            >
              {showForm ? "Close" : "Đánh giá"}
            </button>
          </div>

          {/* Form đánh giá đơn giản */}
          {showForm && (
            <div className="mt-6 max-w-md mx-auto bg-white shadow-xl p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-center">
                Gửi đánh giá
              </h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Tên bạn"
                  className="w-full mb-3 p-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  placeholder="Nội dung đánh giá"
                  className="w-full mb-3 p-2 border rounded"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <input
                  type="file"
                  className="mb-4"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImg(e.target.files[0]);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-2 rounded hover:bg-accent/90"
                >
                  Gửi đánh giá
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
