package middleware

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		file, err := c.FormFile("input-file")
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		src, errSrc := file.Open()
		if errSrc != nil {
			return c.JSON(http.StatusBadRequest, errSrc.Error())
		}
		fmt.Println(src)
		defer src.Close()
		tempFile, err := ioutil.TempFile("uploads", "image-*.png")
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		defer tempFile.Close()

		write, err := io.Copy(tempFile, src)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		fmt.Println(write)
		data := tempFile.Name()
		fileName := data[8:]
		c.Set("dataFile", fileName)
		return next(c)
	}

}
