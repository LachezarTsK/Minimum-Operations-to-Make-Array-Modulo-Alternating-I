
import kotlin.math.min

class Solution {

    fun minOperations(input: IntArray, divisor: Int): Int {
        val evenIndexes = true
        val minMovesAtEvenIndexes = createArrayMinMovesForSpecifiedIndexType(evenIndexes, input, divisor)
        val minMovesAtOddIndexes = createArrayMinMovesForSpecifiedIndexType(!evenIndexes, input, divisor)
        return findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes, minMovesAtOddIndexes, divisor)
    }

    private fun movesUpToEqualizeToTargetModuloValue(inputValue: Int, divisor: Int, targetModuloValue: Int): Int {
        if (inputValue % divisor >= targetModuloValue) {
            return divisor - (inputValue % divisor) + targetModuloValue
        }
        return targetModuloValue - (inputValue % divisor)
    }

    private fun movesDownToEqualizeToTargetModuloValue(inputValue: Int, divisor: Int, targetModuloValue: Int): Int {
        if (inputValue % divisor >= targetModuloValue) {
            return (inputValue % divisor) - targetModuloValue
        }
        return (inputValue % divisor) + divisor - targetModuloValue
    }

    private fun createArrayMinMovesForSpecifiedIndexType(evenIndexes: Boolean, input: IntArray, divisor: Int): IntArray {
        val minMoves = IntArray(divisor)
        val startIndex = if (evenIndexes) 0 else 1
        for (targetModuloValue in 0..<divisor) {
            for (i in startIndex..<input.size step (2)) {
                minMoves[targetModuloValue] += min(
                    movesUpToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue),
                    movesDownToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue)
                )
            }
        }
        return minMoves
    }

    private fun findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes: IntArray, minMovesAtOddIndexes: IntArray, divisor: Int): Int {
        var minOperations = Int.MAX_VALUE
        for (firstModValue in 0..<divisor) {
            for (secondModValue in firstModValue + 1..<divisor) {
                val currentMin = min(
                    minMovesAtEvenIndexes[firstModValue] + minMovesAtOddIndexes[secondModValue],
                    minMovesAtEvenIndexes[secondModValue] + minMovesAtOddIndexes[firstModValue]
                )
                minOperations = min(minOperations, currentMin)
            }
        }
        return minOperations
    }
}
