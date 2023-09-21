package entities

import (
	"ByDishBackend/db"
)

type Dish struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Pic         string `json:"pic"`
	Freq        int    `json:"freq"`
	Type        int    `json:"type"`
	Description string `json:"description"`
	Avb         int    `json:"avb"`
	Label       string `json:"label"`
	Objs        string `json:"objs"`
}

func (Dish) TableName() string {
	return "dish"
}

// AddDish 创建dish
func (dish *Dish) AddDish() int {
	db.Db.Create(&dish)
	return 1
}

// Save 更新Dish的信息
func (dish *Dish) Save() int {
	db.Db.Model(&dish).Updates(Dish{
		Id:          dish.Id,
		Name:        dish.Name,
		Pic:         dish.Pic,
		Freq:        dish.Freq,
		Type:        dish.Type,
		Description: dish.Description,
		Avb:         dish.Avb,
		Label:       dish.Label,
		Objs:        dish.Objs,
	})
	return 1
}

// Delete 根据主键id删除Dish
func (dish *Dish) Delete(id string) int {
	db.Db.Exec("DELETE FROM `dish` WHERE `id` = ?;", db.StrToNum(id))
	return 1
}

// Find 根据主键id找到Dish
func (dish *Dish) Find(id string) *Dish {
	db.Db.First(dish, "id = ?", id)
	return dish
}

// SearchForDish 搜素第一个满足条件的dish
func (dish *Dish) SearchForDish() *Dish {
	db.Db.Where(dish).First(dish)
	return dish
}

// GetDishByType 根据入参类型查询数据
func GetDishByType(t *int, mode *int) []*Dish {
	result := new([]*Dish)
	switch *mode {
	case 1:
		db.Db.Order("freq DESC", true).Where(&Dish{Type: *t}).Find(result).Limit(15)
	case 2:
		db.Db.Order("freq ASC", true).Where(&Dish{Type: *t}).Find(result).Limit(15)
	}
	return *result
}

// FindDishList  根据提供的入参分页搜索满足条件的列表
func (dish *Dish) FindDishList(pageNo int, pageSize int) (*[]Dish, int) {
	var dishList []Dish
	var total int
	db.Db.Scopes(db.Paginate(pageNo, pageSize)).Where(&dish).Find(&dishList)
	db.Db.Model(&dish).Count(&total)
	//totalPage := db.GetTotalPageNum(pageSize, total)
	return &dishList, total
}
