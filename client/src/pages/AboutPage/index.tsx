import line from "@/assets/lines.svg";

const About = () => {
  return (
    <>
      <div id="about" className="max-w-2xl mx-auto p-4">
        <h1 className="text-[24px] text-[#524aff] font-bold mb-4 text-center">
          ABOUT ME
        </h1>
        <img className="mx-auto" src={line} alt="" />
        <p className="text-[45px] mb-5 text-[#090E34] leading-tight font-bold text-center">
          Better design,
          <span> better experience</span>
        </p>

        <p className="text-[#474040] text-center">
          Hello, my name is Tai. I'm 20 years old, I'm a front-end developer
        </p>
      </div>
    </>
  );
};

export default About;
