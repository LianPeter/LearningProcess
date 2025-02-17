package main

import "fmt"
import (
	"math/rand"
	//"time"
	"time"
)

func main() {
	fmt.Print(rand.Intn(100)) //会产生0到100之间的随机整数
	fmt.Println()

	fmt.Print(rand.Float64()) //会产生0到1之间的随机数
	fmt.Println()

	rand.Seed(time.Now().Unix()) //Seed生成的随机数
	myrand := random(1, 20)

	fmt.Println(myrand)

}

func random(min, max int) int {
	return rand.Intn(max-min) + min
}
