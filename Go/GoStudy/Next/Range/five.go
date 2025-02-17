package main

import "fmt"

func main() {
	pets := []string{"cat", "dog", "fish"}

	// 使用副本进行迭代
	for i, pet := range pets {
		// 这时可以安全地使用 pets
		fmt.Printf("Index: %d, Pet: %s\n", i, pet)
	}
}
