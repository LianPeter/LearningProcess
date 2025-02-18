# 初学go

我在学习go语言的时候发现几个问题 ：

1. 在第一次运行go程序的时候很慢，要十几秒才能运行完，再运行一次就会很快。假如我修改一下代码，程序又会变慢
2.  在使用go.mod的时候，我放在项目的根目录下，运行输出helloworld，发现前面有报错，但是程序输出正常。报红内容是：go: warning: ignoring go.mod in $GOPATH E:\ProgramCode\GO\GoStudy 。当我在项目目录下创建文件夹，并把go.mod放在我创建的文件夹里面，程序不会报红 
1. 在我创建的文件夹里，每一个我都创建了一个go.mod（假如我创建了多个文件夹，用于写代码），当我再创建一个文件夹，里面没有放go.mod，程序正常运行，没有报错，但是我创建了多个.go文件（一般在第三个.go文件就要求不行了，我的每一个.go文件都是package main，因为我不知道没有的话怎么运行），右键运行就会运行不了，让我配置运行变量。

> 让我们逐一解决您在学习 Go 语言时遇到的问题：
>
> ### 1. 首次运行 Go 程序很慢
>
> **原因及解决办法：**
> - **编译与构建**：Go 程序在第一次运行时会经历编译过程，这可能会花费较长时间。如果您在修改代码后重新运行，Go 会使用增量编译（仅编译变更的部分），所以后续运行会更快。
> - **缓存**：Go 使用缓存来加速编译过程。如果程序依赖的包在首次运行时下载和编译，那么第二次运行时会更快，因为这些包已经被缓存。
> - **解决方案**：
>   - 确保您的 Go 环境配置正确。
>   - 可以尝试使用 `go build` 先编译程序，再运行，看看是否有所改善。
>   - 检查是否有其他后台进程影响到编译速度，或者系统是否有其他资源占用问题。
>
> ### 2. 使用 `go.mod` 时的警告
>
> **问题说明**：
> - 您在项目根目录下使用了 `go.mod`，但是程序在 `$GOPATH` 下运行时发出了警告。
>
> **原因及解决办法**：
> - **警告说明**：当您使用 `go.mod` 文件时，Go 语言的模块化系统会忽略 `$GOPATH` 下的 `go.mod` 文件。这是因为 Go 1.11 引入了模块支持，使得 `GOPATH` 的限制不再强制。
> - **解决方案**：
>   - 确保您在项目根目录下运行 `go run` 或 `go build`。
>   - 避免将 `go.mod` 文件放在 `$GOPATH` 目录下。
>   - 您可以通过设置 `GO111MODULE=on` 环境变量来强制使用模块支持，确保模块支持在所有情况下都被启用。
>
> ### 3. 创建文件夹并将 `go.mod` 移动到子文件夹中
>
> **问题说明**：
> - 当您将 `go.mod` 放在子文件夹中时，程序运行正常。
>
> **原因及解决办法**：
> - **原因**：Go 模块系统会在运行时从 `go.mod` 文件中读取配置信息。如果 `go.mod` 文件放在子文件夹中，则 Go 工具链会在该子文件夹中查找模块配置，导致该子文件夹成为模块的根目录。
> - **解决方案**：
>   - 确保 `go.mod` 文件位于项目根目录（或者模块根目录），避免在多个目录中重复放置 `go.mod` 文件。
>   - 维护一个清晰的目录结构，以确保 `go.mod` 文件的位置正确。
>
> ### 4. 多个 `go.mod` 文件及运行问题
>
> **问题说明**：
> - 当您在每个文件夹中创建 `go.mod` 文件时，有些文件夹没有 `go.mod` 文件，导致运行配置问题。
>
> **原因及解决办法**：
> - **原因**：如果您在每个文件夹中都放置 `go.mod` 文件，Go 工具链会认为每个文件夹都是一个独立的模块。这可能导致包管理和构建问题。
> - **解决方案**：
>   - **保持单一 `go.mod` 文件**：通常情况下，您只需要在项目根目录下放置一个 `go.mod` 文件，避免在每个子文件夹中都放置 `go.mod` 文件。
>   - **运行配置**：如果您有多个 `package main` 文件，请确保您在运行时指定正确的 `main` 包。在 IDE（如 GoLand）中，您可以设置运行配置来指定入口点文件。
>   - **文件夹结构**：如果需要将代码组织在多个文件夹中，可以在项目根目录下设置 `go.mod` 文件，然后通过包导入来组织代码。例如，您可以在子文件夹中创建其他 Go 文件作为模块的一部分。
>
> **总结**：请检查您的项目结构，确保 `go.mod` 文件位于项目的根目录，并避免在每个子文件夹中创建 `go.mod` 文件。保持清晰的目录结构可以帮助解决大多数模块和构建相关的问题。如果您使用 IDE，确保配置正确并指向正确的模块和包。



## 如何把编译后的二进制文件放在指定目录

### 配置 GoLand 运行/调试配置

1. 打开 GoLand，并加载你的项目。
2. 在菜单栏中，点击 `Run -> Edit Configurations...` 打开运行/调试配置窗口。
3. 在左侧栏中找到你的项目运行配置，或者点击 `+` 创建一个新的 `Go Build` 配置。
4. 配置运行选项：
   - **Name**: 为你的配置起一个名称，比如 `GoStudy Build`.
   - **Kind**: 选择 `File`.
   - **File**: 选择你的 `main.go` 文件所在的路径（如 `E:/ProgramCode/GO/src/GitHub/LianPeter/GoStudy/main.go`）。
5. 在右侧栏的 **Output Directory** 中，点击文件夹图标，选择 `E:/ProgramCode/GO/bin` 作为输出目录。
6. 在 **Before launch: Build Artifacts** 部分，确保选中 `Build`，并将生成的二进制文件名指定为你期望的名称，例如 `GoStudy.exe`。
7. 确认配置并点击 `Apply` 和 `OK`。

我通过编辑配置模板，接下来右键运行，二进制文件就被放到你指定的目录了。

## 使用append的问题

```go
import main
func main() {
    // 将切片传递给函数，函数对切片进行的操作是改变原切片的
	slc := []string{"C#", "Python", "C", "Perl"}
	fmt.Println("初始切片: ", slc)
	//将切片传递给函数
	Array.SliceFunc(slc)
	fmt.Println("最终切片:", slc)
}

func SliceFunc(element []string) {
	// 修改给定的切片
	element[2] = "Go"
	element = append(element, "Java")
	fmt.Println("修改切片: ", element)
}
```

最终输出结果：

```
初始切片:  [C# Python C Perl]
修改切片:  [C# Python Go Perl Java]
最终切片: [C# Python Go Perl]
```

> 在使用append时，添加了元素，但是最终切片没有所添加的元素
>
> > <font color="red" size=4>分析：</font>
> >
> > 在 Go 语言中，切片是引用类型，但当你在函数中使用 `append` 时，它可能会导致切片的重新分配。在你的 `SliceFunc` 函数中，虽然你传递了切片 `element`，但当你使用 `append` 向切片中添加新元素时，Go 会检查当前切片的容量。如果当前切片的容量不足以容纳新元素，它会创建一个新的切片，将原切片的内容复制到新的切片中，然后再将新元素添加到这个新的切片中。
> >
> > 因此，`append` 创建了一个新的切片，这个新的切片与传递给 `SliceFunc` 的原始切片是不同的。虽然你在函数内部修改了切片的内容，但添加 `Java` 时产生的新切片并没有反映到原始切片 `slc` 上，因为 `slc` 仍然指向原来的切片。
> >
> > ### 总结
> >
> > 1. 切片是引用类型，但 `append` 可能导致切片重新分配。
> > 2. 在 `SliceFunc` 中，虽然你修改了原切片的元素，但添加的元素在新的切片中，没有更新原切片。
> > 3. 只有在原切片容量足够时，`append` 会影响到原切片。否则，原切片保持不变。
> > 4. 如果需要用到添加的元素，可以`return element`



## 指向数组的指针

```go
package main

import "fmt"

//定义个函数
func updatearray(funarr *[5]int) {

    // 使用索引值更改数组
    (*funarr)[4] = 750

    //您也可以编写
    //上面的代码行
    // funarr[4] = 750
}

func main() {

    //获取指向数组的指针
    arr := [5]int{78, 89, 45, 56, 14}

    //将指针传递给数组
    //并执行updatearray
    updatearray(&arr)

    //更新后的数组
    fmt.Println(arr)
}
```

**输出**

```
[78 89 45 56 750]
```

> [!CAUTION]
>
> 在Golang中，不建议使用指向数组的指针作为函数的参数，因为代码变得难以阅读。同样，它也不是实现此功能的好方法。为此，您可以使用slice而不是传递指针。

<font color="red" size=4>实例：</font>

```go
//使用切片作为函数的参数
package main

import "fmt"

func updateslice(funarr []int) {
    //更新值
    //在指定的索引处
    funarr[4] = 750
}

func main() {

    //定义一个切片
    s := [5]int{78, 89, 45, 56, 14}

    //将切片传递到
    //函数updateslice
    updateslice(s[:])  // 传入的是切片，而不是指向数组的指针

    //显示结果
    fmt.Println(s)
}
```



## 多接口

> [!CAUTION]
>
> 在Go语言中，不允许在两个或多个接口中创建相同的名称方法。如果尝试这样做，则您的程序将崩溃。让我们借助示例来讨论多个接口。

示例

```go
//多个接口的概念
package main

import "fmt"

// 接口 1
type AuthorDetails interface {
    details()
}

// 接口 2
type AuthorArticles interface {
    articles()
}

// 结构体
type author struct {
    a_name    string
    branch    string
    college   string
    year      int
    salary    int
    particles int
    tarticles int
}

//实现接口方法1
func (a author) details() {

    fmt.Printf("作者: %s", a.a_name)
    fmt.Printf("\n部分: %s 通过日期: %d", a.branch, a.year)
    fmt.Printf("\n学校名称: %s", a.college)
    fmt.Printf("\n薪水: %d", a.salary)
    fmt.Printf("\n出版文章数: %d", a.particles)

}

// 实现接口方法 2
func (a author) articles() {

    pendingarticles := a.tarticles - a.particles
    fmt.Printf("\n待定文章: %d", pendingarticles)
}

// Main value
func main() {

    //结构体赋值
    values := author{
        a_name:    "Mickey",
        branch:    "Computer science",
        college:   "XYZ",
        year:      2012,
        salary:    50000,
        particles: 209,
        tarticles: 309,
    }

    // 访问使用接口1的方法
    var i1 AuthorDetails = values
    i1.details()

    //访问使用接口2的方法
    var i2 AuthorArticles = values
    i2.articles()

}
```

**输出：**

```
作者: Mickey
部分: Computer science 通过日期: 2012
学校名称: XYZ
薪水: 50000
出版文章数: 209
待定文章: 100
```

**用法解释：**如上例所示，我们有两个带有方法的接口，即details()和Articles()。在这里，details()方法提供了作者的基本详细信息，而articles()方法提供了作者的待定文章。



## 键盘输入方式

在 Go 语言中，可以通过多种方式从键盘获取输入。以下是几种常见的方式：

### 1. `fmt.Scan` 和 `fmt.Scanln`
`fmt.Scan` 和 `fmt.Scanln` 用于从标准输入读取数据，`fmt.Scan` 不会在读取完一个输入后自动换行，而 `fmt.Scanln` 会在读取完输入后自动换行。

**示例：**
```go
package main

import "fmt"

func main() {
    var input string
    fmt.Print("请输入一些文本: ")
    fmt.Scan(&input)
    fmt.Println("你输入了:", input)
}
```

### 2. `fmt.Scanf`
`fmt.Scanf` 可以根据格式化字符串读取输入。

**示例：**
```go
package main

import "fmt"

func main() {
    var name string
    var age int
    fmt.Print("请输入你的名字和年龄: ")
    fmt.Scanf("%s %d", &name, &age)
    fmt.Printf("你的名字是 %s，年龄是 %d\n", name, age)
}
```

### 3. `bufio.NewReader` 和 `bufio.NewScanner`
使用 `bufio` 包的 `NewReader` 和 `NewScanner` 可以更灵活地读取输入，适用于需要处理多行输入的情况。

**示例：`bufio.NewReader`**
```go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    fmt.Print("请输入一些文本: ")
    input, _ := reader.ReadString('\n')
    fmt.Println("你输入了:", input)
}
```

**示例：`bufio.NewScanner`**
```go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    fmt.Print("请输入一些文本: ")
    scanner.Scan()
    input := scanner.Text()
    fmt.Println("你输入了:", input)
}
```

### 4. `os.Stdin.Read`
直接从 `os.Stdin` 读取数据，可以更底层地处理输入。

**示例：**
```go
package main

import (
    "fmt"
    "os"
)

func main() {
    var input [100]byte
    fmt.Print("请输入一些文本: ")
    n, _ := os.Stdin.Read(input[:])
    fmt.Println("你输入了:", string(input[:n]))
}
```

### 5. 使用第三方库
可以使用第三方库，如 `github.com/manifoldco/promptui`，来实现更复杂的交互式输入。

**示例：**
```go
package main

import (
    "fmt"
    "github.com/manifoldco/promptui"
)

func main() {
    prompt := promptui.Prompt{
        Label: "请输入一些文本",
    }

    result, err := prompt.Run()
    if err != nil {
        fmt.Printf("Prompt failed %v\n", err)
        return
    }

    fmt.Printf("你输入了 %q\n", result)
}
```

每种方式都有其适用场景，选择适合你的需求的方法来处理键盘输入。



## `defer` 和 `recover` 来处理运行时的异常（如除零错误）

<font color="red" size=4>例1：</font>

#### 包导入和 `main` 函数

```go
package main

import (
   "fmt"
)

func main() {
   fmt.Println(SaveDivide(10, 0))
   fmt.Println(SaveDivide(10, 10))
}
```

- `package main`：定义一个可独立运行的包，即可执行程序。
- `import "fmt"`：导入 `fmt` 包，以便使用 `Println` 函数进行输出。
- `func main()`：主函数，是程序的入口。

#### `SaveDivide` 函数

```go
func SaveDivide(num1, num2 int) int {
   defer func() {
      fmt.Println(recover())
   }()
   quotient := num1 / num2
   return quotient
}
```

- `func SaveDivide(num1, num2 int) int`：定义了一个函数 `SaveDivide`，它接受两个整数参数 `num1` 和 `num2`，返回一个整数。
- `defer func() { fmt.Println(recover()) }()`：定义了一个匿名函数，并使用 `defer` 关键字将其延迟执行。`defer` 语句会在包含它的函数 `SaveDivide` 返回后（或运行结束后）才会执行。
  - `recover()`：内建函数，用于恢复一个由 `panic` 引发的运行时错误。如果没有错误发生，`recover` 会返回 `nil`。
- `quotient := num1 / num2`：执行除法运算，将结果存储在 `quotient` 变量中。如果 `num2` 为 0，这将引发一个运行时错误（`panic`），程序会跳到 `defer` 语句中执行恢复。
- `return quotient`：返回除法的结果。

### 运行结果

让我们分析这段代码的输出：

```go
func main() {
   fmt.Println(SaveDivide(10, 0))
   fmt.Println(SaveDivide(10, 10))
}
```

1. **`fmt.Println(SaveDivide(10, 0))`**:
   - 调用 `SaveDivide` 函数，参数为 `10` 和 `0`。
   - 在执行 `quotient := num1 / num2` 时，由于 `num2` 为 `0`，引发运行时错误（`panic`）。
   - `defer` 语句中的匿名函数被调用，`recover` 捕获错误，返回错误信息（在这种情况下返回 `runtime error: integer divide by zero`），并打印出来。
   - `SaveDivide` 函数返回 `0`，因为在 `panic` 发生时，函数的正常执行流程被打断，未明确返回值时，默认返回零值。

2. **`fmt.Println(SaveDivide(10, 10))`**:
   - 调用 `SaveDivide` 函数，参数为 `10` 和 `10`。
   - 执行 `quotient := num1 / num2`，计算结果为 `1`。
   - `defer` 语句中的匿名函数被调用，`recover` 没有捕获到错误，返回 `nil`，并打印 `nil`。
   - `SaveDivide` 函数返回 `1`。

### 最终输出

```plaintext
runtime error: integer divide by zero
0
nil
1
```

- 第一行 `runtime error: integer divide by zero` 是由 `recover` 捕获并打印的错误信息。
- 第二行 `0` 是由于 `SaveDivide(10, 0)` 的返回值。
- 第三行 `nil` 是由于 `recover` 没有捕获到错误，返回 `nil`。
- 第四行 `1` 是由于 `SaveDivide(10, 10)` 的返回值。

### 关键点总结

1. **`defer`**：用于延迟执行函数调用，通常用于资源释放或异常处理。
2. **`recover`**：用于恢复 `panic`，防止程序崩溃。
3. **异常处理**：通过 `defer` 和 `recover` 组合可以优雅地处理运行时错误，如除零错误。

<font color="red" size=4>例2：</font>

#### 包导入和 `main` 函数

```go
package main

import "fmt"

func main() {
	fmt.Println("Calling x from main.")
	x()
	fmt.Println("Returned from x.")
}
```

- `package main`：定义一个可独立运行的包，即可执行程序。
- `import "fmt"`：导入 `fmt` 包，以便使用 `Println` 函数进行输出。
- `func main()`：主函数，是程序的入口。它首先打印一条消息，然后调用函数 `x`，最后打印一条消息表明已从 `x` 返回。

#### `x` 函数

```go
func x() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in x", r)
		}
	}()
	fmt.Println("Executing x...")
	fmt.Println("Calling y.")
	y(0)
	fmt.Println("Returned normally from y.")
}
```

- `func x()`：定义了函数 `x`。
- `defer func() { ... }()`：定义了一个匿名函数，并使用 `defer` 关键字将其延迟执行。该匿名函数内使用 `recover` 捕获可能的运行时错误。如果 `recover` 捕获到错误（`r != nil`），则打印恢复信息。
- `fmt.Println("Executing x...")`：打印消息表示正在执行 `x`。
- `fmt.Println("Calling y.")`：打印消息表示即将调用函数 `y`。
- `y(0)`：调用函数 `y`，传入参数 `0`。
- `fmt.Println("Returned normally from y.")`：如果 `y` 函数正常返回，则打印此消息。

#### `y` 函数

```go
func y(i int) {
	fmt.Println("Executing y....")
	if i > 2 {
		fmt.Println("Panicking!")
		panic(fmt.Sprintf("%v", i))
	}
	defer fmt.Println("Defer in y", i)
	fmt.Println("Printing in y", i)
	y(i + 1)
}
```

- `func y(i int)`：定义了一个递归函数 `y`，它接受一个整数参数 `i`。
- `fmt.Println("Executing y....")`：打印消息表示正在执行 `y`。
- `if i > 2 { ... }`：如果 `i` 大于 `2`，则打印 "Panicking!" 并触发 `panic`。
  - `panic(fmt.Sprintf("%v", i))`：引发 `panic`，并传递当前的 `i` 值作为错误信息。
- `defer fmt.Println("Defer in y", i)`：定义了一个 `defer` 语句，将在函数返回前打印 `i` 的值。
- `fmt.Println("Printing in y", i)`：打印当前 `i` 的值。
- `y(i + 1)`：递归调用 `y` 函数，将 `i` 加 `1` 作为参数传递。

### 运行流程和输出

当运行此程序时，会依次执行以下步骤：

1. `main` 函数开始执行，打印 "Calling x from main."。
2. 调用 `x` 函数：
   - 打印 "Executing x..."。
   - 打印 "Calling y."。
   - 调用 `y(0)`。

3. `y(0)` 执行：
   - 打印 "Executing y...."。
   - 打印 "Printing in y 0"。
   - 递归调用 `y(1)`。

4. `y(1)` 执行：
   - 打印 "Executing y...."。
   - 打印 "Printing in y 1"。
   - 递归调用 `y(2)`。

5. `y(2)` 执行：
   - 打印 "Executing y...."。
   - 打印 "Printing in y 2"。
   - 递归调用 `y(3)`。

6. `y(3)` 执行：
   - 打印 "Executing y...."。
   - `i > 2` 为真，打印 "Panicking!" 并触发 `panic`。
   - `defer` 语句被执行，打印 "Defer in y 3"。
   - `recover` 捕获到 `panic`，返回到 `x` 函数的 `defer` 匿名函数中。
   - 打印 "Recovered in x 3"。

7. 返回到 `x` 函数，打印 "Returned from x."。
8. `main` 函数继续执行，打印 "Returned from x."。

### 最终输出

```plaintext
Calling x from main.
Executing x...
Calling y.
Executing y....
Printing in y 0
Executing y....
Printing in y 1
Executing y....
Printing in y 2
Executing y....
Panicking!
Defer in y 3
Recovered in x 3
Returned from x.
Returned from x.
```

### 关键点总结

1. **`defer`**：用于延迟执行函数调用，通常用于资源释放或异常处理。
2. **`recover`**：用于恢复 `panic`，防止程序崩溃。
3. **递归**：`y` 函数演示了递归调用和如何在递归中处理异常。
4. **`panic`**：用于显式引发运行时错误。

这段代码展示了如何在递归函数中使用 `defer` 和 `recover` 处理异常情况，以确保程序的健壮性。





# 代码解释

## Demo1

```go
type Login struct {
    // binding:"required"修饰的字段，若接收为空值，则报错，是必须字段
    User    string `form:"username" json:"user" uri:"user" xml:"user" binding:"required"`
    Pssword string `form:"password" json:"password" uri:"password" xml:"password" binding:"required"`
}
```

这段代码定义了一个结构体 `Login`，用于处理登录请求的数据。我们逐行解析：

```go
type Login struct {
    // binding:"required"修饰的字段，若接收为空值，则报错，是必须字段
    User    string `form:"username" json:"user" uri:"user" xml:"user" binding:"required"`
    Pssword string `form:"password" json:"password" uri:"password" xml:"password" binding:"required"`
}
```

### 代码解释：

1. **结构体定义**：`Login` 是一个结构体类型，主要用于表示登录请求的相关数据。这个结构体包含两个字段：`User` 和 `Pssword`。

2. **字段解释**：
   - `User` 和 `Pssword` 都是字符串类型的字段，分别用于存储用户名和密码。
   - 每个字段使用了 **标签（tags）** 进行修饰，以支持不同数据格式的自动绑定（如表单、JSON、URI、XML）。

3. **标签说明**：
   - `form:"username"`：指定表单中的字段名为 `username`，如果客户端以表单格式提交数据，`username` 字段会映射到 `User` 字段。
   - `json:"user"`：指定 JSON 数据中的字段名为 `user`，这允许在 JSON 数据中使用 `user` 字段对应到 `User` 字段。
   - `uri:"user"`：指定 URI 参数中的字段名为 `user`，可以将 URL 路径中的 `user` 参数绑定到 `User` 字段。
   - `xml:"user"`：指定 XML 数据中的字段名为 `user`。
   - `binding:"required"`：此标签指定 `User` 和 `Pssword` 是必须字段。如果请求中缺少这两个字段，框架会自动验证并返回错误信息。

### 注意事项：

- `binding:"required"` 标签通常与 **Gin 框架** 一起使用，Gin 会在请求数据绑定到结构体时自动进行必填字段验证。
- `Pssword` 字段的名称可能有拼写错误，按标准应该为 `Password`，但这只是代码中不影响功能的细节。

### 总结：

这个结构体 `Login` 通过使用标签实现了多格式的数据绑定和必填字段校验功能，非常适合用于 API 接收和验证登录请求。









# viper库

### 通过配置文件读取

```go
func BaseConfigFileUsed() {
	viper.SetConfigName("config.yaml")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.SetDefault("redis.port", 6381)
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("read config.yaml failed: %v", err)
	}
	fmt.Println(viper.Get("database")) // 获取配置文件信息

	fmt.Println("mysql ip: ", viper.Get("database.ip"))
	fmt.Println("mysql host: ", viper.Get("database.host"))
	fmt.Println("mysql port: ", viper.Get("database.port"))
	fmt.Println("mysql user: ", viper.Get("database.username"))
	fmt.Println("mysql password: ", viper.Get("database.password"))
	fmt.Println("mysql database: ", viper.Get("database.database"))

	fmt.Println("redis ip: ", viper.Get("redis.ip"))
	fmt.Println("redis port: ", viper.Get("redis.port"))
}
```



### 通过命令行读取配置

Viper 可以和 `pflag` 库（`github.com/spf13/pflag`）配合使用来解析命令行参数。以下是一个示例：

1. 安装 `pflag` 库：

   ```sh
   go get github.com/spf13/pflag
   ```

2. 修改代码以使用 `pflag`：

   ```go
   package viperStu
   
   import (
       "fmt"
       "github.com/spf13/pflag"
       "github.com/spf13/viper"
       "log"
   )
   
   func BaseConfigFileUsed() {
       // 定义命令行参数
       pflag.String("mysql.ip", "localhost", "MySQL IP address")
       pflag.Int("mysql.port", 3306, "MySQL port")
       pflag.String("mysql.user", "root", "MySQL user")
       pflag.String("mysql.password", "password", "MySQL password")
       pflag.String("mysql.database", "testdb", "MySQL database")
       pflag.Parse()
   
       // 绑定命令行参数到Viper
       viper.BindPFlags(pflag.CommandLine)
   
       // 读取配置文件
       viper.SetConfigName("config")
       viper.SetConfigType("yaml")
       viper.AddConfigPath(".")
       viper.SetDefault("redis.port", 6381)
       err := viper.ReadInConfig()
       if err != nil {
           log.Fatalf("read config.yaml failed: %v", err)
       }
   
       fmt.Println("mysql ip: ", viper.GetString("mysql.ip"))
       fmt.Println("mysql port: ", viper.GetInt("mysql.port"))
       fmt.Println("mysql user: ", viper.GetString("mysql.user"))
       fmt.Println("mysql password: ", viper.GetString("mysql.password"))
       fmt.Println("mysql database: ", viper.GetString("mysql.database"))
   
       fmt.Println("redis ip: ", viper.GetString("redis.ip"))
       fmt.Println("redis port: ", viper.GetInt("redis.port"))
   }
   ```

### 通过环境变量读取配置

Viper 也可以读取环境变量。以下是一个示例：

1. 修改代码以使用环境变量：

   ```go
   package viperStu

   import (
       "fmt"
       "github.com/spf13/viper"
       "log"
   )

   func BaseConfigFileUsed() {
       // 绑定环境变量前缀
       viper.SetEnvPrefix("MYAPP")
       viper.AutomaticEnv()

       // 读取配置文件
       viper.SetConfigName("config")
       viper.SetConfigType("yaml")
       viper.AddConfigPath(".")
       viper.SetDefault("redis.port", 6381)
       err := viper.ReadInConfig()
       if err != nil {
           log.Fatalf("read config.yaml failed: %v", err)
       }

       fmt.Println("mysql ip: ", viper.GetString("MYSQL_IP"))
       fmt.Println("mysql port: ", viper.GetInt("MYSQL_PORT"))
       fmt.Println("mysql user: ", viper.GetString("MYSQL_USER"))
       fmt.Println("mysql password: ", viper.GetString("MYSQL_PASSWORD"))
       fmt.Println("mysql database: ", viper.GetString("MYSQL_DATABASE"))

       fmt.Println("redis ip: ", viper.GetString("redis.ip"))
       fmt.Println("redis port: ", viper.GetInt("redis.port"))
   }
   ```

2. 设置环境变量：

   ```sh
   export MYSQL_IP=localhost
   export MYSQL_PORT=3306
   export MYSQL_USER=root
   export MYSQL_PASSWORD=password
   export MYSQL_DATABASE=testdb
   ```

通过以上方法，你可以使用命令行参数和环境变量来读取配置，并且可以结合文件配置，实现更灵活的配置管理。



> 有时候，我们想要将程序中生成的配置，或者所做的修改保存下来。viper 提供了接口！

- `WriteConfig`：将当前的 viper 配置写到预定义路径，如果没有预定义路径，返回错误。将会覆盖当前配置；
- `SafeWriteConfig`：与上面功能一样，但是如果配置文件存在，则不覆盖；
- `WriteConfigAs`：保存配置到指定路径，如果文件存在，则覆盖；
- `SafeWriteConfig`：与上面功能一样，但是入股配置文件存在，则不覆盖。

<font color="red" size=4>生成一个`config.toml`配置：</font>

```go
package main

import (
  "log"

  "github.com/spf13/viper"
)

func main() {
  viper.SetConfigName("config")
  viper.SetConfigType("toml")
  viper.AddConfigPath(".")

  viper.Set("app_name", "awesome web")
  viper.Set("log_level", "DEBUG")
  viper.Set("mysql.ip", "127.0.0.1")
  viper.Set("mysql.port", 3306)
  viper.Set("mysql.user", "root")
  viper.Set("mysql.password", "123456")
  viper.Set("mysql.database", "awesome")

  viper.Set("redis.ip", "127.0.0.1")
  viper.Set("redis.port", 6381)

  err := viper.SafeWriteConfig()
  if err != nil {
    log.Fatal("write config failed: ", err)
  }
}
```

### 监听文件修改

viper 可以监听文件修改，热加载配置。因此不需要重启服务器，就能让配置生效。

```go
package main

import (
  "fmt"
  "log"
  "time"

  "github.com/spf13/viper"
)

func main() {
  viper.SetConfigName("config")
  viper.SetConfigType("toml")
  viper.AddConfigPath(".")
  err := viper.ReadInConfig()
  if err != nil {
    log.Fatal("read config failed: %v", err)
  }

  viper.WatchConfig()

  fmt.Println("redis port before sleep: ", viper.Get("redis.port"))
  time.Sleep(time.Second * 10)
  fmt.Println("redis port after sleep: ", viper.Get("redis.port"))
}
```

只需要调用`viper.WatchConfig`，viper 会自动监听配置修改。如果有修改，重新加载的配置。

上面程序中，我们先打印`redis.port`的值，然后`Sleep` 10s。在这期间修改配置中`redis.port`的值，`Sleep`结束后再次打印。 发现打印出修改后的值：

```
redis port before sleep:  7381
redis port after sleep:  73810
```

另外，还可以为配置修改增加一个回调：

```go
viper.OnConfigChange(func(e fsnotify.Event) {
  fmt.Printf("Config file:%s Op:%s\n", e.Name, e.Op)
})
```

这样文件修改时会执行这个回调。

viper 使用[fsnotify](https://github.com/fsnotify/fsnotify)这个库来实现监听文件修改的功能。

