import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../hook/hooks';
import axios from 'axios';

interface State {
  isOpen: boolean;
  watchList: any[];
  allCoins: any[];
  currentPage: number;
  perPage: number;
  totalPages: number;
  currency: string
}

type StateActions =
  | { type: 'IS_OPEN' }
  | { type: 'GET_ALL_COINS'; payload: any[] }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'ADD_TO_WATCHLIST'; payload: any }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: any }
  | { type: 'SET_WATCHLIST'; payload: any[] }
  | { type: 'SET_CURRENCY'; payload: string }



interface StateContextProps {
  state: State;
  dispatch: React.Dispatch<StateActions>;
}

const CryptoContext = createContext<StateContextProps | undefined>(undefined);

const initialState: State = {
  isOpen: false,
  watchList: [],
  allCoins: [],
  currentPage: 1,
  perPage: 10,
  totalPages: 10,
  currency: "usd"
};

const StateReducer = (state: State, action: StateActions): State => {
  switch (action.type) {
    case 'IS_OPEN':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'GET_ALL_COINS':
      return {
        ...state,
        allCoins: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'ADD_TO_WATCHLIST':
      const newCoin = [...state.watchList, action.payload];
      saveToLocalStorage('watchList', newCoin)
      return {
        ...state,
        watchList: newCoin,
      };


    case 'REMOVE_FROM_WATCHLIST':
      const filteredWatchList = state.watchList.filter(id => id !== action.payload);
      saveToLocalStorage('watchList', filteredWatchList)
      return {
        ...state,
        watchList: filteredWatchList,
      };
    case 'SET_WATCHLIST':
      return {
        ...state,
        watchList: action.payload,
      };
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,

      }
      


    default:
      return state;
  }
};

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(StateReducer, initialState);

  const getAllCoins = async (page: number , currency : string) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=${state.perPage}&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      const data = response.data;

      dispatch({ type: 'GET_ALL_COINS', payload: data });
    } catch (error) {
      console.error('Failed to fetch coins data:', error);
    }
  };

  useEffect(() => {
    getAllCoins(state.currentPage ,  state.currency );
  }, [state.currentPage , state.currency]);


  useEffect(() => {
    const watchList = loadFromLocalStorage("watchList") || [];
    dispatch({ type: 'SET_WATCHLIST', payload: watchList });
}, []);
  return (
    <CryptoContext.Provider value={{ state, dispatch }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
