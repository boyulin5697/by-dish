package service

import (
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
	"github.com/google/uuid"
	"strconv"
	"strings"
	"time"
)

//Menu service
//@author by. Created in 2023/6/20

func AddMenu(input *model.AddMenuInput) int {
	time := time.Now()
	id, err := uuid.NewUUID()
	if err != nil {
		return 0
	}
	idstr := strings.Replace(id.String(), "-", "", -1)
	dishStr := ""
	for i := range input.DishList {
		dish := input.DishList[i]
		dishStr += dish.DishID
		for i2 := range dish.ObjArr {
			objContent := dish.ObjArr[i2]
			if objContent != nil {
				dishId, _ := strconv.Atoi(dish.DishID)
				ObjID, _ := strconv.Atoi(objContent.ObjID)
				relar := &entities.ObjRelation{
					Menu:       idstr,
					Dish:       dishId,
					ObjId:      ObjID,
					ObjContent: objContent.ValID,
				}
				relar.AddObjRelation()
			}
		}
	}
	menu := &entities.Menu{
		idstr, time, dishStr, "", 0,
	}

	return menu.AddMenu()
}

func FindMenu(id string) *model.Menu {
	var menu *entities.Menu
	menu = menu.SearchForMenu(id)
	var arr []string
	var arrptr []*string
	if menu == nil {
		result := model.Menu{
			ID:   *new(string),
			Time: new(string),
			List: *new([]*model.DishObj),
		}
		return &result
	}
	if &menu.List != nil && menu.List != "" {
		arr = strings.Split(menu.List, ",")
	}
	if len(arr) > 0 {
		for i := 0; i < len(arr); i++ {
			arrptr[i] = &arr[i]
		}
	}
	timeStr := menu.Time.String()
	result := model.Menu{
		ID:   id,
		Time: &timeStr,
		List: arrptr,
	}
	return &result
}

func DeleteMenu(id string) int {
	var menu *entities.Menu
	return menu.Delete(id)
}

func ModifyMenu(id string, lst []string) int {
	var menu *entities.Menu
	liststr := ""
	for i := 0; i < len(lst); i++ {
		if i != 0 && i != len(lst)-1 {
			liststr += ","
		}
		liststr += lst[i]
	}
	return menu.Save(liststr, id)
}

func QueryMenu(input *model.MenuListInput) []*model.Menu {
	var menuList *[]entities.Menu
	var menu = entities.Menu{}
	var resultList []*model.Menu

	if input.Name != nil {
		menu.Name = *input.Name
	}

	if input.Time != nil {
		menu.Time, _ = time.ParseInLocation("2006-04-02", *input.Time, time.Local)
	}

	if input.TypeInt != nil {
		menu.Type = *input.TypeInt
	}

	menuList = menu.FindMenuList(input.PageNo, input.PageSize)

	for _, value := range *menuList {
		var arr []string
		var arrptr []*string
		if value.List != "" && &value.List != nil {
			arr = strings.Split(value.List, ",")
		}
		if len(arr) > 0 {
			for _, value := range arr {
				arrptr = append(arrptr, &value)
			}
		}

		timeStr := value.Time.String()

		resultList = append(resultList, &model.Menu{
			ID:      value.Id,
			Name:    &value.Name,
			TypeInt: &value.Type,
			List:    arrptr,
			Time:    &timeStr,
		})
	}
	return resultList
}
