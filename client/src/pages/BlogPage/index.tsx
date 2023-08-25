import { useGetAllBlogQuery } from "@/api/Blog";
import BlogCard from "@/components/BlogCard";
import React from "react";

const Blog = () => {
  const { data }: any = useGetAllBlogQuery();

  return (
    <>
      <section id="blog" className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="block mb-2 text-lg font-semibold text-primary">
                  Our Blogs
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                  Our Recent News
                </h2>
                <p className="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            {data?.dataBlog.map((item: any) => (
              <BlogCard
                key={item._id}
                date="Dec 22, 2023"
                CardTitle={item.title}
                CardDescription={item.description}
                image={item.gallery}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
