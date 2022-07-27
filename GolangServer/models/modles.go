package models

type User struct {
	NickName string `json:"nickname"`
	Team     int    `json:"team"`
}

type State struct {
	// StateNames:
	// Wait  (waiting for users)
	// Ready (waiting for users ready)
	// Run   (game is running)
	StateName string `json:"stateName"`
	// Time left (in seconds) until game is finished.
	TimeLeft int `json:"timeleft"`
}
type Room struct {
	RoomId   int    `json:"room_id"`
	Teams    []int  `json:"teams"`
	UserList []User `json:"user_list"`
	State    State  `json:"state"`
}
