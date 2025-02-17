package String

import (
	"bytes"
	"fmt"
	"strings"
	"unicode/utf8"
)

func SliceString() {
	//创建和初始化一个字节片
	mySlice1 := []byte{0x47, 0x65, 0x65, 0x6b, 0x73}

	//从切片创建字符串
	myString1 := string(mySlice1)

	//显示字符串
	fmt.Println("String 1: ", myString1)

	//创建和初始化一个符文切片
	mySlice2 := []rune{0x0047, 0x0065, 0x0065, 0x006b, 0x0073}

	//从切片创建字符串
	myString2 := string(mySlice2)

	//显示字符串
	fmt.Println("String 2: ", myString2)
}

func Length() {
	/*在Golang字符串中，可以使用两个函数（一个是len()，
	另一个是RuneCountInString()）来找到字符串的长度。
	UTF-8包提供了RuneCountInString()函数，该函数返回字符串中存在的符文总数。
	len()函数返回字符串的字节数。*/
	//创建和初始化字符串
	//使用简写声明
	myStr := "Welcome to node ??????"

	//查找字符串的长度
	//使用len()函数
	length1 := len(myStr)

	//使用RuneCountInString()函数
	length2 := utf8.RuneCountInString(myStr)

	//显示字符串的长度
	fmt.Println("string:", myStr)
	fmt.Println("Length 1:", length1)
	fmt.Println("Length 2:", length2)
}
func OperatorCompare() {
	//创建和初始化
	//使用速记声明
	mySlice := []string{"Geeks", "Geeks",
		"gfg", "GFG", "for"}

	fmt.Println("Slice: ", mySlice)

	//使用比较运算符
	result1 := "GFG" > "Geeks"
	fmt.Println("Result 1: ", result1)

	result2 := "GFG" < "Geeks"
	fmt.Println("Result 2: ", result2)

	result3 := "Geeks" >= "for"
	fmt.Println("Result 3: ", result3)

	result4 := "Geeks" <= "for"
	fmt.Println("Result 4: ", result4)

	result5 := "Geeks" == "Geeks"
	fmt.Println("Result 5: ", result5)

	result6 := "Geeks" != "for"
	fmt.Println("Result 6: ", result6)
}
func Compare() {
	fmt.Println(strings.Compare("gfg", "Geeks"))

	fmt.Println(strings.Compare("nhooo", "nhooo"))

	fmt.Println(strings.Compare("Geeks", " GFG"))

	fmt.Println(strings.Compare("GeeKS", "GeeKs"))
}

// Concat /*字符串拼接*/
func Concat() {
	var b bytes.Buffer
	b.WriteString("H")
	b.WriteString("e")
	b.WriteString("l")
	b.WriteString("l")
	b.WriteString("o")
	fmt.Println(b.String())

}

func Sprintf() {
	const str1 = "GO"
	const str2 = "Golang"
	result := fmt.Sprintf("%s %s", str1, str2)
	fmt.Println(result)
}

func JoinFunc() {
	spring := []string{"Hello", "Golang", "Python"}
	result := strings.Join(spring, "-")
	fmt.Println(result)
}
