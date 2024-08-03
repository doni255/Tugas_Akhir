import React from "react";

// Definisikan interface untuk props
interface BlogCardProps {
  img: string; // URL gambar
  title: string; // Judul blog
  date: string; // Tanggal publikasi
  comment: number; // Jumlah komentar
}

// Komponen BlogCard dengan TypeScript
const BlogCard: React.FC<BlogCardProps> = ({ img, title, date, comment }) => {
  return (
    <div className="space-y-4">
      <img
        className="rounded-lg hover:scale-105 transition-transform"
        src={img}
        alt="post"
      />
      <div className="text-accent font-medium">
        <span>{date} / </span>
        <span>{comment} Comments</span>
      </div>
      <h3 className="font-bold text-xl">{title}</h3>
    </div>
  );
};

export default BlogCard;
