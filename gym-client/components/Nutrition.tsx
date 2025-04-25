"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import React, { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomButton from "./CustomButton";

const nutritionList = [
  {
    img: "/assets/assets/img/nutrition/nutrition1.jpg",
    name: "Protein Salad",
    message:
      "A high-protein salad perfect post-workout. Includes chicken breast, chickpeas, and fresh greens.",
  },
  {
    img: "/assets/assets/img/nutrition/nutrition1.jpg",
    name: "Healthy Smoothie",
    message:
      "Packed with banana, spinach, almond milk and a scoop of protein. Great for breakfast!",
  },
  {
    img: "/assets/assets/img/nutrition/nutrition1.jpg",
    name: "Balanced Bowl",
    message:
      "A perfect mix of quinoa, grilled tofu, veggies and avocado for a nutritious lunch.",
  },
];
const Nutrition = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [height, setHeight] = useState<number>(0); // Chiều cao
  const [weight, setWeight] = useState<number>(0); // Cân nặng
  const [bmi, setBmi] = useState<number | null>(null); // Chỉ số BMI

  const handleToggleForm = () => setShowForm(!showForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi dữ liệu đến backend ở đây (name, message, img)
    console.log({ name, message, img });
    setName("");
    setMessage("");
    setImg(null);
    setShowForm(false);
  };
  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
      const calculatedBmi = weight / ((height / 100) * (height / 100)); // Công thức tính BMI
      setBmi(calculatedBmi);
    }
  };
  return (
    <section className="py-12 xl:py-28 bg-black" id="nutrition">
      <div className="container mx-auto">
        <motion.h2
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="h2 text-center"
        >
          Nutrition Tips
        </motion.h2>
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Tháp Dinh Dưỡng */}
          <div className="flex flex-col items-center justify-center py-16">
            <div
              className="w-full max-w-4xl rounded-lg p-6 flex items-center justify-center relative overflow-hidden bg-white shadow-xl"
              onMouseEnter={() => setShowForm(false)} // Đảm bảo không che mất form nếu mở
            >
              {/* Hình ảnh */}
              <div className="flex flex-col justify-center items-center transition-all duration-500 ease-in-out hover:translate-x-[-45%] hover:h-[350px] h-[400px]">
                <img
                  src="/assets/assets/img/nutrition/thapdinhduong.png"
                  alt="Tháp Dinh Dưỡng"
                  className="w-full h-full object-contain"
                />
                <p className="text-center font-semibold mt-2">
                  THÁP DINH DƯỠNG
                </p>
              </div>

              {/* Layer bên phải */}
              <div className="absolute right-0 w-1/2 opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div className="layer p-3 mb-2 rounded w-full text-center shadow bg-base-200">
                  <p>
                    Cung cấp năng lượng, nhưng cần tiêu thụ một cách hạn chế.
                  </p>
                </div>
                <div className="layer p-3 mb-2 rounded w-full text-center shadow bg-base-200">
                  <p>
                    Cung cấp protein cần thiết cho sự phát triển và sửa chữa tế
                    bào.
                  </p>
                </div>
                <div className="layer p-3 mb-2 rounded w-full text-center shadow bg-base-200">
                  <p>
                    Cung cấp vitamin, khoáng chất, chất xơ và chất chống oxy
                    hóa.
                  </p>
                </div>
                <div className="layer p-3 rounded w-full text-center shadow bg-base-200">
                  <p>
                    Cung cấp năng lượng chính cho cơ thể thông qua carbohydrate.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{ clickable: true }}
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
            className="h-[360px]"
          >
            {nutritionList.map((item, index) => (
              <SwiperSlide className="h-full" key={index}>
                <div className="flex flex-col justify-center items-center gap-6 text-center h-full">
                  <Image
                    src={item.img}
                    width={90}
                    height={90}
                    alt={item.name}
                    className="rounded-full border-2 border-accent object-cover w-[90px] h-[90px]"
                  />
                  <div className="flex flex-col justify-center items-center text-white">
                    <p className="max-w-[380px] mb-4">{item.message}</p>
                    <span className="text-xl font-semibold">{item.name}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nút Gửi Gợi Ý Dinh Dưỡng */}
          <div className="text-center mt-8">
            <button
              onClick={handleToggleForm}
              className="bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-6 rounded-xl shadow transition"
            >
              {showForm ? "Đóng lại" : "Gửi công thức"}
            </button>
          </div>

          {/* Form gửi gợi ý */}
          {showForm && (
            <div className="mt-6 max-w-md mx-auto bg-white shadow-xl p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-center">
                Gửi công thức dinh dưỡng
              </h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Tên món / công thức"
                  className="w-full mb-3 p-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  placeholder="Mô tả chi tiết"
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
                  Gửi công thức
                </button>
              </form>
            </div>
          )}

          {/* BMI Input Form */}
          <form className="mt-6 text-center text-white">
            <h3 className="text-xl font-semibold mb-4">Tính chỉ số BMI</h3>
            <div className="">
              <label className="block mb-1 font-medium">Họ và tên</label>
              <input
                type="text"
                placeholder="Họ và tên"
                className="p-2 border rounded w-full text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="block mb-1 font-medium">Số điện Thoại</label>
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="p-2 border rounded w-full text-black"
                pattern="[0-9]{10,11}"
                title="Vui lòng nhập số điện thoại hợp lệ"
              />
              <label className="block mb-1 font-medium">Chiều cao</label>
              <input
                type="number"
                placeholder="Chiều cao (cm)"
                className="p-2 border rounded mb-3 w-full text-black"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
              <label className="block mb-1 font-medium">Cân nặng</label>
              <input
                type="number"
                placeholder="Cân nặng (kg)"
                className="p-2 border rounded mb-3 w-full text-black"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
              <div>

              <button
                onClick={calculateBMI}
                className="bg-accent text-white py-2 px-6 rounded-xl"
              >
                Tính BMI
              </button>
              </div>
            </div>

            {bmi !== null && (
              <div className="mt-4">
                <p className="font-semibold">Chỉ số BMI: {bmi.toFixed(2)}</p>
                <p>
                  {bmi < 18.5
                    ? "Thiếu cân"
                    : bmi < 24.9
                    ? "Cân đối"
                    : bmi < 29.9
                    ? "Thừa cân"
                    : "Béo phì"}
                </p>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Nutrition;
