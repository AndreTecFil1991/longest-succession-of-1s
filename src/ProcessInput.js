const errors = require('./errors/errors.js');

function checkInputSize(splitedInput) {
    let errorMessage = '';
    //use Set method to check the input values composition and spread the result over an array
    const inputValues = [... (new Set(splitedInput))];

    if (inputValues.length === 1) {
        if (inputValues[0] === '1') {
            errorMessage = errors.MISSING_0;
        }

        if (inputValues[0] !== '0' && inputValues[0] !== '1')
            errorMessage = errors.INPUT_VALUES;
    }

    if (inputValues.length === 2) {
        if ((inputValues[0] !== '0' && inputValues[0] !== '1') || (inputValues[1] !== '0' && inputValues[1] !== '1'))
            errorMessage = errors.INPUT_VALUES;
    }

    if (inputValues.length > 2)
        errorMessage = errors.INPUT_VALUES;

    return errorMessage;
}

function findIndex(array) {
    let maxCountOf1s = 0
    let maxIndex;
    //index of previous zero, started with -1 to not interfere with the iteraction
    let previousZero = -1;
    // index of previous to anterior zero, initiated with -1 to not interfere with the iteraction
    let previousZeroToAnterior = -1;

    for (let currentIndex = 0; currentIndex < array.length; currentIndex++) {
        // If current element is 0 we calculate the difference between currentIndex and previousZeroToAnterior
        if (array[currentIndex] == 0) {
            // Update result if count of 1s around previousZero is more
            if (currentIndex - previousZeroToAnterior > maxCountOf1s) {
                maxCountOf1s = currentIndex - previousZeroToAnterior;
                maxIndex = previousZero;
            }

            // Update for next iteration
            previousZeroToAnterior = previousZero;
            previousZero = currentIndex;
        }
    }

    // Check for the last encountered zero
    if (array.length - previousZeroToAnterior > maxCountOf1s)
        maxIndex = previousZero;

    return maxIndex;
}

function processInput(receivedInput, callback = null) {
    let result = '';
    //check if we have the right number of arguments
    if (receivedInput.length != 3)
    result = errors.RIGHT_PARAMETERS_NUMBER;
    else {
        //input index: 0 for node, 1 for file dir and 2 for the sequence of 0s and 1s
        const input = receivedInput[2];
        const splitedInput = input.split(',');
        //get errorMessage when we have an invalid input
        result = checkInputSize(splitedInput);

        if (result.length === 0) {
            result = 'index ' + findIndex(splitedInput)
        }

    }

    if (callback && typeof callback === 'function')
        //use of a callback to return to test file when we are runing mocha tests
        return callback(result);
    else
        //return only the errorMessage when we are runing the script
        return result;
}

module.exports = processInput;