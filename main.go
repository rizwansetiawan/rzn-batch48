package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {

	e := echo.New()
	datas()
	e.GET("/say", sayHello)

	e.Logger.Fatal(e.Start("localhost:5000"))
}
func sayHello(c echo.Context) error {
	return c.String(http.StatusOK, "hello world")
}
func datas() {
	var person map[string]string = map[string]string{
		"firstName":  "muhamad",
		"middleName": "rizwan",
		"lastName":   "setiawan",
	}
	fmt.Println(person)
	var dataUser = [...]string{
		"halo",
		"nama",
		"saya",
	}
	for i := 0; i < len(dataUser); i++ {
		fmt.Println(dataUser[i], person)
	}
	var number = 1
	var number2 = 6
	result := number + number2
	fmt.Println(result)
}
