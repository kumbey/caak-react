import { useState, useEffect } from "react";

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log("called back");
    });
  }, [callback, isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    console.log("Fetch more list items!");
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
