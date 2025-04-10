"use client";

import uploadImage from "@/constants/uploadImage";
import SummaryApi from "@/services/SummaryApi";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminCreateBlogForm = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    slug: "",
    img: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadResult = await uploadImage(file);

    if (uploadResult.url) {
      setForm({ ...form, img: uploadResult.url });
    } else {
      toast.error(uploadResult.error || "Lỗi khi tải ảnh.");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(SummaryApi.createBlogs.url, {
        method: SummaryApi.createBlogs.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`, // JWT từ cookie
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("fetchdata", data)

      if (res.ok) {
        toast.success("Blog đã được tạo thành công!");
        setForm({
          title: "",
          date: "",
          slug: "",
          img: "",
          content: "",
        });
      } else {
        toast.error(data.message || "Lỗi khi tạo blog.");
      }
    } catch (err) {
      toast.error("Lỗi server.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Tạo Blog Mới</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Tiêu đề"
        className="w-full border mb-3 p-2 rounded"
      />
      <input
        name="date"
        value={form.date}
        onChange={handleChange}
        placeholder="Ngày (yyyy-mm-dd)"
        className="w-full border mb-3 p-2 rounded"
      />
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug (ví dụ: bai-viet-tap-the-hinh)"
        className="w-full border mb-3 p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleUploadImage}
        className="w-full border mb-3 p-2 rounded"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Nội dung blog"
        rows={10}
        className="w-full border mb-4 p-2 rounded resize-y"
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Đăng bài
      </button>
    </form>
  );
};

export default AdminCreateBlogForm;
