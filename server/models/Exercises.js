const myexercise = require('../config/exercise.json');
const all = () => {
    return myexercise;
};

const postExercise = (newexercise) => {
    myexercise.push(newexercise);
    return true;
}

module.exports = {
    myexercise,
    all,
    postExercise,
};