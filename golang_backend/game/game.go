package game

import (
	"github.com/kxrxh/alias-backend/models"
)

var roomList = []models.Room{}

func CreateNewRoom(room models.Room) {
	roomList = append(roomList, room)
}

func DeleteRoomById(id int) {
	newRoomList := []models.Room{}
	for _, room := range roomList {
		if room.RoomId != id {
			newRoomList = append(newRoomList, room)
		}
	}
	roomList = newRoomList
}

func GetAllRooms() []models.Room {
	return roomList
}

func ConnectUserToheRoom(roomId int, user models.User, roomUserId int) bool {
	room := GetRoomById(roomId)
	if room != nil {
		user.RoomId = roomId
		user.Id = roomUserId // User id in this room
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

func ChangePlayerName(user models.User) bool {
	room := GetRoomById(user.RoomId)
	if room != nil {
		room.ChangeUserName(user)
		return true
	}
	return false
}

func ChangeGameState(state models.Room) error {
	return nil
}

func ChangePlayerStatus(roomId, playerId int) {
	room := GetRoomById(roomId)
	if room != nil {
		room.ChangeUserStatus(playerId)
	}
}

func CreateNewTeam(roomId int, teamId int) *models.Room {
	room := GetRoomById(roomId)
	if room != nil {
		room.AddNewTeamToRoom(teamId)
		return room
	}
	return nil
}
