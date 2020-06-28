import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = (props) => {
    const {change, type, data} = props;
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchCountriesApi = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchCountriesApi();
    }, []);

    const nativeSelect = (
        type === "postman" ?
        (<NativeSelect defaultValue="" onChange={(e) => change(e.target.value)}>
                <option value="">Global</option>
                {data.map((country,i) => <option key={i} value={country.Slug}>{country.Country}</option>)}
        </NativeSelect>)
        : 
        (
        <NativeSelect defaultValue="" onChange={(e) => change(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
        </NativeSelect>)
        );
    return (
        <FormControl className={styles.formControl}>
            
            {nativeSelect}
        </FormControl>
    );
}

export default CountryPicker;