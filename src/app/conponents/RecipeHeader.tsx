import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

type RecipeHeaderProps = {
  bgColor: string;
  textColor: string;
  title: string;
  link: string;
};

const RecipeHeader = (props: RecipeHeaderProps) => {
  const { bgColor, textColor, title, link } = props;
  return (
    <header
      className={`sticky top-0 w-full flex items-center p-6 border-b border-gray-400 shadow-md ${bgColor} z-50`}
    >
      <Link href={link} className="absolute left-5 text-3xl">
        <IoIosArrowBack />
      </Link>
      <p className={`flex-1 text-center text-xl font-semibold ${textColor}`}>
        {title}
      </p>
    </header>
  );
};

export default RecipeHeader;
