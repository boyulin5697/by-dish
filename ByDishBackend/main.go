package main

import (
	"ByDishBackend/mainRouter"
)

func main() {
	router := mainRouter.SetupRouter()
	_ = router.Run()
}
