package models

func (room *Room) RemoveUserFromRoom(user User) {
	newRoom := []User{}
	for _, usr := range room.UserList {
		if usr.Id != user.Id {
			newRoom = append(newRoom, usr)
		}
	}
	room.UserList = newRoom
}
