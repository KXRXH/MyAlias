package game

import (
	"github.com/kxrxh/alias-backend/models"
)

var roomList = []models.Room{}

func GetRoomById(id int) *models.Room {
	for i := 0; i < len(roomList); i++ {
		if roomList[i].RoomId == id {
			return &roomList[i]
		}
	}
	return nil
}

func CreateNewRoom(room models.Room) {
	roomList = append(roomList, room)
}

func GetAllRooms() []models.Room {
	return roomList
}

func ConnectUserToheRoom(roomId int, user models.User, room_user_id int) bool {
	room := GetRoomById(roomId)
	if room != nil {
		user.RoomId = roomId
		user.Id = room_user_id
		room.UserList = append(room.UserList, user)
		return true
	}
	return false
}

func DisconnectUserFromTheRoom(user models.User) bool {
	room := GetRoomById(user.RoomId)
	if room != nil {
		room.RemoveUserFromRoom(user)
		return true
	}
	return false
}

func ChangeGameState(state models.Room) error {
	return nil
}
