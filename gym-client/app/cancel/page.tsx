import React from "react";
import Image from "next/image";
import CANCELIMAGE from "../../public/assets/assets/img/cancel.gif";

const page = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/assets/img/classes/gym.jpg')" }}
    >
      <div className="rounded-lg shadow-lg p-8 w-full max-w-md text-center opacity-90">
        <Image src={CANCELIMAGE} alt="" className="mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-white mb-4">
          Thanh Toán Thất Bại
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          Rất tiếc, thanh toán của bạn không thành công. Vui lòng thử lại hoặc
          liên hệ với chúng tôi để được hỗ trợ.
        </p>

        <div className="bg-red-100 text-red-600 py-2 px-4 rounded-full mb-6">
          <h3 className="text-lg font-semibold">
            Lý do thất bại: Thanh toán không thể thực hiện.
          </h3>
          <p className="text-sm">
            Vui lòng kiểm tra lại thông tin thanh toán hoặc thử phương thức
            thanh toán khác.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="/membership"
            className="border border-white py-3 px-6 text-white  hover:bg-blue-700 rounded-lg text-xl transition duration-300"
          >
            Quay lại trang đăng ký
          </a>
          <a
            href="/contact"
            className="border border-white py-3 px-6 text-white hover:bg-teal-700 rounded-lg text-xl transition duration-300"
          >
            Liên hệ với chúng tôi
          </a>
        </div>

        <div className="mt-8">
          <p className="text-gray-500 text-sm">
            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua
            email:{" "}
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
