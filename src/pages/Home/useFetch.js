import { useState, useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (data, setData) => {

  const callbackRef = useRef()
  const [curData, setCurData] = useState([])

  useEffect(() => {
    setData([...data, ...curData])
    // eslint-disable-next-line
  },[curData])

  const _setCallback = (func) => {
    callbackRef.current = func
  }

  useEffect(() => {

    window.addEventListener("scroll", eventlistner);
    return () => window.removeEventListener("scroll", eventlistner);
    // eslint-disable-next-line
  }, []);

  const eventlistner = useCallback(() => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      if(callbackRef.current){
        callbackRef.current(curData, setCurData)
      }
      return true
    }else{
      return false
    }
    // eslint-disable-next-line
  },[curData, setCurData])

  return [_setCallback];
};

export default useInfiniteScroll;
