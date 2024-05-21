import { useCrypto } from '../crypto-managment/Context'
import '../style/style.css'
import eye from '../assets/images/Eye.svg'
import inwatchlist from '../assets/images/greenEYE.svg'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { useEffect } from 'react'
import { formatNumber, loadFromLocalStorage } from '../hook/hooks'
import { Link } from 'react-router-dom'

const CoinsTable = ({ searchQuery }: { searchQuery: string }) => {
    const { state, dispatch } = useCrypto();
    // const [filteredCoins, setFilteredCoins] = useState(state.allCoins);
  
    const Coins = state.allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
      );


    // useEffect(() => {
    //   const filtered = state.allCoins.filter((coin) =>
    //     coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    //   setFilteredCoins(filtered);
    //   dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 }); 
    // }, [searchQuery, state.allCoins, dispatch]);
  
    // const coinsPerPage = state.perPage;
    // const indexOfLastCoin = state.currentPage * coinsPerPage;
    // const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    // const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);
  
    // const paginate = (pageNumber: number) => dispatch({ type: 'SET_CURRENT_PAGE', payload: pageNumber });
  
 
    const toggleWatchlist = (coin : any) => {
        if (state.watchList && state.watchList.some(watchlistCoin => watchlistCoin.id === coin.id)) {
          dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: coin });
        } else {
          dispatch({ type: 'ADD_TO_WATCHLIST', payload: coin });
        }
      };


    useEffect(() => {
        const watchList = loadFromLocalStorage("watchList" || "[]");
        dispatch({ type: 'SET_WATCHLIST', payload: watchList });
      }, []);


      let currency: string;

      if (state.currency === "usd") {
          currency = "$"
      } else if (state.currency === "eur") {
          currency = "€"
      } else if (state.currency === "rub") {
          currency = "₽"
      } 
       else if (state.currency === "jpy") {
          currency = "¥"
      } 
      else {
          currency = "$"
      }
  

    return (
        <Table className='overflow-x-auto  whitespace-nowrap w-full'>
            <TableCaption className=''>
            </TableCaption>
            <TableHeader className='bg-[#87CEEB] '>
                <TableRow>
                    <TableHead className="w-[700px]">Coin</TableHead>
                    <TableHead >Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead className="text-right ">Market Cap</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Coins.map(coin => (

                        <TableRow key={coin.id} className='border-b '>

                            <TableCell className="font-medium ">

                                <Link to={`/single/${coin.id}`} className='flex items-center gap-3'>
                                    <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                                    <div className='flex flex-col'>
                                        <span className='uppercase text-xl text-white'>{coin.symbol}</span>
                                        <span className='text-[#A9A9A9] text-base'>{coin.name}</span>

                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell className='text-white'>{currency}{coin.current_price}</TableCell>
                            <TableCell> <div className='flex gap-3 items-center'>

                                <img
                                    src={state.watchList &&  state.watchList.some(watchlistCoin => watchlistCoin.id === coin.id) ? inwatchlist : eye}
                                    alt="watchlist-icon"
                                    onClick={() => toggleWatchlist(coin)}
                                    className='cursor-pointer'
                                />

                                {coin.price_change_percentage_24h > 0 ? (
                                    <span className='font-medium font text-green-500'>+ {coin.price_change_percentage_24h}%</span>
                                ) : (
                                    <span className='font-medium font text-red-500'>{coin.price_change_percentage_24h}%</span>
                                )}
                                {/* <button onClick={()=>toggleWatchlist(coin.id)}>
                                        {state.watchList.some(watchlistCoin => watchlistCoin.id === coin.id) ? (
                                                <img src={inwatchlist} alt="" />
                                            ) : (
                                              <img src={eye} alt="" />
                                            )
                                            }
                                        </button> */}
                            </div>

                            </TableCell>
                            <TableCell className="text-right text-white">{formatNumber(coin.market_cap)}</TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )
}

export default CoinsTable