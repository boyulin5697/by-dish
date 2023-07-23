package main

import (
	"ByDishBackend/config"
	"ByDishBackend/db"
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
		ServiceName: "by-dish",
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
		configClient, err := clients.CreateConfigClient(map[string]interface{}{
			"serverConfigs": serverConfigs,
			"clientConfigs": clientConfig,
		})
		if err != nil {
			log.Fatal(err)
		}
		content, err := configClient.GetConfig(vo.ConfigParam{
			DataId: "by-dish",
			Group:  "DEFAULT_GROUP",
		})
		log.Print("[NACOS] Config fetched: " + content)
		config.SetConfig(content)
		db.Init()
		err = configClient.ListenConfig(vo.ConfigParam{
			DataId: "by-dish",
			Group:  "DEFAULT_GROUP",
			OnChange: func(s string, group string, dataId string, data string) {
				log.Print("[NACOS] Config " + dataId + " changed!")
				config.SetConfig(data)
			},
		})
	}
	_ = router.Run()
}
