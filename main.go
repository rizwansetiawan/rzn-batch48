package main

import (
	"fmt"
	"html/template"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {

	e := echo.New()
	// acces folder
	e.Static("public", "public")
	// routing
	e.GET("/hello", sayHello)
	e.GET("/home", home)
	e.GET("/myproject", myProject)
	e.GET("/testimonials", testimonials)
	e.GET("/contact", contact)
	e.GET("/blogdetail/:id", blogDetail)

	e.POST("/addproject", addProject)

	// IP addres SEVER
	e.Logger.Fatal(e.Start("localhost:5000"))
}
func sayHello(c echo.Context) error {
	return c.String(http.StatusOK, "hello world")
}
func home(c echo.Context) error {
	template, err := template.ParseFiles("views/index.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message1": err.Error()})
	}
	return template.Execute(c.Response(), nil)
}
func myProject(c echo.Context) error {
	template, err := template.ParseFiles("views/my-project.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message2": err.Error()})
	}
	return template.Execute(c.Response(), nil)
}
func testimonials(c echo.Context) error {
	template, err := template.ParseFiles("views/testimonials.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message3": err.Error()})
	}
	return template.Execute(c.Response(), nil)
}
func contact(c echo.Context) error {
	template, err := template.ParseFiles("views/contact.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message4": err.Error()})
	}
	return template.Execute(c.Response(), nil)
}
func blogDetail(c echo.Context) error {
	id := c.Param("id")
	createData := map[string]string{
		"id":          id,
		"title":       "dumbways mobile app",
		"description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque incidunt explicabo ab nemo praesentium, quae asperiores a, omnis odit optio architecto, molestiae quia officiis modi. Laboriosam nemo perspiciatis enim corporis dolorem non architecto, odit, placeat necessitatibus fugiat ea facilis repellat adipisicing elit. Itaque incidunt explicabo ab nemo praesentium, quae asperiores a, omnis odit optio architecto, molestiae quia officiis modi. Laboriosam nemo perspiciatis enim corporis dolorem non architecto, odit, placeat necessitatibus fugiat ea facilis repellat..",
	}
	template, err := template.ParseFiles("views/blog-detail.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message5": err.Error()})
	}
	return template.Execute(c.Response(), createData)
}
func addProject(c echo.Context) error {

	getName := c.FormValue("name")
	getStartDate := c.FormValue("start-date")
	getEndDate := c.FormValue("end-date")
	getDescription := c.FormValue("textarea")

	var react bool
	var vue bool
	var angular bool
	var node bool

	if c.FormValue("react") == "checked" {
		react = true
	} else {
		react = false
	}
	if c.FormValue("vue") == "checked" {
		vue = true
	} else {
		vue = false
	}
	if c.FormValue("angular") == "checked" {
		angular = true
	} else {
		angular = false
	}
	if c.FormValue("node") == "checked" {
		node = true
	} else {
		node = false
	}

	println("name :", getName)
	println("start-date:", getStartDate)
	println("end-date:", getEndDate)
	println("react:", react)
	println("vue:", vue)
	println("angular:", angular)
	println("vue:", node)
	println("description :", getDescription)
	fmt.Println()

	return c.Redirect(http.StatusMovedPermanently, "/myproject")
}
