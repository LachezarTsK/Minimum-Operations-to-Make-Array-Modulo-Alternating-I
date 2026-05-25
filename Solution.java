
public class Solution {

    public int minOperations(int[] input, int divisor) {
        boolean evenIndexes = true;
        int[] minMovesAtEvenIndexes = createArrayMinMovesForSpecifiedIndexType(evenIndexes, input, divisor);
        int[] minMovesAtOddIndexes = createArrayMinMovesForSpecifiedIndexType(!evenIndexes, input, divisor);
        return findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes, minMovesAtOddIndexes, divisor);
    }

    private int movesUpToEqualizeToTargetModuloValue(int inputValue, int divisor, int targetModuloValue) {
        if (inputValue % divisor >= targetModuloValue) {
            return divisor - (inputValue % divisor) + targetModuloValue;
        }
        return targetModuloValue - (inputValue % divisor);
    }

    private int movesDownToEqualizeToTargetModuloValue(int inputValue, int divisor, int targetModuloValue) {
        if (inputValue % divisor >= targetModuloValue) {
            return (inputValue % divisor) - targetModuloValue;
        }
        return (inputValue % divisor) + divisor - targetModuloValue;
    }

    private int[] createArrayMinMovesForSpecifiedIndexType(boolean evenIndexes, int[] input, int divisor) {
        int[] minMoves = new int[divisor];
        int startIndex = evenIndexes ? 0 : 1;
        for (int targetModuloValue = 0; targetModuloValue < divisor; ++targetModuloValue) {
            for (int i = startIndex; i < input.length; i += 2) {
                minMoves[targetModuloValue] += Math.min(
                        movesUpToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue),
                        movesDownToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue));
            }
        }
        return minMoves;
    }

    private int findMinOperationsToMakeArrayModuloAlternating(int[] minMovesAtEvenIndexes, int[] minMovesAtOddIndexes, int divisor) {
        int minOperations = Integer.MAX_VALUE;
        for (int firstModValue = 0; firstModValue < divisor; ++firstModValue) {
            for (int secondModValue = firstModValue + 1; secondModValue < divisor; ++secondModValue) {
                int currentMin = Math.min(minMovesAtEvenIndexes[firstModValue] + minMovesAtOddIndexes[secondModValue],
                        minMovesAtEvenIndexes[secondModValue] + minMovesAtOddIndexes[firstModValue]);
                minOperations = Math.min(minOperations, currentMin);
            }
        }
        return minOperations;
    }
}
