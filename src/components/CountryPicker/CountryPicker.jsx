import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({change}) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchCountriesApi = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchCountriesApi();
    }, [setFetchedCountries]);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => change(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;