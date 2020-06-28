import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from './api';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component{

    state = {
        data: {},
        country: '',
        postmanCountryList: [],
        postmanCountry: '',
        postmanData: []
    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        fetch('https://api.covid19api.com/countries')
        .then(response => response.json())
        .then(dataPostMan => {
            console.log(dataPostMan);
                this.setState({ postmanCountryList: dataPostMan, data: fetchedData});
        });
        // this.setState({ postmanCountryList: dataPostMan, data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country })
    }

    handlePostmanCountryChange = async (country) => {
        fetch(`https://api.covid19api.com/dayone/country/${country}`)
        .then(response => response.json())
        .then(dataCountry => {
            let newData = dataCountry.map(item => {
                return {
                    date: new Date(item.Date).toDateString(),
                    confirmed: item.Confirmed,
                    deaths: item.Deaths,
                    recovered: item.Recovered,
                    country: item.Country
                }
            })
             console.log('dataCountry',newData);
            this.setState({ postmanData: newData, postmanCountry: country, country: '' });
        });
    }

    render(){

        const { data, country, postmanCountryList, postmanData } = this.state;

        return (
            <Router>
                <div className={styles.container}>
                    <h2>COVID-19 REPORTS</h2>
                    <p>If you want to see countries detail information
                         <Link to="/detail"> Click Here</Link></p>
                         <Switch>
                            <Route exact path="/">
                            <Cards data = {data}/>
                            <CountryPicker change={this.handleCountryChange} type="mathdro"/>
                            <Chart data={data} country={country} postData={postmanData} type=""/>
                            </Route>
                            <Route path="/detail">
                            <CountryPicker change={this.handlePostmanCountryChange} type="postman" data={postmanCountryList}/>
                            <Chart data={data} postData={postmanData} country={country} type="postman" />
                            </Route>
                        </Switch>
                </div>
            </Router>
        )
    }
}

export default App;

