package main

import "fmt"

type author struct {
	name      string
	branch    string
	particles int
	salary    int
}

func (a author) shows() {
	fmt.Println("Author's name: ", a.name)
	fmt.Println("Author's branch", a.branch)
	fmt.Println("Author's particles: ", a.particles)
	fmt.Println("Author's salary: ", a.salary)
}
