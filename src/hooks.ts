import { RefObject, useEffect, useState } from "react";
import { Coord } from "./type";

interface useOffsetOption {
  width?: number;
  height?: number;
}

export function useOffset(
  ref: RefObject<HTMLElement>,
  options?: useOffsetOption
): false | Coord {
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const getOffset = (e: MouseEvent) => {
    setIsEnter(true);
    setX(e.clientX + (options?.width || 0));
    setY(e.clientY + (options?.height || 0));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return isEnter ? { x, y } : false;
}

export function useWindows(DOM?: RefObject<HTMLElement>): Coord {
  const [size, setSize] = useState<Coord>({ x: 1, y: 1 });

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

interface useMouseOption {
  target: boolean;
}
export interface useMouseReturn {
  isMouseDown: boolean;
  target: HTMLElement | null;
}

/** false: mouseUp, true: mouseDown */
export function useMouse(options?: useMouseOption): boolean | useMouseReturn {
  const [result, setResult] = useState<boolean | useMouseReturn>(false);

  const mouseDown = (e: Event) => {
    const target = e.target as HTMLElement;
    const result: boolean | useMouseReturn = options?.target
      ? { isMouseDown: true, target }
      : true;
    setResult(result);
  };
  const mouseUp = (e: Event) => {
    const target = e.target as HTMLElement;
    const result: boolean | useMouseReturn = options?.target
      ? { isMouseDown: false, target }
      : false;
    setResult(result);
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
