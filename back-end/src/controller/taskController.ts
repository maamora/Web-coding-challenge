import { NextFunction, Request, Response } from "express";
import TaskDAO from "../dao/taskDAO";


export default class TaskController {
    

    static async apiGetTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await TaskDAO.getTask();
            const formattedTasks = tasks.map((task: any) => ({
                ...task,
                dateStart: new Date(task.dateStart).toLocaleString(),
            }));
            res.json(formattedTasks);
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static async apiGetTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;

            if (!taskId) {
                res.status(404).json({ error: "task not found" });
            }

            const tasks = await TaskDAO.getTaskById(taskId);

            const formattedTask = {
                ...tasks,
                dateStart: new Date(tasks.dateStart).toLocaleString(), 
            };
            
            res.json(formattedTask);
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }


    static async apiPostTask(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.body.title
            const description =  req.body.description

            if (!title) {
                return;
            }

            const TaskResponse = await TaskDAO.addTask(
                title,
                description,
            )
            console.log('TaskResponse:', TaskResponse)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static async apiUpdateTask(req: Request, res: Response, next: NextFunction) {
        try {
         
            const taskId = req.params.id
            const title = req.body.title
            const description = req.body.description
            const status = req.body.status

            if (!title) {
                return;
            }

            const TaskResponse = await TaskDAO.updateTask(
                taskId,
                title,
                description,
                status,
            )
            console.log('TaskResponse:', TaskResponse)
            var { error } = TaskResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (TaskResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update task - task may not exist",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static async apiDeleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;
            console.log(taskId)
            const TaskResponse = await TaskDAO.deleteTask(taskId)
            if (TaskResponse.deletedCount === 0) {
                throw new Error("Unable to delete task - task may not exist.");
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

}