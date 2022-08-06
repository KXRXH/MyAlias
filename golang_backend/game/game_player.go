package game

import "github.com/kxrxh/alias-backend/models"

func ConnectUserToTheRoom(roomId int, user models.User, roomUserId int) bool {
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

func ChangePlayerStatus(roomId, playerId int) {
	room := GetRoomById(roomId)
	if room != nil {
		room.ChangeUserStatus(playerId)
	}
}

func ChangeUsersTeam(roomId, teamId, userId int) {
	room := GetRoomById(roomId)
	if room != nil {
		room
	}
}
