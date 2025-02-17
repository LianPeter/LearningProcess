package main

import "fmt"

func main() {
	arr := []string{"a", "b", "c"}
	for i, j := range arr {
		fmt.Println(i, j)
	}
}
