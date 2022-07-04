import { RefObject, useEffect, useState } from "react";
import { coord } from "./type";

export function useOffset(ref: RefObject<HTMLInputElement>): boolean | coord {
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const getOffset = (e: MouseEvent) => {
    setIsEnter(true);
    setX(e.offsetX);
    setY(e.offsetY);
  };

  const mouseLeave = () => {
    setIsEnter(false);
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener("mousemove", (e) => {
        getOffset(e);
      });
      ref.current.addEventListener("mouseleave", mouseLeave);
    }
  }, [ref]);

  return isEnter ? { x, y } : false;
}

export function useWindows(width: number, height: number): coord {
  const [size, setSize] = useState<coord>({ x: 0, y: 0 });

  const handleResize = () => {
    setSize({
      x: window.innerWidth - (width || 0),
      y: window.innerHeight - (height || 0),
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
