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

// Server ping handler.
func MainRouteHandler(context *fiber.Ctx) error {
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
	})
}

/* User connect request handler.
Params: [room_id: int].
Json input: {
	'id': int,
	'nickname': string,
	'team': int,
	'room_id': int,}
*/
func ConnectHandler(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("room_id"))
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	model := models.User{}
	if err := context.BodyParser(&model); err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	room_user_id := utils.GenerateRandomId(1, 1000)
	if game.ConnectUserToheRoom(id, model, room_user_id) {
		return context.Status(http.StatusOK).JSON(&fiber.Map{
			"message": "OK",
			"room":    game.GetRoomById(id),
			"user_id": room_user_id,
		})
	}
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Unable to connect to unexisting room",
	})
}

/* User disconnect request handler.
Json input: {
	'id': int,
	'nickname': string,
	'team': int,
	'room_id': int,}
*/
func DisconnectHandler(context *fiber.Ctx) error {
	model := models.User{}
	if err := context.BodyParser(&model); err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	status := game.DisconnectUserFromTheRoom(model)
	if !status {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "Unable to disconnect user from the room",
		})
	}
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
		"rooms":   game.GetAllRooms(),
	})
}

// Creating a new room handler.
func CreateNewRoomHandler(context *fiber.Ctx) error {
	model := models.Room{
		RoomId:   utils.GenerateRandomId(100000, 1000000),
		UserList: []models.User{},
		State: models.State{StateName: "wait",
			TimeLeft: 60},
		Teams: []int{}}
	game.CreateNewRoom(model)
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
		"room":    model,
	})
}

// Getting all rooms handler.
func GetAllRoomsHandler(context *fiber.Ctx) error {
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
		"rooms":   game.GetAllRooms(),
	})
}

// Handler for getting room info by its id.
func GetRoomByIdHandler(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
		"room":    game.GetRoomById(id),
	})
}
