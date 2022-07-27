package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/kxrxh/alias-backend/api"
)

func main() {

	app := fiber.New()
	// Enable CORS.
	app.Use(cors.New(cors.Config{
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	// Routes for accessing to server
	app.Get("/ping", api.PingHandler)
	app.Post("/user/connect/:room_id", api.ConnectHandler)
	app.Post("/user/disconnect/:room_id", api.DisconnectHandler)
	app.Post("/room/new", api.NewRoomHandler)
	app.Listen("localhost:8080")
}
