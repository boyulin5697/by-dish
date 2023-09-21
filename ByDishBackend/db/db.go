package db

import (
	config2 "ByDishBackend/config"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"log"
)

var Db *gorm.DB

// Init 初始化数据库
func Init() {
	var err error
	config := config2.GetDBConfig()
	Db, err = gorm.Open(config.Dialect, config.ArgStr)
	if err != nil {
		log.Panicln("err:", err.Error())
	}

}
