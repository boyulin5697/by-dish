package email

import (
	"ByDishBackend/config"
	"ByDishBackend/db"
	"gopkg.in/gomail.v2"
	"log"
)

// SendEmail 发信息功能
func SendEmail(dest string, content string, subject string) {
	eConfig := config.GetEmailConfig()
	m := gomail.NewMessage()
	m.SetHeader("From", eConfig.SenderEmail)
	m.SetHeader("To", dest)
	m.SetHeader("Subject", subject)
	//m.SetAddressHeader("")
	m.SetBody("text/html", content)

	d := gomail.NewDialer(eConfig.SmtpServer, db.StrToNum(eConfig.SmtpPort), eConfig.SenderEmail, eConfig.SenderPassword)

	if err := d.DialAndSend(m); err != nil {
		log.Panicln(err)
	}

}
