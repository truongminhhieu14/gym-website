import React from "react";
import Image from "next/image";
import SUCCESSIMAGE from "../../public/assets/assets/img/success.gif";
const page = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center relative"
      style={{ backgroundImage: "url('/assets/assets/img/classes/gym.jpg')" }}
    >
      {/* Lớp phủ mờ phía sau */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="rounded-lg shadow-lg p-8 w-full max-w-md text-center relative z-10">
        <Image src={SUCCESSIMAGE} alt="" className="w-48 h-48 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-white mb-4">
          Thanh Toán Thành Công
        </h2>
        <p className="text-xl text-white mb-6">
          Chúc mừng! Bạn đã đăng ký thành công và gia nhập cộng đồng Gym của
          chúng tôi. Hãy bắt đầu hành trình khỏe mạnh!
        </p>

        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 px-4 rounded-full mb-4">
          <h3 className="text-lg font-semibold">Gói thành viên: Silver</h3>
          <p className="text-sm">
            Cảm ơn bạn đã chọn gói Silver. Bạn sẽ được truy cập vào tất cả các
            khu vực Gym và KickBoxing!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="/dashboard"
            className="border border-white py-3 px-6 text-white hover:bg-blue-700 rounded-lg text-xl transition duration-300"
          >
            Quay lại trang chủ
          </a>
          <a
            href="/membership"
            className="border border-white py-3 px-6 text-white hover:bg-teal-700 rounded-lg text-xl transition duration-300"
          >
            Xem thông tin gói thành viên
          </a>
        </div>

        <div className="mt-8">
          <p className="text-gray-500 text-sm">
            Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email:{" "}
            <a href="mailto:support@gym.com" className="text-blue-600">
              support@gym.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
