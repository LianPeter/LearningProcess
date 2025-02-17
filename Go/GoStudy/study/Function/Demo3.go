package main

import "fmt"

func AddString(a, b string) string {
	return a + b
}
func main() {
	a := "Hello"
	b := "World"
	c := AddString(a, b)
	fmt.Println(c)
}
