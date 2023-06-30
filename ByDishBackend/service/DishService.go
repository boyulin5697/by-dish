package service

//
//import (
//	"ByDishBackend/entities"
//	"ByDishBackend/mainRouter"
//
//	//"ByDishBackend/mainRouter"
//	"github.com/google/uuid"
//	"strings"
//)
//
//func addDish(dish *mainRouter.DishCarrier) int{
//	id, err := uuid.NewUUID()
//	if err != nil {
//		return 0
//	}
//	idstr := strings.Replace(id.String(), "-", "", -1)
//	newdish := &entities.Dish{
//		Id: idstr,
//		Name: dish.Name,
//		Pic: dish.Pic,
//		Freq: dish.Freq,
//	}
//
//	return newdish.AddDish()
//}
