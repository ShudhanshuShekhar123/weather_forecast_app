import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Weathercontext } from '../Contextapi/Weatherdata';
import ForecastCard from './ForecastCard';

const CurrentWeather = () => {
    const [forecastdata, setforecastdata] = useState()
    const [data, setData] = useState(null)
    const [city, setCity] = useState("")
    const [image, setImage] = useState(null)
    const [loading, setIsLoaing] = useState(null)
    const [icon, setIcon] = useState("")

    const [place, setPlace] = useState("")
    const [isDatapresent, setIsDataPresent] = useState(false)


    const { hourdata, sethourdata } = useContext(Weathercontext)
    //  console.log(hourdata,"from context")

    useEffect(() => {

        if (isDatapresent) {
            if (place.trim().length !== 0) {
                fetch(`https://api.weatherapi.com/v1/forecast.json?key=663717f4a8c3430db10100725241203&q=${place}&days=5&aqi=no&alerts=no`)
                    .then((res) => {
                        // console.log(res)
                        return res.json()
                    })
                    .then((data) => {
                        console.log(data, "here")
                        setforecastdata(data)
                        sethourdata(data.forecast.forecastday[0].hour)

                    })
            }

        }



    }, [place])


    const notify = () => toast.info("Input filed is empty!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });

    const notify1 = () => toast.info("No matching  location found!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });



    const handleclick = () => {
        console.log(city.length, "city here")

        if (city.trim().length === 0) {
            return notify()
        }
        setIsLoaing(false)
        fetch(`https://api.weatherapi.com/v1/current.json?key=663717f4a8c3430db10100725241203&q=${city}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                if (data.error && data.error.code == 1006) {
                    setCity("")
                    setPlace("")
                    return  notify1()
                }

                setIsLoaing(true)
                setData(data)
                setIsDataPresent(true)
                console.log("be;pw")

                setIcon(data.current.condition.icon)


                if (place.trim().length !== 0) {
                    fetch(`https://api.weatherapi.com/v1/forecast.json?key=663717f4a8c3430db10100725241203&q=${place}&days=3&aqi=no&alerts=no`)
                        .then((res) => {
                            // console.log(res)
                            return res.json()
                        })
                        .then((data) => {
                            console.log(data, "here")
                            setforecastdata(data)
                            sethourdata(data.forecast.forecastday[0].hour)

                        })
                }



                setCity("")
                setPlace("")

            })
            .catch((err) => {

                console.log(err, "here")
            })
    }

    const handlechange = (e) => {

        setCity(e.target.value)
        setPlace(e.target.value)

    }

    const handletoggle = () => {
        setData(null)
        setIsDataPresent(false)
    }

    return (

        <div style={{ height: isDatapresent ? "auto" : "100vh" }} className="   w-[95%]   pb-10  bg-[rgba(36,36,36,1)]   flex flex-col lg:flex-row justify-between text-white mx-auto">

            <div className='w-[80%] sm:w-3/5  m-auto md:w-[50%] hadow-md  rounded-lg lg:w-1/4 bg-[#333333]'>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                {
                    !isDatapresent ?

                        <div className="flex justify-center items-center w-[90%]   mx-auto mt-2 mb-2">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full ml-4 flex justify-center items-center">
                                <input onChange={handlechange} value={city} type="text" id="simple-search" className="bg-transparent   focus:outline-none focus:border-transparent  text-white text-sm rounded-lg w-full p-2.5 ps-10 dark:placeholder-gray-400 dark:text-white" placeholder="Search  City  name..." required />
                                <button onClick={handleclick} type="submit" className="p-2.5 ml-2 text-sm font-medium text-white">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>

                        </div>

                        

                        // <div>

                        //     <button
                        //         type="button"
                        //         class="pointer-events-none inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        //         disabled>
                              
                        //         <span>Getting Weather...</span>
                        //         <div
                        //             class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        //             role="status"></div>
                        //     </button>
                        // </div>

                        :


                        <div className="flex justify-center  mt-4 ">
                            <button onClick={handletoggle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Search another city
                            </button>
                        </div>



                }

                {
                    isDatapresent ?
                        <div style={{ width: "90%", margin: "auto", textAlign: "center", marginTop: "30px" }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}>
                                <img style={{ width: "40%" }} src={icon} alt="" />
                            </div>
                            <h1 className='text-5xl font-bold text-white  font-Oswald   mb-4'> {data.current.temp_c}°<span className='text-3xl'>C</span> </h1>
                            <h1 className='text-3xl font-bold text-white  font-Oswald mb-4'>{data.location.name}</h1>
                            <p className='text-lg  text-white  font-semibold font-Oswald mb-4'>{data.current.condition.text}</p>
                            <p className='text-lg text-white font-semibold  font-Oswald  mb-4'>{data.current.humidity}% Humidity </p>
                            <p className='text-lg text-white font-semibold  font-Oswald  mb-4' > {data.current.wind_kph} Km/hr Wind Speed </p>
                        </div>
                        : null
                }


            </div>

            {
                isDatapresent ?
                    <div className=' mt-5  w-3/4     m-auto' >
                        <ForecastCard {...forecastdata} />

                    </div>
                    : null

            }




        </div>
    )
}

export default CurrentWeather 