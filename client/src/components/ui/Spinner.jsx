import React from "react";

const Spinner = ({
  size = "md",
  color = "border-gray-400",
  speed = "animate-spin",
}) => {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  };

  return (
    <div className="flex h-screen w-full items-center justify-center absolute">
      <div className="flex flex-col space-y-3">
        <div
          className={`rounded-full border-4 border-t-transparent ${color} ${sizeMap[size]} ${speed}`}
        />
      </div>
    </div>
  );
};

export default Spinner;
