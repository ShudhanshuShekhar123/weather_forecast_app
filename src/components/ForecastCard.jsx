import 'react-toastify/dist/ReactToastify.css';
import HourlyForecast from './HourlyForecast';

const ForecastCard = (props) => {
    console.log(props, "dsads");
    let data = props?.forecast?.forecastday;
    console.log(data, "hello");
    return (

         <div>


     
        <div   className="   overflow-x-scroll  w scrollbar-hidden ml-4  sm:overflow-x-hidden    m-auto sm:w-full mt-5">
            <div className="grid  grid-flow-col   place-items-center sm:grid-cols-3  auto-cols-max  gap-5   ">
                {data?.map((el) => (
                    <div
                      
                        className="bg-[#333333] w-[160px]  sm:w-[94%] shadow-md rounded-lg text-center"
                        id="card"
                        key={el.date}
                    >
                        <p className="mt-1.5 mb-2.5">{el.date}</p>
                        <img className="  mx-auto mb-1" src={el.day.condition.icon} alt="" />
                        <p className="mb-1">Max temp: {el.day.maxtemp_c}°c</p>
                        <p className="mb-1.5">Min temp: {el.day.mintemp_c}°c</p>
                    </div>
                ))}
            </div>
        </div>

        <HourlyForecast />

        </div>

    );
};



export default ForecastCard
