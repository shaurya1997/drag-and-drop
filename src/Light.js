import React, { useEffect, useState } from "react";
import "./App.css";
const Light = ({ item, length,key }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="light"
      id={key}
      style={{ background: currentIndex === item.id ? item.color : "" }}
    ></div>
  );
};
export default Light;
