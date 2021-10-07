const ImageCarousel = ({ children }) => {
  return (
    <div className={"relative h-full"}>
      <div className={"flex flex-row justify-center items-center h-full"}>
        {children}
      </div>
    </div>
  );
};

export default ImageCarousel;
