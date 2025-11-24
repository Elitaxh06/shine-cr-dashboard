import app from "./app.js"
import config from "./config.js"

const port = config.server.port

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
