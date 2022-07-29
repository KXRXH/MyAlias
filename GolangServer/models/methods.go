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

func (room *Room) ChangeUserName(newUserData User) {
	for i := 0; i < len(room.UserList); i++ {
		if room.UserList[i].Id == newUserData.Id {
			room.UserList[i] = newUserData
		}
	}
}
