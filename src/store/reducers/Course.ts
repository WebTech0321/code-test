import { AnyAction } from "redux"
import { ITopic, ITask } from "../../types";
import ActionTypes from "../constants/ActionTypes"

interface ICourseState {
    topics: ITopic[],
    topic_idx: number,
    tasks: ITask[],
    task_idx: number
}

// const INIT_STATE: ICourseState = {
//     topics: [],
//     tasks: [],
//     topic_idx: 0,
//     task_idx: 0,
// };

const mock_topics = [
    { id: 0, title: 'Week 1'}
]

const mock_tasks : ITask[] = [
    { id: 0, topicId: 0, title: 'Lecture', mediaTitle: 'Past Simple Lecture', status: "LOCKED" },
    { id: 1, topicId: 0, title: 'Quizess', mediaTitle: 'Past Simple Lecture', status: "OPEN" },
    { id: 2, topicId: 0, title: 'Discussion', mediaTitle: 'Past Simple Lecture', status: "NONE" },
]

const INIT_STATE: ICourseState = {
    topics: mock_topics,
    tasks: mock_tasks,
    topic_idx: 1,
    task_idx: 3,
};

export default (state = INIT_STATE, action: AnyAction) => {
    let { payload } = action
    
    switch (action.type) {
        case ActionTypes.TOPIC_ADD:
            return {
                ...state,
                topic_idx: state.topic_idx + 1,
                topics: [...state.topics, 
                    {
                        id: state.topic_idx,
                        title: payload.title
                    }
                ]
            }    
        case ActionTypes.TOPIC_UPDATE:            
            return {
                ...state,
                topics: state.topics.map((_topic) => {
                    if(_topic.id === payload.id)
                        return {
                            ..._topic,
                            title: payload.title
                        }
                    return _topic
                })
            }    
        case ActionTypes.TOPIC_DELETE:
            return {
                ...state,
                topics: state.topics.filter((_topic) => _topic.id !== payload.id),
                tasks: state.tasks.filter((_task) => _task.topicId !== payload.id)
            }  
        case ActionTypes.TASK_ADD:
            return {
                ...state,
                task_idx: state.task_idx + 1,
                tasks: [...state.tasks, 
                    {
                        id: state.task_idx,
                        topicId: payload.topicId,
                        title: payload.title,
                        mediaTitle: payload.mediaTitle,
                        status: payload.status
                    }
                ]
            }    
        case ActionTypes.TASK_UPDATE:            
            return {
                ...state,
                tasks: state.tasks.map((_task) => {
                    if(_task.id === payload.id)
                        return {
                            ..._task,
                            title: payload.title,
                            mediaTitle: payload.mediaTitle,
                            status: payload.status
                        }
                    return _task
                })
            }    
        case ActionTypes.TASK_DELETE:
            return {
                ...state,
                tasks: state.tasks.filter((_task) => _task.id !== payload.id)
            }  
        default:
            return state;
    }
}
  