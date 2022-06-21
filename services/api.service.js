import axios from 'axios';
import https from 'https';
import { printError } from './log.service.js';
import { getKeyValue } from './storage.service.js';

const getWeather = async (city) => {
    //console.log(`Город ${city}`);
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    const token = await getKeyValue('token');
    if (!token) {
        throw new Error('Не задан токен API!');
    }
    const { data } = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
            params: {
                q: city,
                appid: token,
                lang: 'ru',
                units: 'metric',
            },
        }
    );
    //console.log(data);
    return data;
};

export { getWeather };
