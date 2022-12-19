package model

import "time"

// TODO:  add new model
type Url struct {
	Id int `gorm:"type:uint;primaryKey autoincrement" form:"id" json:"id"`
	//UserId     int       `gorm:"type:varchar(10) column:user_id" form:"user_id" json:"user_id"`
	Origin     string    `gorm:"type:varchar(200)" form:"origin" json:"origin"`
	Short      string    `gorm:"type:varchar(40)" form:"short" json:"short"` //?
	Comment    string    `gorm:"type:varchar(100)" form:"comment" json:"comment"`
	StartTime  time.Time `gorm:"type:datetime;autoCreateTime" json:"start-time"`
	ExpireTime time.Time `gorm:"type:datetime" json:"expire-time"` //2022-01-01T08:00:00+08:00
	Enable     string    `gorm:"type:varchar(40)" json:"enable"`
}

// var counturl int
type Users struct {
	Id    int    `gorm:"type:uint;primaryKey autoincrement=1000" form:"id" json:"id"`
	Name  string `gorm:"type:varchar(20)" form:"name" json:"name"`
	Email string `gorm:"type:varchar(50)" form:"email" json:"email"`
	Pwd   string `gorm:"type:varchar(90)" form:"pwd" json:"pwd"`
	SecQ  string `gorm:"type:varchar(100)" form:"secq" json:"secq"`
	SecA  string `gorm:"type:varchar(100)" form:"seca" json:"seca"`
	//IPpub      string    `gorm:"type:varchar(100)"form:"ippub" json:"ippub"`
	//IPpri      string    `gorm:"type:varchar(100)"form:"ippri" json:"ippri"`
	LatestTime time.Time `gorm:"type:datetime" form:"expire_time" json:"expire_time"`
	// url[]	?
	// Id: auto-increasement.
	// name,email,pwd,secq,seca mustn't contain special characters
}
