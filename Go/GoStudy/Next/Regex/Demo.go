package Regex

import (
	"fmt"
	"regexp"
)

func First() {
	// 使用compile()和mustcompile()函数来检索正则表达式对象
	re := regexp.MustCompile(".com")
	// FindString()方法返回一个字符串，该字符串具有最左边匹配的文本。如果找不到匹配项，则返回空字符串。
	fmt.Println(re.FindStringIndex("google.com"))
	fmt.Println(re.FindStringIndex("abc.org"))
	fmt.Println(re.FindStringIndex("fb.com"))
}
func Second() {
	// 使用compile()和mustcompile()函数来检索正则表达式对象
	re := regexp.MustCompile("[a-z]+")
	// FindAllString()方法返回一个字符串数组，该数组包含所有匹配项。如果找不到匹配项，则返回空切片。
	fmt.Println(re.FindAllString("abc.org", -1))
	fmt.Println(re.FindAllString("abc.org", 1))
	fmt.Println(re.FindAllString("abc.org", 2))
}

func Third() {
	// FindStringSubmatch()方法，返回具有最左边匹配项和匹配项文本的字符串切片
	re := regexp.MustCompile("f([a-z]+)ing")
	fmt.Println(re.FindStringSubmatch("flying"))
	fmt.Println(re.FindStringSubmatch("abcfloatingxyz"))
}
