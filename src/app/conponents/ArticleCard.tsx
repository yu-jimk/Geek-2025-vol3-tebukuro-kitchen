import React from "react";
import Link from "next/link";
import Image from "next/image";

  const ArticleCard = () => {
    return (
      <div className="py-3 px-6  bg-orange-100 " >
        <Link href={'/aaa'}>
        <div className="relative rounded-t-xl overflow-hidden"style={{ position: 'relative', aspectRatio: '4 / 5' }}>
        <Image 
            src={`/red_fish.jpg`}
            layout="fill"
        objectFit="cover"  // 親要素に合わせてトリミング
            alt=""
            />
            </div>
        <div className=" border-t-4 border-orange-500 rounded-b-xl bg-white">
            aiueoaaaaaazaaaa
            aaaaaaaaaasdserf
            aaaaaaa
        </div>
        </Link>
      </div>
    );
  };
  
  export default ArticleCard;