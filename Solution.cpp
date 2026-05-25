
#include <span>
#include <limits>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {

public:
    int minOperations(vector<int>& input, int divisor) {
        bool evenIndexes = true;
        vector<int> minMovesAtEvenIndexes = createVectorMinMovesForSpecifiedIndexType(evenIndexes, input, divisor);
        vector<int> minMovesAtOddIndexes = createVectorMinMovesForSpecifiedIndexType(!evenIndexes, input, divisor);
        return findMinOperationsToMakeArrayModuloAlternating(minMovesAtEvenIndexes, minMovesAtOddIndexes, divisor);
    }

private:
    int movesUpToEqualizeToTargetModuloValue(int inputValue, int divisor, int targetModuloValue) {
        if (inputValue % divisor >= targetModuloValue) {
            return divisor - (inputValue % divisor) + targetModuloValue;
        }
        return targetModuloValue - (inputValue % divisor);
    }

    int movesDownToEqualizeToTargetModuloValue(int inputValue, int divisor, int targetModuloValue) {
        if (inputValue % divisor >= targetModuloValue) {
            return (inputValue % divisor) - targetModuloValue;
        }
        return (inputValue % divisor) + divisor - targetModuloValue;
    }

    vector<int> createVectorMinMovesForSpecifiedIndexType(bool evenIndexes, span<const int> input, int divisor) {
        vector<int> minMoves(divisor);
        int startIndex = evenIndexes ? 0 : 1;
        for (int targetModuloValue = 0; targetModuloValue < divisor; ++targetModuloValue) {
            for (int i = startIndex; i < input.size(); i += 2) {
                minMoves[targetModuloValue] += min(
                        movesUpToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue),
                        movesDownToEqualizeToTargetModuloValue(input[i], divisor, targetModuloValue));
            }
        }
        return minMoves;
    }

    int findMinOperationsToMakeArrayModuloAlternating(span<const int> minMovesAtEvenIndexes, span<const int> minMovesAtOddIndexes, int divisor) {
        int minOperations = numeric_limits<int>::max();
        for (int firstModValue = 0; firstModValue < divisor; ++firstModValue) {
            for (int secondModValue = firstModValue + 1; secondModValue < divisor; ++secondModValue) {
                int currentMin = min(minMovesAtEvenIndexes[firstModValue] + minMovesAtOddIndexes[secondModValue],
                        minMovesAtEvenIndexes[secondModValue] + minMovesAtOddIndexes[firstModValue]);
                minOperations = min(minOperations, currentMin);
            }
        }
        return minOperations;
    }
};
