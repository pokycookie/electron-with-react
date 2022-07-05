import { RefObject, useEffect, useState } from "react";
import { coord } from "./type";

export function useOffset(ref: RefObject<HTMLElement>): boolean | coord {
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

export function useWindows(DOM?: RefObject<HTMLElement>): coord {
  const [size, setSize] = useState<coord>({ x: 1, y: 1 });

  const handleResize = () => {
    setSize(
      DOM
        ? {
            x: DOM.current?.clientWidth || 1,
            y: DOM.current?.clientHeight || 1,
          }
        : {
            x: window.innerWidth || 1,
            y: window.innerHeight || 1,
          }
    );
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
}

export function useMouse(): boolean {
  const [result, setResult] = useState<boolean>(false);

  const mouseDown = () => {
    setResult(true);
  };
  const mouseUp = () => {
    setResult(false);
  };

  useEffect(() => {
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  });

  return result;
}
