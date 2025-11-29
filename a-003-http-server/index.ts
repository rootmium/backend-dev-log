import { createServer } from "node:http";

const port = 3000;

const server = createServer((req, res) => {
  const url = `http://${req.headers.host}${req.url}`
  const parsedUrl = new URL(url)
  console.log(parsedUrl)

  res.writeHeader(201, {
    "Content-Type": "text/json"
  })
  res.end(JSON.stringify({ name: "hello world!" }))
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
