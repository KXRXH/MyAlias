package api

import (
	"net/http"

	"github.com/gofiber/fiber/v2"

)

func PingHandler(context *fiber.Ctx) error {
	return context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "pong",
	})
}
