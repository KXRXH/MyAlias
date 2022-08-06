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

func (room *Room) ChangeUserStatus(userId int) {
	for i := 0; i < len(room.UserList); i++ {
		if room.UserList[i].Id == userId {
			room.UserList[i].Status = !room.UserList[i].Status
		}
	}
}

func (room *Room) AddNewTeamToRoom(teamId int) {
	for _, team := range room.Teams {
		if team.Id == teamId {
			return
		}
	}
	room.Teams = append(room.Teams, Team{Id: teamId, UserList: []User{}})
}

func (room *Room) RemoveTeamFromRoom(teamId int) // TODO

func (room *Room) ChangeUserTeam(userId, teamId int) {
	var user *User
	for _, userFromList := range room.UserList {
		if (userFromList.UserId == userId)
	}
}