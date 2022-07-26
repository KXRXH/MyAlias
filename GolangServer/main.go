package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/kxrxh/alias-backend/api"

)

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Get("/ping", api.PingHandler)
	app.Listen("localhost:8080")
}
