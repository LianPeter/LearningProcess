package main

import "GitHub/LianPeter/GoStudy/Next/String"

func main() {
	/*切片字符串*/
	String.SliceString()
	/*字符串长度*/
	String.Length()
	/*字符串比较*/

	// 字符串的比较是基于字典顺序进行的，
	//实际上是将字符串中的字符逐个转换为它们的 ASCII（或 Unicode）码值进行比较
	String.OperatorCompare()
	String.Compare()

	// 使用bytes.Buffer和WriteString()方法来连接字符串的字节来创建字符串
	String.Concat()

	// 使用Sprintf()函数来拼接字符串
	String.Sprintf()

	// 使用string.Join()函数来拼接字符串
	String.JoinFunc()
}
