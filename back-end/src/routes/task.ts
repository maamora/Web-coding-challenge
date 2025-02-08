import express from "express"
import TaksCtrl from "../controller/taskController";


const taskRoutes = express.Router()

taskRoutes.route("/get").get(TaksCtrl.apiGetTasks)
taskRoutes.route("/get/:id").get(TaksCtrl.apiGetTaskById)
taskRoutes.route("/post").post(TaksCtrl.apiPostTask)
taskRoutes.route("/update/:id").put(TaksCtrl.apiUpdateTask)
taskRoutes.route("/delete/:id").delete(TaksCtrl.apiDeleteTask)




export default taskRoutes;