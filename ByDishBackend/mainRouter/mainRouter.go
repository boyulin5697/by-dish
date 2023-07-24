package mainRouter

import (
	"ByDishBackend/service"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"reflect"
)

// SetupRouter Define router in this function
// author by. created in May 2nd, 2023
func SetupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(CrosHandler())

	router.GET("/menu", func(context *gin.Context) {
		id := context.Query("id")
		menu := service.FindMenu(id)
		context.PureJSON(http.StatusOK, &menu)
	})

	router.DELETE("/menu", func(context *gin.Context) {
		id := context.Query("id")
		status := service.DeleteMenu(id)
		var respbody gin.H
		if status == 0 {
			respbody = gin.H{
				"code":    500,
				"message": "删除失败！",
			}
		} else {
			respbody = gin.H{
				"code":    200,
				"message": "删除成功!",
			}
		}
		context.JSON(http.StatusOK, respbody)
	})

	router.POST("/menu/update", func(context *gin.Context) {
		menuValue := GetResponseBody(context, reflect.TypeOf(MenuModifier{}))
		menu := menuValue.Interface().(*MenuModifier)
		status := service.ModifyMenu(menu.Id, menu.List)
		var respbody gin.H
		if status == 0 {
			respbody = gin.H{
				"code":    500,
				"message": "更新失败！",
			}
		} else {
			respbody = gin.H{
				"code":    200,
				"message": "更新成功!",
			}
		}
		context.JSON(http.StatusOK, respbody)
	})

	router.Any("/bydish/gql", graphqlHandler())
	router.GET("/bydish/playground", playgroundHandler())

	return router
}

// GetResponseBody get response body common func
func GetResponseBody(context *gin.Context, p reflect.Type) reflect.Value {
	value := reflect.New(p)
	if err := context.BindJSON(&value); err != nil {
		log.Panic(err.Error())
	}
	return value
}
