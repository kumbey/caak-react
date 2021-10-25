import { useEffect, useRef, useState } from "react";

export default function useObserver(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observerRef = useRef(
    new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))
  );

  useEffect(() => {
    if (ref.current) {
      observerRef.current.observe(ref.current);
    }
    // eslint-disable-next-line
  }, [ref.current]);

  return isIntersecting;
}
