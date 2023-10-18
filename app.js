const http = require('http')
const app = require('./main')
const { PORT } = require('./config/config')

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
