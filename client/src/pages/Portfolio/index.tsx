import { useGetAllProjectQuery } from "@/api/Project";
import { useGetAllTagQuery } from "@/api/Tag";
import PortfolioCard from "@/components/PortfolioCard";
import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const { data: allProject }: any = useGetAllProjectQuery();
  const { data: tagColection }: any = useGetAllTagQuery();
  const [showCard, setShowCard] = useState([]);
  useEffect(() => {
    if (allProject) setShowCard(allProject.dataProject);
  }, [allProject]);

  const handleProject = (category: React.SetStateAction<string>) => {
    if (category == "all") {
      setShowCard(allProject?.dataProject);
    } else {
      setShowCard(
        allProject.dataProject.filter((project: any) =>
          project.tagId.includes(category)
        )
      );
    }
  };
  return (
    <>
      <section id="portfolio" className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                <span className="block mb-2 text-lg font-semibold text-primary">
                  Our Portfolio
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                  Our Recent Projects
                </h2>
                <p className="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-center mx-4">
            <div className="w-full px-4">
              <ul className="flex flex-wrap justify-center mb-12 space-x-3">
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("all")}
                    className={`inline-block hover:bg-[#5182f0] rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 
                    bg-[#4467d7] rounded-lg text-white
                    `}
                  >
                    All Projects
                  </button>
                </li>
                {tagColection?.dataTag.map((item: any) => (
                  <li key={item._id} className="mb-1">
                    <button
                      onClick={() => handleProject(item._id)}
                      className={`inline-block hover:bg-[#5182f0] rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8  bg-[#4467d7] rounded-lg text-white
                        `}
                    >
                      {item?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap mx-4">
            {showCard?.map((item: any) => {
              const tagName = item?.tagId.map((tagId: any) => {
                const tag = tagColection?.dataTag.find(
                  (itemTag: any) => itemTag._id == tagId
                );
                if (tag) return tag.name;
              });
              return (
                <PortfolioCard
                  key={item._id}
                  ImageHref={item.gallery}
                  category={tagName}
                  title={item.name}
                  button="View Details"
                  buttonHref="#"
                  showCard={showCard}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
