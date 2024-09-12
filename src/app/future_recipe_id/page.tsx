import { IoIosArrowBack } from "react-icons/io";

const RecipeId = () => {
  return (
    <header className="relative flex items-center p-6 border-b border-gray-400 shadow-md">
      <IoIosArrowBack className="absolute left-5 text-3xl" />
      <div className="flex-1 text-center text-xl font-semibold">
        基本のチャーハン
      </div>
    </header>
  );
};

export default RecipeId;
