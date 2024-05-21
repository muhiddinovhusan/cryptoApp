import CoinsSection from "../components/CoinsSection";
import Pagination from "../components/Pagination";
import { useCrypto } from "../crypto-managment/Context";
import Hero from './../components/hero-section';

const Home = () => {
    const {  dispatch} = useCrypto();
const handlePageChange = (page: number) => {
  dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
};




  return (
    <>
    
    <Hero/>
    <CoinsSection/>
    <Pagination handlePageChange={handlePageChange}/>
    </>

  )
}

export default Home