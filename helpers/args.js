const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args;
    let lastKey = '';
    rest.forEach((value, index, array) => {
        if (value.charAt(0) === '-') {
            lastKey = value.slice(1);
            res[lastKey] = true;
        } else if (lastKey != '') {
            res[lastKey] = value;
            lastKey = '';
        }
    });

    return res;
};

export { getArgs };
