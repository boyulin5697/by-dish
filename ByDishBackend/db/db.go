package db

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"log"
)

var Db *gorm.DB

func init() {
	var err error
	Db, err = gorm.Open("mysql", "by_dish:zGaLhKJmEzsy8eDM@tcp(120.26.84.76)/by_dish?charset=utf8&parseTime=true")
	if err != nil {
		log.Panicln("err:", err.Error())
	}

}
