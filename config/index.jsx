const DEV = process.env.dev
const FRONTEND_SERVER = DEV ? `` : `http://localhost:3013/`
const BACKEND_SERVER  = ``

export const API = {
    CATEGORY: `${FRONTEND_SERVER}api/categories`,
    READ_TASKS_DATA: `${FRONTEND_SERVER}api/read-tasks-data`,
    SAVE_TASK_DATA: `${FRONTEND_SERVER}api/save-task-data`,
}
