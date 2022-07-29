package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/kxrxh/alias-backend/api"

)

func main() {

	app := fiber.New()
	app.Use(cors.New())
	app.Use(logger.New())
	app.Use(recover.New())
	// Routes for accessing to server
	app.Get("/", api.MainRouteHandler)
	app.Get("/room/get/all", api.GetAllRoomsHandler)
	app.Get("/room/get/id/:id", api.GetRoomByIdHandler)
	app.Post("/user/connect/:room_id", api.ConnectHandler)
	app.Post("/user/disconnect", api.DisconnectHandler)
	app.Post("/room/new", api.CreateNewRoomHandler)
	app.Listen("localhost:8080")
}
