import React from 'react'

type SingleImageProps = {
    href?: string,
    imgSrc?: string
}

const SingleImage = ({  imgSrc }:SingleImageProps) => {
    return (
      <>
          <img src={imgSrc} alt="hero image" className="max-w-full lg:ml-auto" />
      </>
    );
  };
  
export default SingleImage