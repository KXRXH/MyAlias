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
	app.Post("/room/delete/:room_id", api.DeleteRoomByIdHandler)
	app.Post("/room/create/team/:room_id/:new_team_id", api.CreateNewTeamHandler)
	app.Get("/room/get/all", api.GetAllRoomsHandler)
	app.Get("/room/get/id/:id", api.GetRoomByIdHandler)
	app.Put("/user/connect/:room_id", api.ConnectHandler)
	app.Put("/user/change/team/:room_id/:user_id/:new_team_id", api.ChangeTeamHandler)
	app.Put("/user/disconnect", api.DisconnectHandler)
	app.Put("/user/set/ready/:room_id/:user_id", api.UserReadyHandler)
	app.Post("/room/new", api.CreateNewRoomHandler)
	app.Listen("localhost:8080")
}

//TODO:
// UserSetName (changing name during the game)
