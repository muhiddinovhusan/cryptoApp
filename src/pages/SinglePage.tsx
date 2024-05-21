import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "../components/CoinChart";

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

  if (loading) return <div>Loading...</div>;
if(error)return <div>Error</div>;
  return (
    <div className="flex flex-wrap max-md:flex-col  ">
      <div className="w-1/4 bg-red-50 max-md:w-full max-md:order-2">

      {coin ? (
        <div >
          <div className="w-52 h-52 flex justify-center  items-center">

          <img src={coin.image?.large} alt={coin.name} className="w-full h-full object-cover"/>
          </div>
          <h1>{coin.name}</h1>
          <p>{coin.description ? coin.description.en : "No description available"}</p>
          <p>Current Price: {coin.market_data?.current_price?.usd} USD</p>
          {/* Add more coin details as needed */}
        </div>
      ) : (
        <div>No coin data available</div>
      )}
      </div>
      <div className="w-3/4  max-md:w-full  max-md:order-1">
      <CoinChart id={id} timeRange={timeRange} />
        <div className="gap-3 px-8">
          <button
            className="text-white bg-[#87CEEB] w-1/4"
            onClick={() => handleTimeRangeChange("1")}
          >
            24 Hours
          </button>
          <button
            className="text-white bg-[#87CEEB] w-1/4"
            onClick={() => handleTimeRangeChange("30")}
          >
            30 Days
          </button>
          <button
            className="text-white bg-[#87CEEB] w-1/4"
            onClick={() => handleTimeRangeChange("90")}
          >
            3 Months
          </button>
          <button
            className="text-white bg-[#87CEEB] w-1/4"
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
