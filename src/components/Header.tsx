
import { useCrypto } from '../crypto-managment/Context'
import '../style/style.css'
const Header = () => {
  const { state, dispatch } = useCrypto();

  const handleCurrencyChange = (e : React.ChangeEvent<HTMLSelectElement> ) => {
    dispatch({ type: 'SET_CURRENCY', payload: e.target.value });
  };
  return (
    <header className="bg-zinc-900 py-2 shadow-md shadow-zinc-950 ">
      <div  className="flex items-center justify-between center">
          <h2 className="text-lg font uppercase font-bold text-[#87CEEB]">
            CRYPTOFOLIO
          </h2>
   
        <div className=" flex  items-center  gap-5">
          <select  value={state.currency} onChange={handleCurrencyChange}   className="text-white bg-zinc-900">
            <option value="usd">USD</option>
            <option value="eur">EURO</option>
            <option value="jpy">JPY</option>
            <option value="rub"> RU</option>
          </select>
          <button className='bg-[#87CEEB] rounded-sm w-32 p-1 h-9 text-base'
          onClick={()=> dispatch({type: "IS_OPEN"})}>
          WATCH LIST
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header