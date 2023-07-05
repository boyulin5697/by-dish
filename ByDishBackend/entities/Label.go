package entities

import (
	"ByDishBackend/db"
)

type Label struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

func (Label) TableName() string {
	return "label"
}

func (label *Label) AddLabel() int {
	db.Db.Create(&label)
	return 1
}

func (label *Label) Save() int {
	db.Db.Save(&label)
	return 1
}

func (label *Label) Delete(id string) int {
	db.Db.Delete(&Label{Id: db.StrToNum(id)})
	return 1
}

func (label *Label) SearchForLabel(id string) *Label {
	db.Db.Where(&Label{Id: db.StrToNum(id)}, &label)
	return label
}

// FindLabelList 根据提供的入参分页搜索满足条件的列表
func (label *Label) FindLabelList(pageNo int, pageSize int) *[]Label {
	var labelList []Label
	db.Db.Scopes(db.Paginate(pageNo, pageSize)).Where(&label).Find(&labelList)
	return &labelList
}
