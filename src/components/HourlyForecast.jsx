
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import React, { useContext } from 'react';
import { Weathercontext } from '../Contextapi/Weatherdata';

const otherSetting = {
    height: 300,
    yAxis: [{ label: "Temperature (°C)", min: 0, max: 45 }],
    grid: { horizontal: true },
    sx: {
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translateX(-10px)",

        }
    }
};

const valueFormatter = (value) => `${value}°C`;
function HourlyForecast() {
    const { hourdata, sethourdata } = useContext(Weathercontext)
    console.log(hourdata, "hourdata")

    return (
        hourdata.length === 0 ? null : (
            <div className="bg-[#333333]  w-[90%] m-auto mt-8">


                <BarChart
                    dataset={hourdata}
                    xAxis={[
                        {
                            colorMap: {
                                type: "ordinal",
                                colors: ["#5392f6"]
                            },
                            scaleType: "band",
                            dataKey: "time",
                            categoryGapRatio: 0.4,
                            barGapRatio: 0.1,
                            valueFormatter: (time, context) => {
                                const date = new Date(time);
                                const hours = date.getHours();
                                const ampm = hours >= 12 ? "PM" : "AM";
                                const formattedTime = `${hours % 12 || 12} ${ampm}`;
                                return context.location === "tick" ? formattedTime : time;
                            }
                        }
                    ]}
                    series={[{ dataKey: "temp_c", label: "Temperature", valueFormatter, color: "#3b82f6", }]}
                    {...otherSetting}
                    height={350}

                    borderRadius={5}
                />
            </div>
        )
    );

}
export default HourlyForecast
