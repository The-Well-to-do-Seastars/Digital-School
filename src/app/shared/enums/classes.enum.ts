enum Classes {
    a, b, c, d, e, f
}

const possibleClasses = () => {
    const result = [];
    for (const c in Classes) {
        if (Classes.hasOwnProperty(c) && isNaN(Number(c))) {
            result.push({ value: Classes[c], name: c });
        }
    }
    return result;
};

export { Classes, possibleClasses };
