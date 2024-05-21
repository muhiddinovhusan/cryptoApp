
import { useCrypto } from '../crypto-managment/Context'
import '../style/style.css'
const Header = () => {
  const { state, dispatch } = useCrypto();

  const handleCurrencyChange = (e : React.ChangeEvent<HTMLSelectElement> ) => {
    dispatch({ type: 'SET_CURRENCY', payload: e.target.value });
  };
  return (
    <header className="bg-zinc-900 py-2 shadow-md  shadow-zinc-950 ">
      <div  className="flex items-center  justify-between center">
          <h2 className="text-lg  uppercase font-bold text-[#87CEEB]">
            CRYPTOFOLIO
          </h2>
   
        <div className=" flex  items-center  max-sm:gap-2 gap-5">
          <select  value={state.currency} onChange={handleCurrencyChange}   className="text-white bg-zinc-900">
            <option value="usd">USD</option>
            <option value="eur">EURO</option>
            <option value="jpy">JPY</option>
            <option value="rub"> RU</option>
          </select>
          <button className='bg-sky-300 rounded-sm uppercase font-medium max-md:py-2 font max-md:px-4 tracking-normal text-xs transition hover:bg-sky-300 hover:bg-opacity-80 sm:text-sm md:text-sm  py-3 px-6 md:tracking-wide '
          onClick={()=> dispatch({type: "IS_OPEN"})}>
          WATCH LIST
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header