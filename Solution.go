
package main
import "math"

func minOperations(input []int, divisor int) int {
    evenIndexes := true
    minMovesAtEvenIndexes := createArrayMinMovesForSpecifiedIndexType(evenIndexes, input, divisor)
    minMovesAtOddIndexes := createArrayMinMovesForSpecifiedIndexType(!evenIndexes, input, divisor)
    return findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes, minMovesAtOddIndexes, divisor)
}

func movesUpToEqualizeToTargetModuloValue(inputValue int, divisor int, targetModuloValue int) int {
    if inputValue % divisor >= targetModuloValue {
        return divisor - (inputValue % divisor) + targetModuloValue
    }
    return targetModuloValue - (inputValue % divisor)
}

func movesDownToEqualizeToTargetModuloValue(inputValue int, divisor int, targetModuloValue int) int {
    if inputValue%divisor >= targetModuloValue {
        return (inputValue % divisor) - targetModuloValue
    }
    return (inputValue % divisor) + divisor - targetModuloValue
}

func createArrayMinMovesForSpecifiedIndexType(evenIndexes bool, input []int, divisor int) []int {
    minMoves := make([]int, divisor)
    startIndex := 0
    if !evenIndexes {
        startIndex = 1
    }

    for targetModuloValue := range divisor {
        for i := startIndex; i < len(input); i += 2 {
            minMoves[targetModuloValue] += min(
            movesUpToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue),
            movesDownToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue))
        }
    }
    return minMoves
}

func findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes []int, minMovesAtOddIndexes []int, divisor int) int {
    var minOperations = math.MaxInt
    for firstModValue := range divisor {
        for secondModValue := firstModValue + 1; secondModValue < divisor; secondModValue++ {
            currentMin := min(
                minMovesAtEvenIndexes[firstModValue] + minMovesAtOddIndexes[secondModValue],
                minMovesAtEvenIndexes[secondModValue] + minMovesAtOddIndexes[firstModValue])
            minOperations = min(minOperations, currentMin)
        }
    }
    return minOperations
}
