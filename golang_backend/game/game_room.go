package game

import "github.com/kxrxh/alias-backend/models"

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

func CreateNewTeam(roomId, teamId int) *models.Room {
	room := GetRoomById(roomId)
	if room != nil {
		room.AddNewTeamToRoom(teamId)
		return room
	}
	return nil
}

func DeleteTeamById(roomId, teamId int) // TODO

func ChangeGameState(state models.Room) error {
	return nil
}
