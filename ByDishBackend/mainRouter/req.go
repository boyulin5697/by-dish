package mainRouter

type MenuModifier struct {
	Id   string   `json:"id"`
	List []string `json:"list"`
}


type DishCarrier struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Pic  string `json:"pic"`
	Freq int    `json:"freq"`
}