package service

import (
	"ByDishBackend/db"
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
		idstr, time, dishStr, input.Name, 0,
	}

	return menu.AddMenu()
}

func FindMenu(id string) *model.Menu {
	//var menuValList []*entities.MenuValueReceiver
	//get menu
	// mdoId, menuId, dishId, objId, content, menuName, menuTime, menuType, objName
	menuValList := FindMenuObjValues(id)
	result := new(model.Menu)
	if menuValList != nil {
		var molist []*model.TDishObjsVal
		var dishObjMap map[string][]*model.TObjValRel
		dishObjMap = make(map[string][]*model.TObjValRel)
		for i := range menuValList {
			if i == 0 {
				result.ID = menuValList[i].Menuid
				result.Name = &menuValList[i].Menuname
				result.TypeInt = &menuValList[i].Menutype
				timeStr := menuValList[i].Menutime.String()
				result.Time = &timeStr
			}
			var label string
			if menuValList[i].Objid != "1" {
				label = entities.GetObjValLabel(menuValList[i].Content)
			} else {
				label = ""
			}
			moV := &model.TObjValRel{
				ObjID:   menuValList[i].Objid,
				ValID:   menuValList[i].Content,
				Label:   &label,
				ObjName: &menuValList[i].Objname,
			}
			var tObjValRels []*model.TObjValRel
			tObjValRels = dishObjMap[menuValList[i].Dishid]
			tObjValRels = append(tObjValRels, moV)
			dishObjMap[menuValList[i].Dishid] = tObjValRels

		}
		for s := range dishObjMap {
			mo := &model.TDishObjsVal{
				DishID: s,
				ObjArr: dishObjMap[s],
			}
			molist = append(molist, mo)
		}
		result.List = molist
	}
	return result
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
		resultList = append(resultList, FindMenu(value.Id))
	}
	return resultList
}

// FindMenuObjValues 获取menu和对象属性相关信息
func FindMenuObjValues(id string) []*entities.MenuValueReceiver {
	var objVals []*entities.MenuValueReceiver
	rows, _ := db.Db.Raw("SELECT mdo_id mdoid, menu_id menuid, dish_id dishid, obj_id objid, content, menu_time menutime, menu_type menutype, menu_name menuname, obj_name objname FROM `v_menu_values` WHERE `menu_id` = ?", id).Rows()
	for rows.Next() {
		var obj entities.MenuValueReceiver
		err := db.Db.ScanRows(rows, &obj)
		if err != nil {
			return nil
		}
		objVals = append(objVals, &obj)
	}
	return objVals
}
