package entities

import (
	"ByDishBackend/db"
	"time"
)

type Menu struct {
	Id   string    `json:"id"`
	Time time.Time `json:"time"`
	List string    `json:"list"`
	Name string    `json:"name"`
	Type int       `json:"type"`
}

type MenuReceiver struct {
	id   string
	time time.Time
	list string
}

func (Menu) TableName() string {
	return "menu"
}

func (menu *Menu) AddMenu() int {
	db.Db.Exec("INSERT INTO `menu` (`id`,`time`,`list`) VALUES (?,?,?);", menu.Id, menu.Time, menu.List)
	return 1
}

func (menu *Menu) Save(lst string, id string) int {
	db.Db.Exec("UPDATE `menu` SET `list` = ? WHERE `id` = ?;", lst, id)
	return 1
}

func (menu *Menu) Delete(id string) int {
	db.Db.Exec("DELETE FROM `menu` WHERE `id` = ?;", id)
	return 1
}

func (menu *Menu) SearchForMenu(id string) *Menu {
	db.Db.Where(&Menu{Id: id}, &menu)
	return menu
}

// FindMenuList 根据提供的入参分页搜索满足条件的列表
func (menu *Menu) FindMenuList(pageNo int, pageSize int) *[]Menu {
	var menuList []Menu
	db.Db.Scopes(db.Paginate(pageNo, pageSize)).Where(&menu).Find(&menuList)
	return &menuList
}
