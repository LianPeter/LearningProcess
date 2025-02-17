package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Person  定义一个结构体，用于解析前端发送的 JSON 数据
type Person struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var person Person

		// 解析 JSON 数据
		err := json.NewDecoder(r.Body).Decode(&person)
		if err != nil {
			http.Error(w, "Invalid data", http.StatusBadRequest)
			return
		}

		// 打印接收到的数据
		fmt.Printf("Received: Name = %s, Age = %d\n", person.Name, person.Age)

		// 向客户端返回响应
		response := map[string]string{"status": "success", "message": "Data received"}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

func main() {
	http.HandleFunc("/data", handler)
	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
