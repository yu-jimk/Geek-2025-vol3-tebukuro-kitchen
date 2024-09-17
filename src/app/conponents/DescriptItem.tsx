import Image from "next/image";
const DescriptItem = () => {
  return (
    <>
      <div className="bg-white flex justify-between p-1">
        {/* レスポンシブが小さくなると正方形じゃなく、縦長になる。 */}
        <p className="bg-orange-400 text-white size-4 aspect-square flex items-center justify-center font-semibold text-xs rounded-sm">
          1
        </p>
        <p className="pt-2 px-4 font-semibold text-xs">
          フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。
        </p>
        <Image src="/" alt="" width={71} height={67} className="my-auto" />
      </div>
    </>
  );
};

export default DescriptItem;
