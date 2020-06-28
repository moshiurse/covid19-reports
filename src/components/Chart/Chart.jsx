import React, { useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Charts = ({data: {confirmed, recovered, deaths}, country, postData, type}) => {
    const [ dailyData, setDailyData ] = useState([]);   

    useEffect(() => {
        const fetchDailyDataApi = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchDailyDataApi();
    }, [])

    const lineChart = (
        dailyData.length !== 0 ? (
            <Line data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true
                }]
            }} />) : null
                
    );

    const lineChartCountry = (
        postData.length !== 0 ? (
            <Line data={{
                labels: postData.map(({date}) => date),
                datasets: [{
                    data: postData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: postData.map(({recovered}) => recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0,255,0,0.5)',
                    fill: true
                }, {
                    data: postData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true
                }]
            }} />) : null
                
    );

    const barChart = (
        confirmed
            ? (
                <Bar 
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)', 
                                'rgba(0, 255, 0, 0.5)', 
                                'rgba(255, 0, 0, 0.5)'
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: false,
                        title: {display: true, text: `Currenr status of ${country}`}
                    }}
                />
            ) : null
    )

    return (
        <div className={styles.container}>
            {type === "postman" ? lineChartCountry : country ? barChart: lineChart}
            {/* {country ? barChart : lineChart} */}
        </div>
    );
}

export default Charts;