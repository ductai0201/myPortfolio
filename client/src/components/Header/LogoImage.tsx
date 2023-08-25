type LogoProps = {
  href?: string;
  imgSrc?: string;
};

const LogoImage = ({ href, imgSrc }: LogoProps) => {
  return (
    <>
      <div className="max-w-full px-4 w-60">
        <a href={href} className="block w-full py-5">
          <img src={imgSrc} alt="logo" className="w-full" />
        </a>
      </div>
    </>
  );
};

export default LogoImage;
