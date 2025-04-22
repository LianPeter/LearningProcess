package code

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func ASCII() {
	router := gin.Default()

	router.GET("/someJSON", func(c *gin.Context) {
		data := map[string]interface{}{
			"lang": "GO语言",
			"tag":  "<br>",
		}

		c.AsciiJSON(http.StatusOK, data)
	})

	router.Run(":8080")
}
