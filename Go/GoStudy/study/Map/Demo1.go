package main

import "fmt"

func main() {
	var siteMap map[string]string /*创建集合 */
	siteMap = make(map[string]string)

	/* map 插入 key - value 对,各个国家对应的首都 */
	siteMap["Google"] = "谷歌"
	siteMap["Runoob"] = "菜鸟教程"
	siteMap["Baidu"] = "百度"
	siteMap["Wiki"] = "维基百科"

	/*使用键输出地图值 */
	for site := range siteMap {
		fmt.Println(site, "是", siteMap[site])
	}

	/*查看元素在集合中是否存在 */
	name, exists := siteMap["Facebook"] /*如果确定是真实的,则存在,否则不存在 */
	if exists {
		fmt.Println("Facebook 的 站点是", name)
	} else {
		fmt.Println("Facebook 站点不存在")
	}
	/*赋值语句 name, exists := siteMap["Facebook"] 使用了多重返回值的方式：
	name：如果键 "Facebook" 存在，它会存储对应的值。
	exists：这是一个布尔值，指示键 "Facebook" 是否存在。
	如果键存在，exists 为 true，同时 name 会包含键对应的值。
	如果键不存在，exists 为 false，同时 name 会是映射值类型的零值（这里是空字符串 ""）*/
}
