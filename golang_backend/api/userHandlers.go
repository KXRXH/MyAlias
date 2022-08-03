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
	isCreator, err := strconv.Atoi(context.Params("is_creator"))
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

	var roomUserId int
	if isCreator == 0 {
		roomUserId = utils.GenerateRandomId(1, 1000)
	} else {
		roomUserId = 0
	}
	if game.ConnectUserToheRoom(id, model, roomUserId) {
		return context.Status(http.StatusOK).JSON(&fiber.Map{
			"message": "OK",
			"room":    game.GetRoomById(id),
			"user_id": roomUserId,
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

// /user/set/ready/:room_id/:user_id
func UserReadyHandler(context *fiber.Ctx) error {
	roomId, err := strconv.Atoi(context.Params("room_id"))
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	userId, err := strconv.Atoi(context.Params("user_id"))
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": fmt.Sprintf("Error has occurred: %v", err.Error()),
		})
	}
	game.ChangePlayerStatus(roomId, userId)
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
	})
}

func ChangeTeamHandler(context *fiber.Ctx) error {
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
	})
}
