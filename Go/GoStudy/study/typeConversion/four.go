package main

import (
	"fmt"
)

func printValue(v interface{}) {
	switch v := v.(type) {
	case int:
		fmt.Println("Integer:", v)
	case string:
		fmt.Println("String:", v)
	default:
		fmt.Println("Unknown type")
	}
}

func main() {
	printValue(42)
	printValue("hello")
	printValue(3.14)
}
