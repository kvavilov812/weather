import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(`${chalk.bgRed('ERROR')} ${error}`);
};

const printSuccess = (message) => {
    console.log(`${chalk.bgGreen('SUCCESS')} ${message}`);
};

const printHelp = () => {
    console.log(dedent`
    ${chalk.bgCyan('HELP')}
    
    Без параметров - вывод погоды
    -s [CITY] установка города
    -t [TOKEN] установка ключа
    -h вывод помощи`);
};

export { printError, printSuccess, printHelp };
