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

// Ping/pong request
func PingHandler(context *fiber.Ctx) error {
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "pong",
	})
}

func ConnectHandler(context *fiber.Ctx) error {
	context.Accepts("application/json") // "application/json"
	id, err := strconv.Atoi(context.Params("room_id"))
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Error has occurred",
			"error":   err.Error(),
		})
	}
	model := models.User{}
	if err := context.BodyParser(&model); err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Error has occurred",
			"error":   err.Error(),
		})
	}
	game.ConnectUserToRoom(id, model)
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": fmt.Sprintf("User %s has been connected to room %v\n", model.NickName, id),
		"room":    game.GetRoomById(id),
	})
}

func DisconnectHandler(context *fiber.Ctx) error {
	context.Accepts("application/json") // "application/json"
	return nil
}

func NewRoomHandler(context *fiber.Ctx) error {
	context.Accepts("application/json") // "application/json"
	model := models.Room{RoomId: utils.GenerateRandomId(), UserList: []models.User{}, State: models.State{StateName: "wait", TimeLeft: 60}, Teams: []int{}}
	game.CreateNewRoom(model)
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Room was created successfully",
		"rooms":   game.GetAllRooms(),
	})
}
