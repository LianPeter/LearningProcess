package Goroutines

import "fmt"

func Myfunc(ch chan int) {

	fmt.Println(234 + <-ch)
}

func ForClose(mychnl chan string) {

	for v := 0; v < 4; v++ {
		mychnl <- "nhooo"
	}
	close(mychnl)

}
