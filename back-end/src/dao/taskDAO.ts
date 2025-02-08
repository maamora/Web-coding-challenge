import { ObjectId } from 'mongodb';


let task : any;

enum TaskStatus {
    Pending = "Pending",
    Completed = "Completed",
}

export default class TaskDAO {
    static async injectDB(conn : any) {
        if (task) {
            return
        }
        try {
            task = await conn.db(process.env.CONTAINERS_NS).collection("toDoTask")
            console.log("task collection initialized");
        } catch (e) {
            console.error(`Unable to establish collection handles in TaskDAO: ${e}`)
        }
    }

    static async getTask(){
        try {
            return await task.find().toArray()
        } catch (e) {
            console.error(`Unable to get task, ${e}`)
            return { error: e }
        }

    }

    static async getTaskById(taskId : any) {
        try {
            const tasks = await task.findOne({ _id: ObjectId.createFromHexString(taskId) });
    
            if (!tasks) {
                return { error: "task not found" };
            }
            return tasks;
        } catch (e) {
            console.error(`Unable to get task by id, ${e}`);
            return {  error: e };
        }
    }

    static async addTask(title: string, description: string) {
        try {
            const taskDoc = {
                title: title,
                description: description,
                status: TaskStatus.Pending,
                dateStart: new Date(), 
            };
    
            return await task.insertOne(taskDoc);
        } catch (e) {
            console.error(`Unable to post: ${e}`);
            return { error: e };
        }
    }

    static async updateTask(taskId : any, title: string, description: string, status: TaskStatus) {
        try {

            let updateFiel = { title: title, description: description, status: status };
            const objId = ObjectId.createFromHexString(taskId)

            return await task.updateOne(
                {_id: objId},
                {$set: updateFiel},
            )
        } catch (e) {
            console.error(`Unable to update booking: ${e}`)
            return { error: e }
        }
    }

    static async deleteTask(taskId : any) {

        try {
            const objId = ObjectId.createFromHexString(taskId)
            return await task.deleteOne({
                _id: objId
            })
        } catch (e) {
            console.error(`Unable to delete task: ${e}`)
            return { error: e }
        }
    }
}