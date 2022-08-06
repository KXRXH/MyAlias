package game

import (
	"github.com/kxrxh/alias-backend/models"
)

var roomList = []models.Room{}

func GetAllRooms() []models.Room {
	return roomList
}

func GetRoomById(id int) *models.Room {
	for i := 0; i < len(roomList); i++ {
		if roomList[i].RoomId == id {
			return &roomList[i]
		}
	}
	return nil
}

func RunGame() error {
	return nil
}
