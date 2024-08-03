import BlogCard from "./BlogCard";

const data = [
  {
    img: "https://optimapart.com/asset/images/sliden_ban_03_mob.jpg",
    title: "Generator",
    date: "Aug 27 2023",
    comment: 8,
  },
  {
    img: "https://optimapart.com/asset/images/sliden_ban_03_mob.jpg",
    title: "Generator",
    date: "Aug 26 2023",
    comment: 8,
  },
  {
    img: "https://optimapart.com/asset/images/sliden_ban_03_mob.jpg",
    title: "Generator",
    date: "Aug 25 2023",
    comment: 8,
  },
];

const BlogSection = () => {
  return (
    <div className="container pt-16">
      <h2 className="font-bold text-2xl">Latest News</h2>
      <p className="text-gray-500">
        Best Product with highly performance on our generators
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8">
        {data.map((el) => (
          <BlogCard
            key={el.date}
            img={el.img}
            title={el.title}
            date={el.date}
            comment={el.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
