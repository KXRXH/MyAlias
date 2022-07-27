package game

import "github.com/kxrxh/alias-backend/models"

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

func ConnectUserToRoom(roomId int, user models.User) {
	room := GetRoomById(roomId)
	if room != nil {
		room.UserList = append(room.UserList, user)
	}
}

func ChangeGameState(state models.Room) error {
	return nil
}
