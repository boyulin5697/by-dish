package main

import (
	"ByDishBackend/mainRouter"
	"github.com/nacos-group/nacos-sdk-go/clients"
	"github.com/nacos-group/nacos-sdk-go/common/constant"
	"github.com/nacos-group/nacos-sdk-go/vo"
	"log"
)

//main.go Containing server start up and nacos registry.
//@author by.

func main() {
	router := mainRouter.SetupRouter()
	//服务注册端口和地址
	serverConfigs := []constant.ServerConfig{
		{
			IpAddr: "120.26.84.76",
			Port:   8848,
		},
	}
	// 客户端配置
	clientConfig := constant.ClientConfig{
		//http请求超时时间，单位毫秒
		TimeoutMs:           5000,
		NotLoadCacheAtStart: true,
		NamespaceId:         "public",
		ListenInterval:      10000,
	}

	client, _ := clients.NewNamingClient(
		vo.NacosClientParam{
			ClientConfig:  &clientConfig,
			ServerConfigs: serverConfigs,
		},
	)

	success, err := client.RegisterInstance(vo.RegisterInstanceParam{
		Ip:          "127.0.0.1",
		Port:        8080,
		ServiceName: "By-Dish",
		Weight:      10,
		Enable:      true,
		Healthy:     true,
		Ephemeral:   true,
	})
	if !success {
		log.Fatal("[NACOS] CONNECT TO NACOS FAILED...")
		log.Fatalln(err.Error())
		return
	} else {
		log.Print("[NACOS] CONNECT TO NACOS SUCCEEDED...")
	}
	_ = router.Run()
}
