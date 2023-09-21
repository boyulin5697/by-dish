package entities

import "ByDishBackend/db"

// Type 类型 @author by. since 2023/7/15

type Type struct {
	Id   int
	Name string
}

func (Type) TableName() string {
	return "type"
}

func AddType(s *string) int {
	db.Db.Exec("INSERT INTO `type`(`name`) VALUES (?)", s)
	return 1
}

func GetTypeList() []*Type {
	t := new([]*Type)
	db.Db.Find(t)
	return *t
}
