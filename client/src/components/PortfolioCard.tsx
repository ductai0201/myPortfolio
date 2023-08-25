const PortfolioCard = ({
  category,
  ImageHref,
  title,
  button,
  buttonHref,
}: any) => {
  return (
    <>
      <div className={`w-full px-4 md:w-1/2 xl:w-1/3`}>
        <div className="relative mb-12">
          <div className="overflow-hidden rounded-lg">
            <img src={ImageHref} alt="portfolio" className="w-full" />
          </div>
          <div className="relative z-10 px-3 -mt-20 text-center bg-white rounded-lg shadow-lg mx-7 py-9">
            <span className="block mb-2 text-sm font-semibold text-primary">
              {Object.values(category).join(" - ")}
            </span>
            <h3 className="mb-4 text-xl font-bold text-dark">{title}</h3>
            <a
              href={buttonHref}
              className="inline-block py-3 text-sm font-semibold transition border rounded-md px-7 text-body-color hover:text-white hover:bg-[#4467d7]"
            >
              {button}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioCard;
