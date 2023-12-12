export type RequestTaskType = {
    data: RequestTask[]
}

interface RequestTask {
    id: string,
    attributes: {
        title: string,
        description: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string
    }
}

export interface TasksType {
    id: string,
    title: string,
    description: string,
    type: string[],
    date: string
}