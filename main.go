package main

import (
	// "context"
	"fmt"
	"html/template"

	// "my-modules/connection"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

func main() {
	// connection.DatabaseConnect()
	e := echo.New()
	// acces folder
	e.Static("public", "public")
	// routing
	e.GET("/hello", sayHello)
	e.GET("/home", home)
	e.GET("/myproject", myProject)
	e.GET("/testimonials", testimonials)
	e.GET("/contact", contact)
	e.GET("/blogdetail/:jamal", blogDetail)
	e.GET("/update-project/:id", updateProject)

	e.POST("/addproject", addProject)
	e.POST("/delete/:id", deleteData)
	e.POST("/edit/:ygy", editProject)

	// IP addres SERVER
	e.Logger.Fatal(e.Start("localhost:5000"))
}

type blog struct {
	ID          int
	Title       string
	Description string
	StartDate   string
	EndDate     string
	Duration    string
	Author      string
	Image       string
	React       bool
	Vue         bool
	Angular     bool
	Node        bool
}

var dataBlog = []blog{
	{
		Title:       "Dumbways Mobile App 2021",
		Description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque incidunt explicabo abasa lorem dolor",
		StartDate:   "12 januari 2023",
		EndDate:     "16 february 2023",
		Duration:    distanceTime("2022-01-01", "2022-03-01"),
		Author:      "Rhoma Irama",
		React:       true,
		Vue:         true,
		Angular:     false,
		Node:        true,
	},
	{
		Title:       "JavaScipt",
		Description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque incidunt explicabo ab nemo praesentium,",
		StartDate:   "18 januari 2021",
		EndDate:     "14 february 2022",
		Duration:    distanceTime("2022-01-01", "2022-11-01"),
		Author:      "Peter",
		React:       true,
		Vue:         true,
		Angular:     true,
		Node:        true,
	},
	{
		Title:       "Angular JS",
		Description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. some quick adapsing lorem ",
		StartDate:   "14 januari 2020",
		EndDate:     "12 desember 2021",
		Duration:    distanceTime("2022-01-01", "2022-02-01"),
		Author:      "Jamal",
		React:       true,
		Vue:         true,
		Angular:     false,
		Node:        true,
	},
	{
		Title:       "React JS",
		Description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque incidunt explicabo ab nemo praesentium, quae asperiores a, omnis odit optio architecto, molestiae ",
		StartDate:   "14 januari 2020",
		EndDate:     "12 desember 2021",
		Duration:    distanceTime("2022-01-01", "2023-08-12"),
		Author:      "Berners le",
		React:       true,
		Vue:         true,
		Angular:     false,
		Node:        true,
	},
	{
		Title:       "Vue JS",
		Description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque incidunt explicabo ab nemo praesentium, quae asperiores a, omnis odit optio architecto, molestiae ",
		StartDate:   "14 januari 2020",
		EndDate:     "12 desember 2021",
		Duration:    distanceTime("2022-01-01", "2022-03-01"),
		Author:      "Christoper",
		React:       true,
		Vue:         true,
		Angular:     false,
		Node:        false,
	},
}

func sayHello(c echo.Context) error {
	return c.String(http.StatusOK, "hello world")
}
func home(c echo.Context) error {
	tmplData := map[string]interface{}{
		"blog": dataBlog,
	}
	template, err := template.ParseFiles("views/index.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message1": err.Error()})
	}
	return template.Execute(c.Response(), tmplData)

}
func myProject(c echo.Context) error {
	template, err := template.ParseFiles("views/my-project.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message2": err.Error()})
	}
	tmplData := map[string]interface{}{
		"blog": dataBlog,
	}
	return template.Execute(c.Response(), tmplData)
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
	template, err := template.ParseFiles("views/blog-detail.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message5": err.Error()})
	}
	id := c.Param("jamal")
	toInt, _ := strconv.Atoi(id)

	var blogDetail = blog{}
	for index, data := range dataBlog {
		if index == toInt {
			blogDetail = blog{
				Title:       data.Title,
				Author:      data.Author,
				Description: data.Description,
				StartDate:   data.StartDate,
				EndDate:     data.EndDate,
				React:       data.React,
				Angular:     data.Angular,
				Vue:         data.Vue,
				Node:        data.Node,
			}

		}
	}
	dataValueDetail := map[string]interface{}{
		"BlogDetail": blogDetail,
	}

	return template.Execute(c.Response(), dataValueDetail)
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
	newBlog := blog{
		Title:       getName,
		Description: getDescription,
		StartDate:   getStartDate,
		EndDate:     getEndDate,
		Duration:    distanceTime(getStartDate, getEndDate),
		Author:      "user",
		React:       react,
		Angular:     angular,
		Vue:         vue,
		Node:        node,
	}
	dataBlog = append(dataBlog, newBlog)

	return c.Redirect(http.StatusMovedPermanently, "/home")
}
func deleteData(c echo.Context) error {
	index, _ := strconv.Atoi(c.Param("id"))
	fmt.Println("delete ke :", index)
	dataBlog = append(dataBlog[:index], dataBlog[index+1:]...)

	return c.Redirect(http.StatusMovedPermanently, "/home")
}
func distanceTime(time1, time2 string) string {
	date1, _ := time.Parse("2006-01-02", time1)
	date2, _ := time.Parse("2006-01-02", time2)

	timediff := date2.Sub(date1)
	// fmt.Println("result ", timediff)
	days := int(timediff.Hours() / 24)
	// fmt.Println("hari ", days)

	weeks := days / 7
	months := days / 30
	if months > 12 {
		return strconv.Itoa(months/12) + " Tahun"
	}
	if months > 0 {
		return strconv.Itoa(months) + " Bulan"
	}
	if weeks > 0 {
		return strconv.Itoa(weeks) + " Minngu"
	}
	return strconv.Itoa(days) + " Hari"

}
func updateProject(c echo.Context) error {
	template, err := template.ParseFiles("views/update.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"Message6": err.Error()})
	}
	index := c.Param("id")
	toInt, _ := strconv.Atoi(index)
	var blogDetail = blog{}
	for index, data := range dataBlog {
		if index == toInt {
			blogDetail = blog{
				Title:       data.Title,
				Author:      data.Author,
				Description: data.Description,
				StartDate:   data.StartDate,
				EndDate:     data.EndDate,
				React:       data.React,
				Angular:     data.Angular,
				Vue:         data.Vue,
				Node:        data.Node,
			}

		}
	}
	dataValueDetail := map[string]interface{}{
		"BlogDetail": blogDetail,
		"index":      index,
	}
	return template.Execute(c.Response(), dataValueDetail)
}

func editProject(c echo.Context) error {
	index, _ := strconv.Atoi(c.Param("ygy"))
	getName := c.FormValue("nameu")
	getStartDate := c.FormValue("start-dateu")
	getEndDate := c.FormValue("end-dateu")
	getDescription := c.FormValue("textareau")

	var react bool
	var vue bool
	var angular bool
	var node bool

	if c.FormValue("reactu") == "checked" {
		react = true
	} else {
		react = false
	}
	if c.FormValue("vueu") == "checked" {
		vue = true
	} else {
		vue = false
	}
	if c.FormValue("angularu") == "checked" {
		angular = true
	} else {
		angular = false
	}
	if c.FormValue("nodeu") == "checked" {
		node = true
	} else {
		node = false
	}

	var newBlog = blog{
		Title:       getName,
		Description: getDescription,
		StartDate:   getStartDate,
		EndDate:     getEndDate,
		Duration:    distanceTime(getStartDate, getEndDate),
		Author:      "user",
		React:       react,
		Angular:     angular,
		Vue:         vue,
		Node:        node,
	}
	dataBlog[index] = newBlog
	//
	return c.Redirect(http.StatusMovedPermanently, "/home")
}
