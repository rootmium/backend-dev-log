import { createServer } from "node:http";
import jokes from "./jokes.json"

const port = 3000;

const server = createServer((req, res) => {
  const { method , url } = req
  const parsedUrl = new URL(url, `http://${req.headers.host}`)
  const path = parsedUrl.pathname

  if (path === "/" && method === "GET") {
    res.writeHeader(200, { "Content-Type": "text/json" })
    res.end(JSON.stringify({ name: "hello world!" }))
  }

  else if (path === "/ping" && method === "GET") {
    res.writeHeader(200, { "Content-Type": "text/html" })
    res.end(`<h1>Server is fine.</h1><br><p>${new Date().getTime()}`)
  }

  else if (path === "/jokes" && method === "GET") {
    res.writeHeader(200, { "Content-Type": "text/json" }) 
    res.end(JSON.stringify(jokes, null, 2))
  }

    // route /jokes/:id
  else if (path.startsWith("/jokes/") && method === "GET") {
    const reqId = parseInt(path.split("/")[2])
    let resultJoke

    jokes.forEach((joke) => {
      if (reqId === joke.id) {
        resultJoke = joke
      }
    })

    if (resultJoke) {
      res.writeHeader(200, { "Content-Type": "text/json" })
      res.end(JSON.stringify(resultJoke, null, 2))
    } else {
      res.writeHeader(404, { "Content-Type": "text/json" })
      res.end(JSON.stringify({ error: "Joke not found" }, null, 2))
    }
  }

  else {
    res.writeHeader(404, { "Content-Type": "text/json" })
    res.end(JSON.stringify({ error: "Wrong url" }))
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
