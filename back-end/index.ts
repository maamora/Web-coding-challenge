import app from "./app"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import taskDAO from "./src/dao/taskDAO"


dotenv.config()


const port = process.env.PORT
const container : any = process.env.CONTAINERS_DB_URI

MongoClient.connect(
    container,
    {
        minPoolSize: 50,

        useBigInt64 : true,
      },

).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
    .then(async client => {
        await taskDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

