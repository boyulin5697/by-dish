package db

import (
	"github.com/jinzhu/gorm"
	"strconv"
)

// utils @author by. in 2023/7/5

func Paginate(page int, pageSize int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if page == 0 {
			page = 1
		}
		switch {
		case pageSize > 100:
			pageSize = 100
		case pageSize <= 0:
			pageSize = 10
		}
		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}

func StrToNum(str string) int {
	num, err := strconv.Atoi(str)
	if err != nil {
		panic(err)
	}
	return num
}

func StrToNumPtr(str string) *int {
	num, err := strconv.Atoi(str)
	if err != nil {
		panic(err)
	}
	return &num
}

func NumToStr(num int) string {
	str := strconv.Itoa(num)
	return str
}

func NumToStrPtr(num int) *string {
	str := strconv.Itoa(num)
	return &str
}
