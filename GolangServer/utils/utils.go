package utils

import (
	"math/rand"
	"time"
)

func GenerateRandomId() int {
	rand.Seed(time.Now().UnixNano())
	return rand.Intn(9000000) + 100000
}
