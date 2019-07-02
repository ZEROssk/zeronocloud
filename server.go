package main

import(
	"log"
	//"fmt"
	"net/http"
	//"strconv"

	"github.com/ant0ine/go-json-rest/rest"
)

type postHelloInput struct {
	Page string
}

type postHelloOutput struct {
	Result string
}

func postHello(w rest.ResponseWriter, req *rest.Request) {
	input := postHelloInput{}
	err := req.DecodeJsonPayload(&input)

	//var page string = strconv.Itoa(input.Page)

	if err != nil {
		rest.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if input.Page == "" {
		rest.Error(w, "Page number is required", 400)
	}

	log.Printf("%#v", input)

	w.WriteJson(&postHelloOutput{
		"Page number is "+input.Page,
	})
}

func main() {
	api := rest.NewApi()
	api.Use(rest.DefaultDevStack...)
	router, err := rest.MakeRouter(
		rest.Post("/hello", postHello),
	)

	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Server started.")
	api.SetApp(router)
	log.Fatal(http.ListenAndServe(":5300", api.MakeHandler()))
}

