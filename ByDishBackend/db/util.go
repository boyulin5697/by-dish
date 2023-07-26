package db

import (
	"github.com/jinzhu/gorm"
	"strconv"
	"strings"
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

// ArrToStr 获取标签字符串
func ArrToStr(arr []*string) string {
	var labelStr string
	if arr != nil {
		for i := 0; i < len(arr); i++ {
			tmp := arr[i]
			labelStr += *tmp
			if i != len(arr)-1 {
				labelStr += ","
			}
		}
	} else {
		labelStr = ""
	}
	return labelStr
}

// StrToArr 根据标签字符串获得数组
func StrToArr(str string) []*string {
	var arr []*string
	var arrStr []string
	arrStr = strings.Split(str, ",")
	if len(arrStr) == 0 {
		return arr
	}
	for i := range arrStr {
		arr = append(arr, &arrStr[i])
	}
	return arr
}

// StrNilCheck 空指针校验
func StrNilCheck(str *string) string {
	if str == nil {
		return ""
	} else {
		return *str
	}
}

func NumNilCheck(str *int) int {
	if str == nil {
		return -1
	} else {
		return *str
	}
}
