import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const isExists = async (path) => {
    try {
        await promises.stat(path);
    } catch (e) {
        return false;
    }
    return true;
};

const getKeyValue = async (key) => {
    let data = {};
    if (await isExists(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }

    return data[key];
};

const saveKeyValue = async (key, value) => {
    let data = {};

    if (await isExists(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
        //console.log(data);
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

export { saveKeyValue, getKeyValue };
