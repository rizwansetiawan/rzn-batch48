package main

import (
	// PACAKAGE
	"context"
	"database/sql"
	"fmt"
	"html/template"
	"my-modules/connection"
	"my-modules/middleware"
	"net/http"
	"strconv"
	"time"

	// DEPENDENCIES
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	connection.DatabaseConnect()
	e := echo.New()
	e.Use(session.Middleware(sessions.NewCookieStore([]byte("cookies"))))
	// acces folder
	e.Static("/public", "public")
	e.Static("/uploads", "uploads")
	// routing
	e.GET("/hello", sayHello)
	e.GET("/home", home)
	e.GET("/myproject", myProject)
	e.GET("/testimonials", testimonials)
	e.GET("/contact", contact)
	e.GET("/blogdetail/:id", blogDetail)
	e.GET("/update-project/:id", updateProject)
	e.GET("/register", register)
	e.GET("/login", login)

	e.POST("/addproject", middleware.UploadFile(addProject))
	e.POST("/delete/:delete", deleteData)
	e.POST("/edit/:edit", editProject)
	e.POST("/submitRegister", submitRegister)
	e.POST("/submitLogin", submitLogin)
	e.POST("/logout", logout)

	// IP addres SEVER
	e.Logger.Fatal(e.Start("localhost:5000"))
}

type blog struct {
	ID          int
	Title       string
	Description string
	StartDate   time.Time
	EndDate     time.Time
	Date1       string
	Date2       string
	Duration    string
	Author      string
	Image       string
	React       bool
	Vue         bool
	Angular     bool
	Node        bool
}
type dataUser struct {
	ID       int
	Name     string
	Email    string
	Password string
}

func sayHello(c echo.Context) error {
	return c.String(http.StatusOK, "hello world")
}
func home(c echo.Context) error {
	getData := "SELECT tb_blog.id,tb_user.name,tb_blog.title,tb_blog.description,tb_blog.image,tb_blog.start_date,tb_blog.end_date,tb_blog.react,tb_blog.vue,tb_blog.angular,tb_blog.node FROM tb_blog LEFT JOIN tb_user ON tb_user.id = tb_blog.author_id"
	connectDb, errDb := connection.Connect.Query(context.Background(), getData)
	if errDb != nil {
		fmt.Println("error get database:", errDb.Error())
	}
	var result []blog
	for connectDb.Next() {
		var each = blog{}

		var tempAuthor sql.NullString // for convert nul in database covert to string empty using SQl.nullString

		err := connectDb.Scan(&each.ID, &tempAuthor, &each.Title, &each.Description, &each.Image, &each.StartDate, &each.EndDate, &each.React, &each.Vue, &each.Angular, &each.Node)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
		}
		each.Duration = distanceTime(each.StartDate, each.EndDate)
		each.Author = tempAuthor.String
		result = append(result, each)
	}

	template, err := template.ParseFiles("views/index.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message1": err.Error()})
	}
	sess, errsess := session.Get("session", c)
	if errsess != nil {
		return c.JSON(http.StatusInternalServerError, errsess.Error())
	}
	flash := map[string]interface{}{
		"flashMessage": sess.Values["message"],
		"flashStatus":  sess.Values["status"],
		"flashName":    sess.Values["name"],
		"isLogin":      sess.Values["isLogin"],
		"blog":         result,
	}
	delete(sess.Values, "message")
	// delete(sess.Values, "status")
	sess.Save(c.Request(), c.Response())
	return template.Execute(c.Response(), flash)

}
func myProject(c echo.Context) error {
	template, err := template.ParseFiles("views/my-project.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message2": err.Error()})
	}
	// tmplData := map[string]interface{}{
	// 	"blog": dataBlog,
	// }
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
	id, _ := strconv.Atoi(c.Param("id"))
	var blogDetail = blog{}
	var tempAuthor sql.NullString
	errDb := connection.Connect.QueryRow(context.Background(), "SELECT tb_blog.id,tb_user.name,tb_blog.title,tb_blog.description,tb_blog.image,tb_blog.start_date,tb_blog.end_date,tb_blog.react,tb_blog.vue,tb_blog.angular,tb_blog.node FROM tb_blog LEFT JOIN tb_user ON tb_user.id = tb_blog.author_id WHERE tb_blog.id=$1", id).Scan(
		&blogDetail.ID, &tempAuthor, &blogDetail.Title, &blogDetail.Description, &blogDetail.Image, &blogDetail.StartDate, &blogDetail.EndDate, &blogDetail.React, &blogDetail.Vue, &blogDetail.Angular, &blogDetail.Node)

	if errDb != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"Message": errDb.Error()})
	}
	blogDetail.Duration = distanceTime(blogDetail.StartDate, blogDetail.EndDate)
	template, err := template.ParseFiles("views/blog-detail.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message5": err.Error()})
	}
	blogDetail.Author = tempAuthor.String
	dataBlogDetail := map[string]interface{}{
		"BlogDetail": blogDetail,
	}
	return template.Execute(c.Response(), dataBlogDetail)
}
func addProject(c echo.Context) error {

	getName := c.FormValue("name")
	getStartDate := c.FormValue("start-date")
	getEndDate := c.FormValue("end-date")
	getDescription := c.FormValue("textarea")
	image := c.Get("dataFile").(string)
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
	sess, _ := session.Get("session", c)
	valueDatabase := [...]interface{}{
		getName,
		getDescription,
		image,
		"user",
		"3 bulan",
		react,
		vue,
		angular,
		node,
		getStartDate,
		getEndDate,
		getStartDate,
		getEndDate,
		sess.Values["id"].(int),
	}
	_, errDb := connection.Connect.Exec(context.Background(), "INSERT INTO tb_blog(title,description,image,author,post_date,react,vue,angular,node,start_date,end_date,date1,date2,author_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)", valueDatabase[:]...)
	if errDb != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": errDb.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/home")
}
func deleteData(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("delete"))
	fmt.Println("delete ID :", id)
	_, errDb := connection.Connect.Exec(context.Background(), "DELETE FROM tb_blog WHERE id=$1", id)
	if errDb != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": errDb.Error()})
	}
	return c.Redirect(http.StatusMovedPermanently, "/home")
}

func distanceTime(date1, date2 time.Time) string {

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
	id, _ := strconv.Atoi(c.Param("id"))
	var dataTb = blog{}
	errDb := connection.Connect.QueryRow(context.Background(), "SELECT id,title,description,image,author,post_date,react,vue,angular,node,start_date,end_date,date1,date2 FROM tb_blog WHERE id=$1", id).Scan(
		&dataTb.ID, &dataTb.Title, &dataTb.Description, &dataTb.Image, &dataTb.Author, &dataTb.Duration, &dataTb.React, &dataTb.Vue, &dataTb.Angular, &dataTb.Node, &dataTb.StartDate, &dataTb.EndDate, &dataTb.Date1, &dataTb.Date2)

	if errDb != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"Message": errDb.Error()})
	}

	dataValueDetail := map[string]interface{}{
		"updateBlog": dataTb,
		"index":      id,
	}
	return template.Execute(c.Response(), dataValueDetail)
}

func editProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("edit"))
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
	editDataUser := [...]interface{}{
		getName,
		getStartDate,
		getEndDate,
		getDescription,
		react,
		vue,
		angular,
		node,
		id,
	}
	_, errDb := connection.Connect.Exec(context.Background(), "UPDATE tb_blog SET title=$1,start_date=$2,end_date=$3,description=$4,react=$5,vue=$6,angular=$7,node=$8 WHERE id=$9", editDataUser[:]...)

	if errDb != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message error": errDb.Error()})
	}
	println("edited name :", getName)
	println("edited start-date:", getStartDate)
	println("edited end-date:", getEndDate)
	println("edited react:", react)
	println("edited vue:", vue)
	println("edited angular:", angular)
	println("edited vue:", node)
	println("edited description :", getDescription)

	return c.Redirect(http.StatusMovedPermanently, "/home")
}
func register(c echo.Context) error { //GET
	template, err := template.ParseFiles("views/register.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"Message": err.Error()})
	}

	return template.Execute(c.Response(), nil)
}
func login(c echo.Context) error { //GET
	template, err := template.ParseFiles("views/login.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"Message": err.Error()})
	}

	sess, errsess := session.Get("session", c)
	if errsess != nil {
		return c.JSON(http.StatusInternalServerError, errsess.Error())
	}
	flash := map[string]interface{}{
		"flashMessage": sess.Values["message"],
		"flashStatus":  sess.Values["status"],
	}
	delete(sess.Values, "message")
	delete(sess.Values, "status")
	sess.Save(c.Request(), c.Response())
	// fmt.Println("message", sess.Values["message"])
	// fmt.Println("status", sess.Values["status"])

	return template.Execute(c.Response(), flash)
}
func submitRegister(c echo.Context) error {
	name := c.FormValue("name")
	email := c.FormValue("email")
	password := c.FormValue("password")
	hashPw, errPw := bcrypt.GenerateFromPassword([]byte(password), 10)
	if errPw != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": errPw.Error()})
	}
	fmt.Println("REGISTER:\n", name, email, password)
	println("PASSWORD BCRYPT", hashPw)
	dataUser, _ := connection.Connect.Exec(context.Background(), "INSERT INTO tb_user(name,email,password) VALUES($1,$2,$3)", name, email, hashPw)

	fmt.Println("affect", dataUser.RowsAffected())

	//ini cookies / membuat cookies untuk di tangkap di func / halaman yang di direksi kan
	// sess, errsess := session.Get("session", c)
	// if errsess != nil {
	// 	return c.JSON(http.StatusInternalServerError, errsess.Error())
	// }
	// sess.Values["message"] = "register berhasil" // name string sess / deklasrai => value
	// sess.Values["status"] = true
	// sess.Values["messageFailed"] = "register gagal"
	// sess.Save(c.Request(), c.Response())

	// if errDb != nil {
	// 	return redirectWithMessage(c, "registrasi gagal", false, "/register")
	// }
	return redirectWithMessage(c, "registrasi berhasil", true, "/login")
	// return c.Redirect(http.StatusMovedPermanently, "/login")
}
func submitLogin(c echo.Context) error { /// PR
	var email = c.FormValue("email")
	var password = c.FormValue("password")

	user := dataUser{}

	err := connection.Connect.QueryRow(context.Background(), "SELECT id,name,email,password FROM tb_user WHERE email=$1", email).Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	if err != nil {

		return redirectWithMessage(c, "email atau password salah", false, "/login")
	}
	errHash := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if errHash != nil {
		return redirectWithMessage(c, "email atau password salah", false, "/login")
	}
	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = 300
	sess.Values["message"] = "Login Berhasil !"
	sess.Values["status"] = true
	sess.Values["email"] = user.Email
	sess.Values["name"] = user.Name
	sess.Values["id"] = user.ID
	sess.Values["isLogin"] = true
	sess.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusMovedPermanently, "/home")
}

func logout(c echo.Context) error {
	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = -1
	sess.Save(c.Request(), c.Response())
	return redirectWithMessage(c, "log out berhasil", true, "/home")
}

func redirectWithMessage(c echo.Context, message string, status bool, redirectPath string) error {
	sess, errSess := session.Get("session", c)
	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message error redirect": errSess.Error()})
	}
	sess.Values["message"] = message
	sess.Values["status"] = true

	sess.Save(c.Request(), c.Response())
	return c.Redirect(http.StatusMovedPermanently, redirectPath)
}
