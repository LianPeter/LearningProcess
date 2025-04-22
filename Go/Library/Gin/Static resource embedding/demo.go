package Static_resource_embedding

import (
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"text/template"
)

// 引入 go-assets-builder 生成的资源
// go-assets-builder 生成的 assets.go 中会定义一个 Assets 对象
// 文件结构 Assets.Files["/index.tmpl"]
var (
	Assets = _Assets // 假设 go-assets-builder 生成的是变量 `_Assets`
)

func loadTemplate() (*template.Template, error) {
	t := template.New("")
	for name, file := range Assets.Files {
		if file.IsDir() || !strings.HasSuffix(name, ".tmpl") {
			continue
		}
		h, err := ioutil.ReadAll(file)
		if err != nil {
			return nil, err
		}
		t, err = t.New(name).Parse(string(h))
		if err != nil {
			return nil, err
		}
	}
	return t, nil
}

// main1 是一个简单的示例，演示如何使用 go-assets-builder 嵌入静态资源
func main1() {
	router := gin.New()

	t, err := loadTemplate()
	if err != nil {
		log.Fatal(err)
	}
	router.SetHTMLTemplate(t)

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "/index.tmpl", gin.H{
			"Name": "William",
		})
	})

	router.Run(":8080")
}
