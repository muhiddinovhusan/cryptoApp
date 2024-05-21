import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { useCrypto } from '../crypto-managment/Context';

interface CoinChartProps {
  id: string | undefined;
  timeRange: string ;
}

const SingleCoinChart: React.FC<CoinChartProps> = ({ id , timeRange }) => {
  const [chartData, setChartData] = useState<any>({ series: [], options: {} });

  const {state} = useCrypto();

  let currency: string;
  if (state.currency === "usd") {
    currency = "$"
  } else if (state.currency === "eur") {
    currency = "€"
  } else if (state.currency === "rub") {
    currency = "₽"
  } else if (state.currency === "jpy") {
    currency = "¥"
  } else {
    currency = "$"
  }
  

  useEffect(() => {
    const getCoinHistory = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${state.currency}&days=${timeRange}`
        );
        const data = response.data.prices;
        const formattedData = data
          .filter((item: any) => !isNaN(item[1]))  
          .map((item: any) => ({
            x: new Date(item[0]),
            y: item[1]
          }));


          
        const newChartData = {
          series: [{
            name: "Narx",
            data: formattedData
          }],
          options: {
            chart: {
              type: 'line',
              height: 550
            },
            xaxis: {
              type: 'datatime',
            },
            yaxis: {
              labels: {
                formatter: function (value: any) {
                  return currency + value.toFixed(2);
                }
              }

            },
            title: {
              text: `Narxlar Tarixi ${timeRange} `,
              align: 'left'
            },
            stroke: {
              curve: 'smooth'
            },
            dataLabels: {
              enabled: false
            }
          }
        };

        setChartData(newChartData);
      } catch (error) {
        console.error('Tanga tarixi maʼlumotlarini olishda xatolik:');
      }
    };

    if (id) {
      getCoinHistory();
    }
  }, [id,timeRange,currency]);

  return (
    <div className=''>
      {chartData.series.length > 0 && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={600}

        />
      )}
    </div>
  );
};

export default SingleCoinChart;
