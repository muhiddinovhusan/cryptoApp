import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
// import BNB from '../assets/images/BNB.svg'
// import ETH from '../assets/images/ETH.svg'
// import SOL from '../assets/images/SOL.svg'
// import XRP from '../assets/images/XRP.svg'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel"
import { useCrypto } from "../crypto-managment/Context"
import useWindowSize from "../hook/hooks"

export function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({ delay: 1500, stopOnMouseEnter: true, stopOnInteraction: false })
    )

    const [coins, setCoins] = React.useState([]);
    const windowSize = useWindowSize(); // custom hookni chaqirish

    let currency: string;
    const { state } = useCrypto()

    if (state.currency === "usd") {
        currency = "$"
    } else if (state.currency === "eur") {
        currency = "€"
    } else if (state.currency === "rub") {
        currency = "₽"
    } else {
        currency = "$"
    }




    const getCoins = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${state.currency}&order=gecko_desc&per_page=${100}&page=${1}&sparkline=false&price_change_percentage=24h`);
            const data = await response.json();
            setCoins(data)
        } catch (error) {
            console.error('Failed to fetch coins data:', error);
        }
    };

    React.useEffect(() => {
        getCoins()
    }, [coins]);

    const groupArray = (data: any, size: any) => {
        const result = [];
        for (let i = 0; i < data.length; i += size) {
            result.push(data.slice(i, i + size));
        }
        return result;
    };

    const groupSize = windowSize.width <= 640 ? 3 : 4; 

    const groupedCoins = groupArray(coins, groupSize);


    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="w-full">
                {
                    groupedCoins.map((group, index) => (
                        <CarouselItem key={index} className="flex items-center justify-around">
                        {
                            group.map((coin) => (
                                <div key={coin.id} className='flex flex-col items-center gap-1 md:gap-3 cursor-pointer group'>
                                    <img src={coin.image} alt='cimage' className='w-12 h-12 md:w-20 md:h-20 transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-110' />
                                    <div className='text-center'>
                                        <p className='text-white font-medium uppercase text-xs sm:text-sm md:text-base leading-5 md:leading-6'>{coin.symbol.toUpperCase()}  {coin.price_change_percentage_24h > 0 ? (
                                    <span className='font-medium font text-green-500'>+ {coin.price_change_percentage_24h}%</span>
                                ) : (
                                    <span className='font-medium font text-red-500'>{coin.price_change_percentage_24h}%</span>
                                )}</p>
                                        <p className='font-semibold text-sm sm:text-base md:text-lg text-white leading-5 md:leading-6'> {currency} {coin.current_price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        }
    
    
                    </CarouselItem>
                    ))
                }
              


                {/* <CarouselItem className="flex items-center justify-around">
                    <div className='flex flex-col items-center gap-1 md:gap-3 cursor-pointer group'>
                        <img src={ETH} alt='cimage' className='w-12 h-12 md:w-20 md:h-20 transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-110' />
                        <div className='text-center'>
                            <p className='text-white font-medium uppercase text-xs sm:text-sm md:text-base leading-5 md:leading-6'>ETH <span className='text-green-400'>+1.66%</span></p>
                            <p className='font-semibold text-sm sm:text-base md:text-lg text-white leading-5 md:leading-6'>₹ 159,249.00</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-1 md:gap-3 cursor-pointer group'>
                        <img src={XRP} alt='cimage' className='w-12 h-12 md:w-20 md:h-20 transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-110' />
                        <div className='text-center'>
                            <p className='text-white font-medium uppercase text-xs sm:text-sm md:text-base leading-5 md:leading-6'>XRP <span className='text-green-400'>+3.21%</span></p>
                            <p className='font-semibold text-sm sm:text-base md:text-lg text-white leading-5 md:leading-6'>₹ 58.08</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-1 md:gap-3 cursor-pointer group'>
                        <img src={SOL} alt='cimage' className='w-12 h-12 md:w-20 md:h-20 transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-110' />
                        <div className='text-center'>
                            <p className='text-white font-medium uppercase text-xs sm:text-sm md:text-base leading-5 md:leading-6'>SOL <span className='text-green-400'>+2.45%</span></p>
                            <p className='font-semibold text-sm sm:text-base md:text-lg text-white leading-5 md:leading-6'>₹ 3,730.92</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-1 md:gap-3 cursor-pointer group'>
                        <img src={BNB} alt='cimage' className='w-12 h-12 md:w-20 md:h-20 transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-110' />
                        <div className='text-center'>
                            <p className='text-white font-medium uppercase text-xs sm:text-sm md:text-base leading-5 md:leading-6'>BNB <span className='text-green-400'>+1.68%</span></p>
                            <p className='font-semibold text-sm sm:text-base md:text-lg text-white leading-5 md:leading-6'>₹ 20,780.00</p>
                        </div>
                    </div>
                </CarouselItem> */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}