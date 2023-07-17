package entities

type Object struct {
	Id     int    `json:id`
	Name   string `json:name`
	Usable bool   `json:usable`
}

func (Object) TableName() string {
	return "object"
}
