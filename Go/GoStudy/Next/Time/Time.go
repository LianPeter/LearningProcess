package Time

import (
	"fmt"
	"time"
)

func First() {
	p := fmt.Println

	present := time.Now() //当前时间
	p(present)

	DOB := time.Date(1993, 02, 28, 9, 04, 39, 213, time.Local)
	fmt.Println(DOB)

	fmt.Println(DOB.Year())
	fmt.Println(DOB.Month())
	fmt.Println(DOB.Day())
	fmt.Println(DOB.Hour())
	fmt.Println(DOB.Minute())
	fmt.Println(DOB.Second())
	fmt.Println(DOB.Nanosecond())
	fmt.Println(DOB.Location())

	fmt.Println(DOB.Weekday())

	fmt.Println(DOB.Before(present))
	fmt.Println(DOB.After(present))
	fmt.Println(DOB.Equal(present))

	diff := present.Sub(DOB)
	fmt.Println(diff)
	fmt.Println(diff.Hours())
	fmt.Println(diff.Minutes())
	fmt.Println(diff.Seconds())
	fmt.Println(diff.Nanoseconds())
	fmt.Println(DOB.Add(diff))
	fmt.Println(DOB.Add(-diff))
}

func Second() {
	present := time.Now()
	fmt.Println("Today : ", present.Format("Mon, Jan 2, 2006 at 3:04pm"))
	someTime := time.Date(2017, time.March, 30, 11, 30, 55, 123456, time.Local)
	// 使用 time.Equal()比较时间
	sameTime := someTime.Equal(present)
	fmt.Println("someTime equals to now ? : ", sameTime)
	//计算今天和以前之间的时差
	diff := present.Sub(someTime)
	//将差异转换为天数
	days := int(diff.Hours() / 24)
	fmt.Printf("30th March 2017 was %d days ago \n", days)
}
