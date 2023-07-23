package connection

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4"
)

var Connect *pgx.Conn

func DatabaseConnect() {
	var err error
	databaseUrl := "postgres://postgres:rzn21@localhost:5432/rzn-b47s1"
	Connect, err = pgx.Connect(context.Background(), databaseUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error connect to database: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("succefully connected to database")
}
