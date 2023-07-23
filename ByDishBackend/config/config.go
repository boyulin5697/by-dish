package config

import (
	"gopkg.in/yaml.v2"
	"log"
)

type DatabaseConfig struct {
	ArgStr  string `yaml:"argStr"`
	Dialect string `yaml:"dialect"`
}

type Config struct {
	Database DatabaseConfig `yaml:"database"`
}

var ConfigContent *Config

func SetConfig(content string) {
	ConfigContent = new(Config)
	err := yaml.Unmarshal([]byte(content), ConfigContent)
	if err != nil {
		log.Fatal(err)
	}
}

// GetDBConfig 获取数据库配置
func GetDBConfig() *DatabaseConfig {
	if ConfigContent == nil {
		tmp := DatabaseConfig{
			ArgStr:  "",
			Dialect: "mysql",
		}
		return &tmp
	}
	return &ConfigContent.Database
}
