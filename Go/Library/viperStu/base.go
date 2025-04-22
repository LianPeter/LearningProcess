package viperStu

import (
	"fmt"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"log"
)

// BaseConfigFileUsed 读取配置文件
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

// CommandLine 绑定命令行参数
func CommandLine() {
	pflag.Int("redis.port", 8381, "Redis port to connect")

	// 绑定命令行
	err := viper.BindPFlags(pflag.CommandLine)
	if err != nil {
		return
	}
	fmt.Println(viper.Get("redis.port"))
}

// AutomaticEnv 自动读取环境变量
func AutomaticEnv() {
	// 绑定环境变量
	viper.AutomaticEnv()
	fmt.Println("GOPATH: ", viper.Get("GOPATH"))
}

// GenerateConfig 生成一个config.toml配置
func GenerateConfig() {
	viper.SetConfigName("config1")
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
