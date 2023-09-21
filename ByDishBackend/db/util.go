package db

import (
	"github.com/jinzhu/gorm"
	"strconv"
	"strings"
)

// utils 通用工具类 @author by. in 2023/7/5

// Paginate 分页工具类
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

// GetTotalPageNum 获取总页数工具类
func GetTotalPageNum(pageSize int, totalNum int) int {
	if pageSize <= 0 {
		pageSize = 10
	}
	if totalNum == 0 {
		return 0
	} else {
		return totalNum/pageSize + 1
	}

}

// StrToNum 字符串转换为数字工具类
func StrToNum(str string) int {
	num, err := strconv.Atoi(str)
	if err != nil {
		panic(err)
	}
	return num
}

// StrToNumPtr 字符串转换为数字指针工具类
func StrToNumPtr(str string) *int {
	num, err := strconv.Atoi(str)
	if err != nil {
		panic(err)
	}
	return &num
}

// NumToStr 数字转换为字符串工具类
func NumToStr(num int) string {
	str := strconv.Itoa(num)
	return str
}

// NumToStrPtr 数字转换为字符串指针工具类
func NumToStrPtr(num int) *string {
	str := strconv.Itoa(num)
	return &str
}

// ArrToStr 将数组合并为字符串工具类
// 功能：将数组合并为以 ',' 分割的字符串
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

// StrToArr 根据字符串获得数组工具类
func StrToArr(str string) []*string {
	var arr = new([]*string)
	var arrStr []string
	arrStr = strings.Split(str, ",")
	if len(arrStr) == 0 {
		return *arr
	}
	for i := range arrStr {
		*arr = append(*arr, &arrStr[i])
	}
	return *arr
}

// StrNilCheck 空指针校验
func StrNilCheck(str *string) string {
	if str == nil {
		return ""
	} else {
		return *str
	}
}

// NumNilCheck 数字空指针校验
func NumNilCheck(str *int) int {
	if str == nil {
		return -1
	} else {
		return *str
	}
}
