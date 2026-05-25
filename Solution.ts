
function minOperations(input: number[], divisor: number): number {
    const evenIndexes = true;
    const minMovesAtEvenIndexes = createArrayMinMovesForSpecifiedIndexType(evenIndexes, input, divisor);
    const minMovesAtOddIndexes = createArrayMinMovesForSpecifiedIndexType(!evenIndexes, input, divisor);
    return findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes, minMovesAtOddIndexes, divisor);
};

function movesUpToEqualizeToTargetModuloValue(inputValue: number, divisor: number, targetModuloValue: number): number {
    if (inputValue % divisor >= targetModuloValue) {
        return divisor - (inputValue % divisor) + targetModuloValue;
    }
    return targetModuloValue - (inputValue % divisor);
}

function movesDownToEqualizeToTargetModuloValue(inputValue: number, divisor: number, targetModuloValue: number): number {
    if (inputValue % divisor >= targetModuloValue) {
        return (inputValue % divisor) - targetModuloValue;
    }
    return (inputValue % divisor) + divisor - targetModuloValue;
}

function createArrayMinMovesForSpecifiedIndexType(evenIndexes: boolean, input: number[], divisor: number): number[] {
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

function findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes: number[], minMovesAtOddIndexes: number[], divisor: number): number {
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
