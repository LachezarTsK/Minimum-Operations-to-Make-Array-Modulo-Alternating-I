
/**
 * @param {number[]} input
 * @param {number} divisor
 * @return {number}
 */
var minOperations = function (input, divisor) {
    const evenIndexes = true;
    const minMovesAtEvenIndexes = createArrayMinMovesForSpecifiedIndexType(evenIndexes, input, divisor);
    const minMovesAtOddIndexes = createArrayMinMovesForSpecifiedIndexType(!evenIndexes, input, divisor);
    return findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes, minMovesAtOddIndexes, divisor);
};

/**
 * @param {number} inputValue
 * @param {number} divisor 
 * @param {number} targetModuloValue
 * @return {number}
 */
function movesUpToEqualizeToTargetModuloValue(inputValue, divisor, targetModuloValue) {
    if (inputValue % divisor >= targetModuloValue) {
        return divisor - (inputValue % divisor) + targetModuloValue;
    }
    return targetModuloValue - (inputValue % divisor);
}

/**
 * @param {number} inputValue
 * @param {number} divisor 
 * @param {number} targetModuloValue
 * @return {number}
 */
function movesDownToEqualizeToTargetModuloValue(inputValue, divisor, targetModuloValue) {
    if (inputValue % divisor >= targetModuloValue) {
        return (inputValue % divisor) - targetModuloValue;
    }
    return (inputValue % divisor) + divisor - targetModuloValue;
}

/**
 * @param {boolean} evenIndexes
 * @param {number[]} input 
 * @param {number} divisor
 * @return {number[]}
 */
function createArrayMinMovesForSpecifiedIndexType(evenIndexes, input, divisor) {
    const minMoves = new Array(divisor).fill(0);
    const startIndex = evenIndexes ? 0 : 1;
    for (let targetModuloValue = 0; targetModuloValue < divisor; ++targetModuloValue) {
        for (let i = startIndex; i < input.length; i += 2) {
            minMoves[targetModuloValue] += Math.min(
                    movesUpToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue),
                    movesDownToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue));
        }
    }
    return minMoves;
}

/**
 * @param {number[]} minMovesAtEvenIndexes
 * @param {number[]} minMovesAtOddIndexes 
 * @param {number} divisor
 * @return {number}
 */
function findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes, minMovesAtOddIndexes, divisor) {
    let minOperations = Number.MAX_SAFE_INTEGER;
    for (let firstModValue = 0; firstModValue < divisor; ++firstModValue) {
        for (let secondModValue = firstModValue + 1; secondModValue < divisor; ++secondModValue) {
            const currentMin = Math.min(minMovesAtEvenIndexes[firstModValue] + minMovesAtOddIndexes[secondModValue],
                    minMovesAtEvenIndexes[secondModValue] + minMovesAtOddIndexes[firstModValue]);
            minOperations = Math.min(minOperations, currentMin);
        }
    }
    return minOperations;
}
