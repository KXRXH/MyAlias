package api

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/kxrxh/alias-backend/game"
)

// Server ping handler.
func MainRouteHandler(context *fiber.Ctx) error {
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "OK",
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
