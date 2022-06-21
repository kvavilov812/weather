#!/usr/bin/node

import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';
import emoji from 'node-emoji';
import dedent from 'dedent-js';
import chalk from 'chalk';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен!');
        return;
    }
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const initCLI = async () => {
    const args = getArgs(process.argv);
    //console.log(args);
    if (args.h) {
        // Help
        printHelp();
        return;
    }
    if (args.s) {
        // City
        //console.log('Save city');
        await saveKeyValue('city', args.s);
    }
    if (args.t) {
        // Token
        await saveToken(args.t);
    }
    // Weather
    //getWeather(await getKeyValue('city'));
    await getForecast();
};

const getForecast = async () => {
    try {
        const iconsMap = new Map();
        iconsMap.set('01d', ':sunny:');
        iconsMap.set('02d', ':partly_sunny:');
        iconsMap.set('03d', ':cloud:');
        iconsMap.set('04d', ':cloud:');
        iconsMap.set('09d', ':partly_sunny_rain:');
        iconsMap.set('10d', ':partly_sunny_rain:');
        iconsMap.set('11d', ':thunder_cloud_and_rain:');
        iconsMap.set('13d', ':snowflake:');
        iconsMap.set('50d', ':fog:');
        iconsMap.set('01n', ':sunny:');
        iconsMap.set('02n', ':partly_sunny:');
        iconsMap.set('03n', ':cloud:');
        iconsMap.set('04n', ':cloud:');
        iconsMap.set('09n', ':partly_sunny_rain:');
        iconsMap.set('10n', ':partly_sunny_rain:');
        iconsMap.set('11n', ':thunder_cloud_and_rain:');
        iconsMap.set('13n', ':snowflake:');
        iconsMap.set('50n', ':fog:');
        const weatherData = await getWeather(await getKeyValue('city'));
        let weatherString = emoji.emojify(
            `${iconsMap.get(weatherData.weather[0].icon)}  ${
                weatherData.weather[0].description
            }`
        );

        const iconCountry = `:flag-${weatherData.sys.country.toLowerCase()}:`;
        console.log(
            dedent`Погода в городе 🚩 ${chalk.green.bold.bold.bold(
                weatherData.name
            )} ${emoji.emojify(iconCountry)} 
            ${weatherString}  
            ${emoji.emojify(':thermometer:')}  ${chalk.blue.bold(
                weatherData.main.temp
            )} ощущается как ${emoji.emojify(
                ':thermometer:'
            )}  ${chalk.blue.bold(weatherData.main.feels_like)}
            давление ${chalk.red.bold(
                weatherData.main.pressure
            )} мм.рт влажность ${chalk.green.bold(
                weatherData.main.humidity + '%'
            )}`
        );
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Неверно указан город!');
        } else if (e?.response?.status == 404) {
            printError('Неверно указан токен!');
        }
        printError(e.message);
    }
};

await initCLI();
