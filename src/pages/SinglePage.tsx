import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "../components/CoinChart";
import { formatNumber } from "../hook/hooks";
import Loading from "../components/Loading";
import '../style/style.css'
const SinglePage : React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>("30");

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    console.log(range)
  };

  useEffect(() => {
    const getSingleCoin = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCoin(data);
      } catch (error : any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getSingleCoin();
    }
  }, [id]);

  if (loading) return <Loading/>;
if(error)return <Loading/>;
  return (
    <div className="flex flex-wrap max-md:flex-col  ">
      <div className=" w-2/5   max-md:w-full ">

      {coin ? (
       <div className='flex flex-col px-4 gap-5 lg:gap-10 border-b-2 border-r-0 max-md:mb-2 lg:border-b-0 lg:border-r-2 border-zinc-500 pb-5 sm:pb-8 lg:pr-8 w-full lg:w-[550px]'>
       <div className='flex flex-col items-center justify-center gap-2 sm:gap-5 lg:gap-10'>
         <img src={coin.image?.large} alt='coinimage' width={160} height={160} className="w-28 h-28 lg:h-40 lg:w-40" />
         <h1 className='text-white font-bold text-3xl ml-2 lg:text-5xl capitalize'>{coin.name}</h1>
       </div>
       <div>
         <p className='text-white text-sm lg:text-[15px] lg:leading-7 line-clamp-5 text-left sm:text-center  font  font-normal lg:text-left'>{coin.description?.en}</p>
       </div>
       <div className='flex flex-col gap-0 sm:gap-2 lg:gap-5 items-start sm:items-center lg:items-start'>
         <h1 className='text-white text-base sm:text-xl lg:text-2xl font-bold'>Rank: <span className='font-normal'>{coin.market_data?.market_cap_rank}</span></h1>
         <h1 className='text-white text-base sm:text-xl lg:text-2xl font-bold'>Current Price: <span className='font-normal'>$ {formatNumber(coin.market_data?.current_price?.usd || 0)}</span></h1>
         <h1 className='text-white text-base sm:text-xl lg:text-2xl font-bold'>Market Cap: <span className='font-normal'>$ {formatNumber(coin.market_data?.market_cap?.usd || 0)}</span></h1>
       </div>
     </div>
      ) : (
        <div>No coin data available</div>
      )}
      </div>
      <div className=" w-3/5 max-md:w-full overflow-x-hidden  max-md:mb-8   ">
      <CoinChart id={id} timeRange={timeRange} />
        <div className="gap-5 font text-sm  flex  ">
        <button
            className={`text-white w-1/4 border border-sky-300   rounded-md h-8 ${timeRange === "1" ? "bg-sky-300 text-black font-bold"  : ""}`}
            onClick={() => handleTimeRangeChange("1")}
          >
            24 Hours
          </button>
          <button
            className={`text-white border-sky-300 border rounded-md w-1/4 ${timeRange === "30" ? "bg-sky-300 text-black font-bold" : ""}`}
            onClick={() => handleTimeRangeChange("30")}
          >
            30 Days
          </button>
          <button
            className={`text-white border-sky-300 border rounded-md w-1/4 ${timeRange === "90" ? "bg-sky-300 text-black font-bold" : ""}`}
            onClick={() => handleTimeRangeChange("90")}
          >
            3 Months
          </button>
          <button
            className={`text-white border-sky-300 border rounded-md w-1/4 ${timeRange === "365" ? "bg-sky-300 text-black font-bold" : ""}`}
            onClick={() => handleTimeRangeChange("365")}
          >
            1 Year
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
