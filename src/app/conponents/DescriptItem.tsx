import Image from "next/image";
import { FiCameraOff } from "react-icons/fi";
const DescriptItem = () => {
  const imageExist: boolean = false;

  return (
    <div className="bg-white flex items-start justify-between p-1">
      <div className="flex-shrink-0">
        <p className="bg-orange-400 text-white size-4 flex items-center justify-center font-semibold text-xs rounded-sm">
          1
        </p>
      </div>
      <p className="pt-2 px-4 font-semibold text-xs">
        フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。
      </p>
      {imageExist ? (
        <Image
          src="https://picsum.photos/300"
          alt="フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。"
          width={72}
          height={72}
          className="my-auto"
        />
      ) : (
        <div className="bg-gray-100 p-6">
          <FiCameraOff size={24} stroke="#737373" />
        </div>
      )}
    </div>
  );
};

export default DescriptItem;
