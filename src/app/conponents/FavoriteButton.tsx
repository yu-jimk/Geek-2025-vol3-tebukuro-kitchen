"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

type FavoriteButtonProps = {
  id: number;
};

const FavoriteButton = ({ id }: FavoriteButtonProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const recipe_id: number = id; // パラメータのrecipe_idを取得

  const getFavoriteRecipeIds = (): number[] => {
    return JSON.parse(localStorage.getItem("favoriteRecipeIds") || "[]");
  };

  const saveFavoriteRecipeIds = (ids: number[]) => {
    localStorage.setItem("favoriteRecipeIds", JSON.stringify(ids));
  };

  // レンダリング時にlocalStorageを確認し、記事が既にお気に入りにあるかを判定
  useEffect(() => {
    const favoriteRecipeIds: number[] = getFavoriteRecipeIds();
    setIsFavorite(favoriteRecipeIds.includes(recipe_id));
    setLoading(false);
  }, [recipe_id]);

  // クリックイベント: お気に入りの状態を切り替え、localStorageを更新
  const handleFavoriteClick = () => {
    const favoriteRecipeIds: number[] = getFavoriteRecipeIds();

    if (isFavorite) {
      // お気に入りから削除
      const updatedFavorites: number[] = favoriteRecipeIds.filter(
        (id: number) => id !== recipe_id
      );
      saveFavoriteRecipeIds(updatedFavorites);
    } else {
      // お気に入りに追加
      saveFavoriteRecipeIds([...favoriteRecipeIds, recipe_id]);
    }

    // isFavoriteの状態を反転
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return null;
  }

  return (
    <div className="text-center space-y-1" onClick={handleFavoriteClick}>
      <FiHeart
        fill={isFavorite ? "#fa003f" : "#FFFBF4"}
        stroke={isFavorite ? "#fa003f" : "#807E7E"}
        className="size-9 mx-auto"
      />
      <p
        className={`text-xs font-light ${
          isFavorite ? "text-[#fa003f]" : "text-gray-500"
        }`}
      >
        お気に入り
      </p>
    </div>
  );
};

export default FavoriteButton;
