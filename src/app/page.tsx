import Header from "./conponents/Header";


export default function Home() {
  const nem :number[] =  [1,2,3,4,5,6,7,8,9,0,11,12,13,14,1,5,6,7,8,9]

  return (
    <div>
      <Header />
      <div className="grid grid-cols-2">
      {nem.map((value) => (
              <div>{value}</div>
          ))}
      </div>
    </div>
  );
}
