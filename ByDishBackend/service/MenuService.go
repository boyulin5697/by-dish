package service

import (
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
	"github.com/google/uuid"
	"strings"
	"time"
)

//Menu service
//@author by. Created in 2023/6/20

func AddMenu(list []string) int {
	time := time.Now()
	id, err := uuid.NewUUID()
	if err != nil {
		return 0
	}
	idstr := strings.Replace(id.String(), "-", "", -1)
	liststr := ""
	for i := 0; i < len(list); i++ {
		if i != 0 && i != len(list)-1 {
			liststr += ","
		}
		liststr += list[i]
	}
	menu := &entities.Menu{
		idstr, time, liststr, "", 0,
	}

	return menu.AddMenu()

}

func FindMenu(id string) *model.Menu {
	var menu *entities.Menu
	menu = menu.SearchForMenu(id)
	var arr []string
	var arrptr []*string
	if menu.List != "" {
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
