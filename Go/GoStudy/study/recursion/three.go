package main

import (
	"fmt"
)

/**
x 表示待求平方根的数
guess 表示当前猜测的平方根值
prevGuess 表示上一次的猜测值
epsilon 表示精度要求（即接近平方根的程度）
*/

func sqrtRecursive(x, guess, prevGuess, epsilon float64) float64 {
	if diff := guess*guess - x; diff < epsilon && -diff < epsilon {
		return guess
	}

	newGuess := (guess + x/guess) / 2
	if newGuess == prevGuess {
		return guess
	}

	return sqrtRecursive(x, newGuess, guess, epsilon)
}

func sqrt(x float64) float64 {
	return sqrtRecursive(x, 1.0, 0.0, 1e-9)
}

func main() {
	x := 25.0
	result := sqrt(x)
	fmt.Printf("%.2f 的平方根为 %.6f\n", x, result)
}
