"use client";

import { useState } from "react";
import { FiHeart } from "react-icons/fi";

const FavoriteButton = () => {
  const [favorite, setFavorite] = useState(false);

  function handleClick() {
    setFavorite(!favorite);
  }

  return (
    <div className="text-center space-y-1" onClick={handleClick}>
      <FiHeart
        fill={favorite ? "#fa003f" : "#FFFBF4"}
        stroke={favorite ? "#fa003f" : "#807E7E"}
        className="size-9 mx-auto"
      />
      <p
        className={`text-xs font-light ${
          favorite ? "text-[#fa003f]" : "text-gray-500"
        }`}
      >
        お気に入り
      </p>
    </div>
  );
};

export default FavoriteButton;
