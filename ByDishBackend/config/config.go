package config

import (
	"gopkg.in/yaml.v2"
	"log"
)

type DatabaseConfig struct {
	ArgStr  string `yaml:"argStr"`
	Dialect string `yaml:"dialect"`
}

type EmailConfig struct {
	SmtpServer     string `yaml:"smtpServer"`
	SmtpPort       string `yaml:"smtpPort"`
	SenderEmail    string `yaml:"senderEmail"`
	SenderPassword string `yaml:"senderPassword"`
	DefaultClient  string `yaml:"defaultClient"`
	Auth           string `yaml:"auth"`
}

type Config struct {
	Database DatabaseConfig `yaml:"database"`
	Email    EmailConfig    `yaml:"email"`
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

// GetEmailConfig 获取邮箱配置
func GetEmailConfig() *EmailConfig {
	if ConfigContent == nil {
		tmp := EmailConfig{
			SmtpServer:     "",
			SmtpPort:       "",
			SenderEmail:    "",
			SenderPassword: "",
			DefaultClient:  "",
		}
		return &tmp
	}
	return &ConfigContent.Email
}
