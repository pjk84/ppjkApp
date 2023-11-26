import { dir } from "console";
import { size } from "../styles/devices";
import { useEffect, useRef, useState } from "react";
import { FlexBox } from "../styles/containers";

const Squares = () => {
  var maxSquareSize = 100;
  const [squareSize, setSize] = useState(100);
  const [coords, setCoords] = useState([0, 0]);
  const [mouseCoords, setMouseCoords] = useState([0, 0]);
  const [direction, setDirection] = useState([1, 1]);
  const [color, setColor] = useState(getRandomColor());
  const [grabbed, setGrabbed] = useState(false);
  const [collisionCounter, setCollisionCounter] = useState(0);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  var ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (grabbed) {
      return;
    }
    var rect = ref.current;
    if (rect == null) {
      return;
    }
    var right = rect?.offsetWidth;
    var bottom = rect?.offsetHeight;
    var collision = false;
    const intervalId = setInterval(() => {
      //horizontal collision
      if (
        (coords[0] < 0 && direction[0] == -1) ||
        (coords[0] + squareSize >= right! && direction[0] == 1)
      ) {
        // flip horizontaldirection
        collision = true;
        setDirection((d) => [d[0] * -1, d[1]]);
      }

      // vertical collision
      if (
        (coords[1] < 0 && direction[1] == -1) ||
        (coords[1] + squareSize >= bottom! && direction[1] == 1)
      ) {
        collision = true;
        // flip horizontaldirection
        setDirection((d) => [d[0], d[1] * -1]);
      }
      if (collision) {
        setColor(getRandomColor());
        setCollisionCounter(200);
      } else {
        setCollisionCounter(collisionCounter - 1);
      }

      setCoords((coords) => [
        coords[0] + direction[0],
        coords[1] + direction[1],
      ]);
    }, 2);
    return () => {
      clearInterval(intervalId);
    };
  }, [coords, direction, grabbed]);

  const intersects = (x: number, y: number) => {
    return (
      x > coords[0] &&
      x < coords[0] + squareSize &&
      y > coords[1] &&
      y < coords[1] + squareSize
    );
  };

  const getCoords = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    const parent = ref.current?.getBoundingClientRect();
    if (!parent) return;

    let x: number;
    let y: number;

    if ("touches" in event) {
      // Touch event
      x = event.touches[0].clientX - parent.left;
      y = event.touches[0].clientY - parent.top;
    } else {
      // Mouse event
      x = event.clientX - parent.left;
      y = event.clientY - parent.top;
    }

    if (intersects(x, y)) {
      setGrabbed(true);
      return;
    }
    setGrabbed(false);
  };

  const move = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!grabbed) return;
    const parent = ref.current?.getBoundingClientRect();
    if (!parent) return;

    var right = parent.right - parent.left;
    var bottom = parent.bottom - parent.top;
    //cursor x
    let x: number;
    let y: number;

    if ("touches" in event) {
      // Touch event
      x = event.touches[0].clientX - parent.left;
      y = event.touches[0].clientY - parent.top;
    } else {
      // Mouse event
      x = event.clientX - parent.left;
      y = event.clientY - parent.top;
    }

    var rectX = x - squareSize / 2;
    var rectY = y - squareSize / 2;

    // rect should not clip on wall collision
    //left
    if (rectX <= 0) {
      rectX = 0;
    }

    // right
    if (rectX + squareSize >= right) {
      rectX = right - squareSize;
    }

    //top
    if (rectY <= 0) {
      rectY = 0;
    }

    //bottom
    if (rectY + squareSize >= bottom) {
      rectY = bottom - squareSize;
    }

    var dirX = x == mouseCoords[0] ? direction[0] : x > mouseCoords[0] ? 1 : -1;
    var dirY = y == mouseCoords[1] ? direction[1] : y > mouseCoords[1] ? 1 : -1;

    setDirection((d) => [dirX, dirY]);
    setMouseCoords((c) => [x, y]);
    setCoords((c) => [rectX, rectY]);
  };

  const resize = (event: any) => {
    if (event.deltaY < 0) {
      // scrolled up, shrink rect.
      var s = squareSize - 10;
      if (s < 10) {
        s = 10;
      }
    } else {
      // scrolled down, increase rect size
      var s = squareSize + 10;
      if (s > maxSquareSize) {
        s = maxSquareSize;
      }
    }
    setSize(s);
  };

  return (
    <FlexBox
      gapSize={10}
      column
      style={{ height: "100%", position: "relative" }}
    >
      <FlexBox column gapSize={10}>
        <div>grab and move to change position and direction</div>
        <div>{`square size: ${squareSize} (scroll to change)`}</div>
      </FlexBox>
      <div
        ref={ref}
        onMouseDown={getCoords}
        onTouchStart={getCoords}
        onTouchMove={move}
        onMouseMove={move}
        onTouchEnd={() => setGrabbed(false)}
        onMouseUp={() => setGrabbed(false)}
        onWheel={resize}
        id="squares"
        style={{
          border:
            collisionCounter > 0
              ? `1px solid ${color}`
              : "1px solid transparent",
          transition: "1s",
          position: "relative",
          padding: 0,
          height: "100%",
        }}
      >
        <div
          style={{
            borderRadius: 4,
            position: "absolute",
            left: coords[0],
            top: coords[1],

            height: squareSize,
            width: squareSize,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </FlexBox>
  );
};

export default Squares;
