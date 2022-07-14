import ActionTypes from '../constants/ActionTypes';
import { AnyAction, Dispatch } from "redux"
import { TASK_STATUS } from '../../types';

export function addTopic(title : string) {
    return (dispatch : Dispatch<AnyAction>) => {
        dispatch({
            type: ActionTypes.TOPIC_ADD,
            payload: {
                title: title
            }
        })
    };
}

export function updateTopic(id: number, title : string) {
    return (dispatch : Dispatch<AnyAction>) => {
        dispatch({
            type: ActionTypes.TOPIC_UPDATE,
            payload: {
                id: id,
                title: title
            }
        })
    };
}

export function deleteTopic(id: number) {
    return (dispatch : Dispatch<AnyAction>) => {
        dispatch({
            type: ActionTypes.TOPIC_DELETE,
            payload: {
                id: id
            }
        })
    };
}

export function addTask(topicId: number, title : string, mediaTitle: string, status: TASK_STATUS) {
    return (dispatch : Dispatch<AnyAction>) => {
        dispatch({
            type: ActionTypes.TASK_ADD,
            payload: {
                topicId: topicId,
                title: title,
                mediaTitle: mediaTitle,
                status: status
            }
        })
    };
}

export function updateTask(id: number, title : string, mediaTitle: string, status: TASK_STATUS) {
    return (dispatch : Dispatch<AnyAction>) => {
        dispatch({
            type: ActionTypes.TASK_UPDATE,
            payload: {
                id: id,
                title: title,
                mediaTitle: mediaTitle,
                status: status
            }
        })
    };
}

export function deleteTask(id: number) {
    return (dispatch : Dispatch<AnyAction>) => {
        dispatch({
            type: ActionTypes.TASK_DELETE,
            payload: {
                id: id
            }
        })
    };
}