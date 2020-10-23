const mydiet = require('../config/diet.json');
const all = () => {
    return mydiet;
};

const postDiet = (newdiet) => {
    mydiet.push(newdiet);
    return true;
}

module.exports = {
    mydiet,
    all,
    postDiet
};