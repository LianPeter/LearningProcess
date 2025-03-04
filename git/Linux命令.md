> `ll` 或者 `ls –l` 命令来显示一个文件的属性以及文件所属的用户和组
>

在 Linux 中第一个字符代表这个文件是目录、文件或链接文件等等。

+ 当为 d 则是目录
+ 当为 - 则是文件；
+ 若是 l 则表示为链接文档(link file)；
+ 若是 b 则表示为装置文件里面的可供储存的接口设备(可随机存取装置)；
+ 若是 c 则表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。



> 1. chgrp：更改文件属组
>
> `chgrp [-R] 属组名 文件名`
>
> 2. chown：更改文件所有者，也可以同时更改文件所属组
>
> `chown [–R] 所有者 文件名`
>
> `chown [-R] 所有者:属组名 文件名`
>



> + ls（英文全拼：list files）: 列出目录及文件名
>     - -a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)
>     - -d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
>     - -l ：长数据串列出，包含文件的属性与权限等等数据；(常用)
> + cd（英文全拼：change directory）：切换目录
> + pwd（英文全拼：print work directory）：显示目前的目录
>     - -P ：显示出确实的路径，而非使用链接 (link) 路径。
> + mkdir（英文全拼：make directory）：创建一个新的目录
>     - <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">-m ：配置文件的权限喔！直接配置，不需要看默认权限 (umask) 的脸色～</font>
>     - <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">-p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来！</font>
> + rmdir（英文全拼：remove directory）：删除一个空的目录
>     - **<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">-p ：</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">从该目录起，一次删除多级空目录</font>p ：从该目录起，一次删除多级空目录
> + cp（英文全拼：copy file）: 复制文件或目录
>     - -a：相当於 -pdr 的意思，至於 pdr 请参考下列说明；(常用)
>     - -d：若来源档为链接档的属性(link file)，则复制链接档属性而非文件本身；
>     - -f：为强制(force)的意思，若目标文件已经存在且无法开启，则移除后再尝试一次；
>     - -i：若目标档(destination)已经存在时，在覆盖时会先询问动作的进行(常用)
>     - -l：进行硬式链接(hard link)的链接档创建，而非复制文件本身；
>     - -p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)；
>     - -r：递归持续复制，用於目录的复制行为；(常用)
>     - -s：复制成为符号链接档 (symbolic link)，亦即『捷径』文件；
>     - -u：若 destination 比 source 旧才升级 destination ！
> + rm（英文全拼：remove）: 删除文件或目录
>     - -f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
>     - -i ：互动模式，在删除前会询问使用者是否动作
>     - -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！
> + mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称
>     - -f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
>     - -i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！
>     - -u ：若目标文件已经存在，且 source 比较新，才会升级 (update)
>
> 你可以使用 man [命令] 来查看各个命令的使用文档，如 ：man cp。
>



> + cat  由第一行开始显示文件内容
> + tac  从最后一行开始显示，可以看出 tac 是 cat 的倒着写！
> + nl   显示的时候，顺道输出行号！
> + more 一页一页的显示文件内容
> + less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
> + head 只看头几行
> + tail 只看尾巴几行
>

<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);"></font>

> + ls（英文全拼：list files）: 列出目录及文件名
>     - -a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)
>     - -d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
>     - -l ：长数据串列出，包含文件的属性与权限等等数据；(常用)
> + cd（英文全拼：change directory）：切换目录
> + pwd（英文全拼：print work directory）：显示目前的目录
>     - -P ：显示出确实的路径，而非使用链接 (link) 路径。
> + mkdir（英文全拼：make directory）：创建一个新的目录
>     - -m ：配置文件的权限喔！直接配置，不需要看默认权限 (umask) 的脸色～
>     - -p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来！
> + touch : 创建一个文件
> + rmdir（英文全拼：remove directory）：删除一个空的目录
>     - -p ：从该目录起，一次删除多级空目录
> + cp（英文全拼：copy file）: 复制文件或目录
>     - -a：相当於 -pdr 的意思，至於 pdr 请参考下列说明；(常用)
>     - -d：若来源档为链接档的属性(link file)，则复制链接档属性而非文件本身；
>     - -f：为强制(force)的意思，若目标文件已经存在且无法开启，则移除后再尝试一次；
>     - -i：若目标档(destination)已经存在时，在覆盖时会先询问动作的进行(常用)
>     - -l：进行硬式链接(hard link)的链接档创建，而非复制文件本身；
>     - -p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)；
>     - -r：递归持续复制，用於目录的复制行为；(常用)
>     - -s：复制成为符号链接档 (symbolic link)，亦即『捷径』文件；
>     - -u：若 destination 比 source 旧才升级 destination ！
> + rm（英文全拼：remove）: 删除文件或目录
>     - -f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
>     - -i ：互动模式，在删除前会询问使用者是否动作
>     - -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！
> + mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称
>     - -f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
>     - -i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！
>     - -u ：若目标文件已经存在，且 source 比较新，才会升级 (update)
>





> 在 `vim` 中编辑文件之后，你可以通过以下步骤进行保存：
>
> 1. 按下 `Esc` 键，确保你处于普通模式。
> 2. 输入 `:w` 并按回车键，保存文件但不退出 `vim`。
> 3. 如果你想保存并退出 `vim`，可以输入 `:wq` 然后按回车键。
> 4. 如果你不想保存更改并退出，输入 `:q!`或者`:q` 并按回车键。
>



> yum命令：
>
> 在 Ubuntu 系统上默认没有安装 `yum`，因为 `yum` 是 Red Hat 系列（比如 RHEL、CentOS、  Fedora）中的包管理工具。Ubuntu 使用的是 `apt`（Advanced Package Tool）作为包管理工具。  
>
> `yum [options] [command] [package ...]`
>
> + **<font style="color:rgb(51, 51, 51);">options：</font>**<font style="color:rgb(51, 51, 51);">可选，选项包括-h（帮助），-y（当安装过程提示选择全部为 "yes"），-q（不显示安装的过程）等等。</font>
> + **<font style="color:rgb(51, 51, 51);">command：</font>**<font style="color:rgb(51, 51, 51);">要进行的操作。</font>
> + **<font style="color:rgb(51, 51, 51);">package：</font>**<font style="color:rgb(51, 51, 51);">安装的包名。</font>
>
> ###### <font style="color:rgb(51, 51, 51);">常用命令：</font>
> 1. <font style="color:rgb(51, 51, 51);">列出所有可更新的软件清单命令：yum check-update</font>
> 2. <font style="color:rgb(51, 51, 51);">更新所有软件命令：yum update</font>
> 3. <font style="color:rgb(51, 51, 51);">仅安装指定的软件命令：yum install </font>
> 4. <font style="color:rgb(51, 51, 51);">仅更新指定的软件命令：yum update </font>
> 5. <font style="color:rgb(51, 51, 51);">列出所有可安裝的软件清单命令：yum list</font>
> 6. <font style="color:rgb(51, 51, 51);">删除软件包命令：yum remove </font>
> 7. <font style="color:rgb(51, 51, 51);">查找软件包命令：yum search </font>
> 8. <font style="color:rgb(51, 51, 51);">清除缓存命令:</font>
>
> <font style="color:rgb(51, 51, 51);">yum clean packages: 清除缓存目录下的软件包</font>
>
> <font style="color:rgb(51, 51, 51);">yum clean headers: 清除缓存目录下的 headers</font>
>
> <font style="color:rgb(51, 51, 51);">yum clean oldheaders: 清除缓存目录下旧的 headers</font>
>
> <font style="color:rgb(51, 51, 51);">yum clean, yum clean all (= yum clean packages; yum clean oldheaders) :清除缓存目录下的软件包及旧的 headers</font>
>



> apt命令：
>
> `  apt [options] [command] [package ...]`
>
> + **<font style="color:rgb(51, 51, 51);">options：</font>**<font style="color:rgb(51, 51, 51);">可选，选项包括 -h（帮助），-y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）等等。</font>
> + **<font style="color:rgb(51, 51, 51);">command：</font>**<font style="color:rgb(51, 51, 51);">要进行的操作。</font>
> + **<font style="color:rgb(51, 51, 51);">package</font>**<font style="color:rgb(51, 51, 51);">：安装的包名。</font>
>
> <font style="color:rgb(51, 51, 51);"></font>
>
> <font style="color:rgb(51, 51, 51);">apt常用命令：</font>
>

> + <font style="color:rgb(51, 51, 51);">列出所有可更新的软件清单命令：sudo apt update</font>
> + <font style="color:rgb(51, 51, 51);">升级软件包：sudo apt upgrade</font>
> + <font style="color:rgb(51, 51, 51);">列出可更新的软件包及版本信息：apt list --upgradeable</font>
> + <font style="color:rgb(51, 51, 51);">升级软件包，升级前先删除需要更新软件包：sudo apt full-upgrade</font>
> + <font style="color:rgb(51, 51, 51);">安装指定的软件命令：sudo apt install <package_name></font>
> + <font style="color:rgb(51, 51, 51);">安装多个软件包：sudo apt install  <package_1>  <package_2>  <package_3></font>
> + <font style="color:rgb(51, 51, 51);">更新指定的软件命令：sudo apt update <package_name></font>
> + <font style="color:rgb(51, 51, 51);">显示软件包具体信息,例如：版本号，安装大小，依赖关系等等：sudo apt show <package_name></font>
> + <font style="color:rgb(51, 51, 51);">删除软件包命令：sudo apt remove <package_name></font>
> + <font style="color:rgb(51, 51, 51);">清理不再使用的依赖和库文件: sudo apt autoremove</font>
> + <font style="color:rgb(51, 51, 51);">移除软件包及配置文件: sudo apt purge  <package_name></font>
> + <font style="color:rgb(51, 51, 51);">查找软件包命令： sudo apt search <keyword></font>
> + <font style="color:rgb(51, 51, 51);">列出所有已安装的包：apt list --installed</font>
> + <font style="color:rgb(51, 51, 51);">列出所有已安装的包的版本信息：apt list --all-versions</font>
> + <font style="color:rgb(51, 51, 51);">查看某个包的相关信息：apt show <package_naem></font>
>
> <font style="color:rgb(51, 51, 51);"></font>
>
> <font style="color:rgb(51, 51, 51);">命令可以组合：</font>
>
> `<font style="color:rgb(51, 51, 51);">sudo apt update && sudo apt upgrade -y</font>`
>
> <font style="color:rgb(51, 51, 51);"></font>
>
> 1. <font style="color:rgb(51, 51, 51);">如果我们想安装一个软件包，但如果软件包已经存在，则不要升级它，可以使用 –no-upgrade 选项:</font>
>
> `<font style="color:rgb(51, 51, 51);">sudo apt install <package_name> --no-upgrade</font>`
>
> 2. <font style="color:rgb(51, 51, 51);">如果只想升级，不要安装可以使用 --only-upgrade 参数：</font>
>
> `<font style="color:rgb(51, 51, 51);">sudo apt install <package_name> --only-upgrade</font>`
>
> 3. <font style="color:rgb(51, 51, 51);">如果需要设置指定版本，语法格式如下：</font>
>
> `<font style="color:rgb(51, 51, 51);">sudo apt install <package_name>=<version_number></font>`
>
> <font style="color:rgb(51, 51, 51);"></font>
>



> ### 1. **grep** —— 文本搜索
> `grep` 是用来搜索文本中匹配某个模式（通常是正则表达式）的一种工具。它非常适合用来从大量文本中提取相关信息。
>
> **基本用法：**
>

```bash
grep "模式" 文件名
```

比如，查找文件 `log.txt` 中所有包含 "error" 字样的行：

```bash
grep "error" log.txt
```

**常用选项：**

+ `-i` 忽略大小写。
+ `-r` 递归搜索目录。
+ `-n` 显示行号。
+ `-v` 显示不匹配的行。

例如，查找所有不包含 "warning" 的行：

```bash
grep -v "warning" log.txt
```

### 2. **awk** —— 文本处理和格式化
`awk` 是一个强大的文本处理工具，特别适合处理以空格、制表符等分隔的数据（如 CSV 文件）。它可以按列来提取和操作数据。

**基本用法：**

```bash
awk '{print $1}' 文件名
```

这个命令会打印文件中每一行的第一个字段（以空格或制表符为分隔符）。

**常用示例：**

1. 打印文件 `data.txt` 中第二列的内容：

```bash
awk '{print $2}' data.txt
```

2. 打印每行的第一列和第三列：

```bash
awk '{print $1, $3}' data.txt
```

`awk` 支持非常强大的条件判断和计算功能，可以对文本进行更加复杂的处理。

### 3. **sed** —— 流编辑器
`sed` 是一个强大的文本流编辑工具，常用来执行查找替换、删除行等操作。

**基本用法：**

```bash
sed 's/旧字符串/新字符串/g' 文件名
```

这个命令会将文件中所有的 "旧字符串" 替换为 "新字符串"。

**常用选项：**

+ `-i` 直接修改文件。
+ `s/旧字符串/新字符串/` 执行替换。
+ `g` 表示全局替换。

**例子：**

1. 替换文件 `file.txt` 中所有 "apple" 为 "orange"：

```bash
sed 's/apple/orange/g' file.txt
```

2. 在文件中删除空行：

```bash
sed '/^$/d' file.txt
```

### 4. **find** —— 查找文件
`find` 用来在指定目录下查找文件或目录。它非常灵活，可以根据文件名、大小、修改时间等多个条件进行查找。

**基本用法：**

```bash
find /路径 -name "文件名"
```

比如，查找当前目录下所有 `.txt` 文件：

```bash
find . -name "*.txt"
```

**常用选项：**

+ `-type f` 只查找文件。
+ `-type d` 只查找目录。
+ `-size +100M` 查找大于 100MB 的文件。
+ `-exec` 对查找的文件执行命令。

例如，查找 `.log` 文件并删除：

```bash
find . -name "*.log" -exec rm -f {} \;
```

### 5. **压缩和解压文件**
**压缩文件：**

+ `tar`**：** 用来打包文件或目录并压缩。常见格式 `.tar`, `.tar.gz`, `.tar.bz2` 等。
    - **压缩成 **`.tar.gz`**：**

```bash
tar -czvf archive.tar.gz 文件1 文件2 目录/
```

`-c` 创建新的归档文件，`-z` 使用 gzip 压缩，`-v` 显示压缩过程，`-f` 指定文件名。

    - **压缩成 **`.tar.bz2`**：**

```bash
tar -cjvf archive.tar.bz2 文件1 文件2 目录/
```

+ `zip`**：** 压缩成 `.zip` 文件：

```bash
zip archive.zip 文件1 文件2 目录/
```

**解压文件：**

+ **解压 **`.tar.gz`** 文件：**

```bash
tar -xzvf archive.tar.gz
```

+ **解压 **`.tar.bz2`** 文件：**

```bash
tar -xjvf archive.tar.bz2
```

+ **解压 **`.zip`** 文件：**

```bash
unzip archive.zip
```



