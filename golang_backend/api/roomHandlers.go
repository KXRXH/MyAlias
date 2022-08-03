package api

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/kxrxh/alias-backend/game"
	"github.com/kxrxh/alias-backend/models"
	"github.com/kxrxh/alias-backend/utils"
)

// Creating a new room handler.
func CreateNewRoomHandler(context *fiber.Ctx) error {
	model := models.Room{
		RoomId:   utils.GenerateRandomId(100000, 1000000),
		UserList: []models.User{},
		State: models.State{StateName: "ready",
			TimeLeft: 60},
		Teams: []models.Team{}}
	game.CreateNewRoom(model)
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
		"room":    model,
	})
}

// Deleting a room by id handler.
func DeleteRoomByIdHandler(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("room_id"))
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	game.DeleteRoomById(id)
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
	})
}

// /room/create/team/:room_id/:new_team_id
func CreateNewTeamHandler(context *fiber.Ctx) error {
	roomId, err := strconv.Atoi(context.Params("room_id"))
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	newTeamId, err := strconv.Atoi(context.Params("new_team_id"))
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	room := game.CreateNewTeam(roomId, newTeamId)
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
		"room":    room,
	})
}
