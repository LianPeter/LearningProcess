package main

import (
	_ "Library/viperStu"
	"Library/viperStu/test"
	_ "github.com/spf13/pflag"
)

func main() {
	/*// 读取文件配置
	viperStu.BaseConfigFileUsed()

	// 读取命令行参数
	pflag.Parse()
	viperStu.CommandLine()

	// 读取环境变量
	viperStu.AutomaticEnv()

	// 生成一个config.toml配置
	viperStu.GenerateConfig()*/

	test.GetData()
}
