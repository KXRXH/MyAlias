package models

type User struct {
	Id       int    `json:"id"`
	NickName string `json:"nickname"`
	RoomId   int    `json:"room_id"`
	Team     int    `json:"team"`
	Status   bool   `json:"status"`
}

type Team struct {
	Id       int    `json:"id"`
	UserList []User `json:"user_list"`
}

type State struct {
	// StateNames:
	// Ready (waiting for users ready)
	// Run   (game is running)
	StateName string `json:"stateName"`
	// Time left (in seconds) until game is finished.
	TimeLeft int `json:"timeleft"`
}
type Room struct {
	CreateorId int    `json:"creator_id"`
	RoomId     int    `json:"room_id"`
	Teams      []Team `json:"teams"`
	UserList   []User `json:"user_list"`
	State      State  `json:"state"`
}
