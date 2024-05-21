import { useEffect, useState } from "react";
import { useCrypto } from "../crypto-managment/Context";
import { formatNumber } from "../hook/hooks";
import { Link } from "react-router-dom";

const WatchList = () => {
  const [watchListCoins, setWatchListCoins] = useState<any[]>([]);
  const { state, dispatch } = useCrypto();
  console.log(state.watchList)
  // useEffect(() => {
  //   const storedWatchList = JSON.parse(localStorage.getItem('watchList') || '[]');
  //   setWatchListCoins(storedWatchList);
  // }, []);

  // const closeWatchList = () => {
  //   dispatch({ type: 'IS_OPEN' });
  // };

  const removeFromWatchlist = (coinId: string) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: coinId });
  };

  return (
    <div className={`${state.isOpen ? " translate-x-0 transition shadow-lg shadow-zinc-700 bg-[#515151] p-4 fixed  overflow-y-auto top-0 right-0 h-screen w-1/4  max-xl:w-2/5  max-md:w-2/4" : "hidden"}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl uppercase font-medium text-center">Watchlist</h1>
        <button onClick={() => dispatch({ type: "IS_OPEN" })} className="text-white text-xl font-bold">&times;</button>
      </div>      {state.watchList ? (
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 px-2">
          {state.watchList.map((coin , index)=> (
            <div key={index} className="rounded-2xl max-sm:w-[180px] bg-[#14161A] ">
              <div className="flex items-center justify-center gap-2 flex-col" >
                <Link to={`/single/${coin.id}`} className="w-24 mt-4 h-24 flex justify-center items-center rounded-full">
                  <img src={coin.image} alt={coin.name} className="w-full h-full" />

                </Link>
                <div className="flex flex-col items-center gap-1">
                  <span className="uppercase text-lg text-white">{formatNumber(coin.market_cap)}</span>
                  <button className="bg-[#FF0000] text-white w-24 mb-2 " onClick={() => removeFromWatchlist(coin)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No coins in the watchlist</p>
      )}
    </div>
  );
};

export default WatchList;
