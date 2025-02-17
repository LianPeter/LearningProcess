package main

import "fmt"

type author1 struct {
	name      string
	branch    string
	particles int
}

func (a *author1) show(abranch string) {
	(*a).branch = abranch
}
func main() {
	//初始化author结构体
	res := author1{
		name:   "Sona",
		branch: "CSE",
	}

	fmt.Println("Author's name: ", res.name)
	fmt.Println("Branch Name(Before): ", res.branch)

	//创建一个指针
	p := &res
	p.show("ECE")
	fmt.Println("Author's name: ", res.name)
	fmt.Println("Branch Name(After): ", res.branch)
}
