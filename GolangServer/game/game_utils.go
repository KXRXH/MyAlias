package game

import "github.com/kxrxh/alias-backend/models"

func GetRoomById(id int) *models.Room {
	for i := 0; i < len(roomList); i++ {
		if roomList[i].RoomId == id {
			return &roomList[i]
		}
	}
	return nil
}
