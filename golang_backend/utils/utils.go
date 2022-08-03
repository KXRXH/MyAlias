package utils

import (
	"math/rand"
	"time"
)

func GenerateRandomId(from int, to int) int {
	// Bug: ids can be repeated
	// FIXME: id generation bug.
	rand.Seed(time.Now().UnixNano())
	return rand.Intn(to-from) + from
}
