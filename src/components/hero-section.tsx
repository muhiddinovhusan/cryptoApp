import '../style/style.css'
import { CarouselPlugin } from './carousel'
const Hero = () => {
  return (
    <div className="background  max-sm:w-full  pt-12 pb-5 ">
    <div className='flex flex-col w-full gap-10 center' >

      <div  className='font flex flex-col gap-4 '>
        <h1 className="uppercase text-sky-300 font-bold tracking-tight text-3xl text-center sm:text-4xl md:text-5xl lg:text-6xl">CRYPTOFOLIO WATCH LIST</h1>
        <p className="text-center text-sm font-semibold tracking-wide text-gray-500 capitalize">Get all the Info regarding your favorite Crypto Currency</p>
      </div>
      <CarouselPlugin/>
    </div>

    </div>
  )
}

export default Hero