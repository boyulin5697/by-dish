package service

import (
	"ByDishBackend/config"
	"ByDishBackend/db"
	"ByDishBackend/email"
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
	"database/sql"
	"github.com/google/uuid"
	"strconv"
	"strings"
	"time"
)

// CustService C端接口服务 @author by.

type MenuContent struct {
	Dish_name string
	Dish_objs string
}

// GetTypeList 获取Type列表 （页面左侧栏）
func GetTypeList() []*model.TypeObject {
	var resultList []*model.TypeObject
	originList := entities.GetTypeList()
	if originList == nil {
		return resultList
	} else {
		for _, t := range originList {
			result := &model.TypeObject{
				Typeid: t.Id,
				Label:  t.Name,
			}
			resultList = append(resultList, result)
		}
	}
	return resultList
}

// GetDishesByType 获取Dish列表（页面右侧栏），默认只返回前15条
func GetDishesByType(input *model.CustDishInput) []*model.TypeDishObject {
	var resultList []*model.TypeDishObject
	if input.TypeidList == nil || len(input.TypeidList) == 0 {

	} else {
		wish := input.Wish
		if wish == nil {
			*wish = 1
		}
		for _, typeId := range input.TypeidList {
			typeDishes := entities.GetDishByType(typeId, wish)
			var dishList []*model.Dish
			for _, dish := range typeDishes {
				dishMo := &model.Dish{
					ID:          db.NumToStr(dish.Id),
					Name:        &dish.Name,
					Pic:         &dish.Pic,
					Freq:        &dish.Freq,
					IntType:     &dish.Type,
					Description: &dish.Description,
					Avb:         &dish.Avb,
					Label:       db.StrToArr(dish.Label),
					Objs:        db.StrToArr(dish.Objs),
				}
				dishList = append(dishList, dishMo)
			}
			typeDish := &model.TypeDishObject{
				Typeid: *typeId,
				Dishes: dishList,
			}
			resultList = append(resultList, typeDish)
		}
	}
	return resultList
}

// CustAddMenu 添加menu接口
func CustAddMenu(input *model.CustAddMenuInput) *model.MutationResponse {
	time := time.Now()
	id, err := uuid.NewUUID()
	success := 200
	failed := 500
	successMsg := "添加成功！"
	failedMsg := "内部错误！"
	if err != nil {
		return &model.MutationResponse{
			Code:    &failed,
			Message: &failedMsg,
		}
	}
	idstr := strings.Replace(id.String(), "-", "", -1)
	dishStr := ""
	for i := range input.DishList {
		dish := input.DishList[i]
		dishStr += dish.DishID
		if len(dish.ObjArr) > 0 {
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
		} else {
			dishId, _ := strconv.Atoi(dish.DishID)
			ObjID := 1
			relar := &entities.ObjRelation{
				Menu:       idstr,
				Dish:       dishId,
				ObjId:      ObjID,
				ObjContent: "--",
			}
			relar.AddObjRelation()
		}
	}
	menuName := time.Local().Format("2006-01-02 15:04:05") + "菜单"
	menu := &entities.Menu{
		idstr, time, dishStr, menuName, 0,
	}
	//添加菜单
	rslt := menu.AddMenu()
	if rslt == 1 {
		//新建go routine异步执行发送消息操作
		go sendMenuNotification(&menuName)
	}
	//发送通知邮件
	return &model.MutationResponse{
		Code:    &success,
		Message: &successMsg,
	}
}

func sendMenuNotification(menuName *string) {
	var obj []*MenuContent
	var rows *sql.Rows
	rows, _ = db.Db.Raw("SELECT dish_name,\n"+
		"CASE WHEN obj_id = 1 THEN\n"+
		"CONCAT(obj_name, CONCAT(':',content))\n"+
		"ELSE\n"+
		"CONCAT(obj_name, CONCAT(':',obj_val))\n"+
		"END\n"+
		"dish_objs\n"+
		"FROM `v_menu_values`\n"+
		"WHERE menu_name= ?\n"+
		"GROUP BY dish_name, dish_objs", menuName).Rows()

	if rows != nil {
		for rows.Next() {
			var objItem MenuContent
			err := db.Db.ScanRows(rows, &objItem)
			if err != nil {
				return
			}
			obj = append(obj, &objItem)
		}
		var dishName string
		var rsltStr string
		dishNum := 1
		for _, content := range obj {
			if content.Dish_name != dishName {
				dishName = content.Dish_name
				rsltStr += "<h3>" + db.NumToStr(dishNum) + "." + dishName + "</h3>"
				dishNum++
			}
			rsltStr += "<p>" + content.Dish_objs + "</p>"
		}
		email.SendEmail(config.GetEmailConfig().DefaultClient, rsltStr, "请接收新的菜单")
	}
}
