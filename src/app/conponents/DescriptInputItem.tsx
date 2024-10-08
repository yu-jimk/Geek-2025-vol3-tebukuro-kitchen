import { BiCameraOff } from "react-icons/bi";

export const DescriptInputItem = () => {
  return (
    <div className="">
      <div className="bg-gray-200 h-32 shadow-md flex justify-center items-center mb-4">
        <BiCameraOff className="text-gray-400 text-2xl" />
      </div>

      <div className="flex bg-white">
        <p className="flex-shrink-0 bg-orange-400 text-white size-4 flex items-center justify-center font-semibold text-xs rounded-sm m-1">
          1
        </p>
        {/* テキストエリア1 */}
        <textarea
          className="h-16 w-full pt-1 text-[10px]"
          placeholder="フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。"
        />
      </div>
    </div>
  );
};
