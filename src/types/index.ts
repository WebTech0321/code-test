
export type TASK_STATUS = "LOCKED" | "OPEN" | "NONE"

export interface ITask {
    id: number,
    topicId: number,
    title: string,
    mediaTitle?: string,
    status: TASK_STATUS
}

export interface ITopic {
    id: number,
    title: string
}
