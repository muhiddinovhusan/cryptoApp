import { useState } from 'react';
import '../style/style.css';
import CoinsTable from './CoinsTable';

const CoinsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='center flex flex-col mb-4'>
      <div className='items-center flex flex-col gap-6 mb-4'>
        <h1 className='text-white font-normal text-2xl'>Cryptocurrency Prices by Market Cap</h1>
        <input
          type='text'
          placeholder='Search For a Crypto Currency..'
          value={searchQuery}
          onChange={handleSearchChange}
          className='w-full h-10 rounded-sm border search bg-inherit focus:outline focus:outline-1 text-white focus:outline-white border-[#FFFFFF3B] '
        />
      </div>
      <div>
        <CoinsTable searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default CoinsSection;
