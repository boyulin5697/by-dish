package service

import (
	"ByDishBackend/entities"
	"ByDishBackend/graph/model"
)

func AddType(input *model.TypeInput) *model.MutationResponse {
	entities.AddType(&input.TypeName)
	success := 200
	message := "添加成功！"
	return &model.MutationResponse{
		Code:    &success,
		Message: &message,
	}
}
