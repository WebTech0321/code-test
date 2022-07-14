import React, { ChangeEvent, useState } from "react"
import { ActionIcon, Button, Chips, Chip, TextInput } from '@mantine/core';
import { Edit, Trash, Lock, LockOpen, PlayerPlay } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks'
import { ITask, TASK_STATUS } from "../types";
import { addTask, updateTask, deleteTask } from "../store/actions";

interface ITaskProps {
    index: number,
    task: ITask,
    active?: boolean,
    newTask?: boolean,
    onClick?: () => void,
    onCompleteAdd?: () => void
}

export const Task = ({
    index,
    task,
    active,
    newTask,
    onClick,
    onCompleteAdd,
} : ITaskProps) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(task.title)
    const [mediaTitle, setMediaTitle] = useState(task.mediaTitle)
    const [status, setStatus] = useState<TASK_STATUS>(task.status)
    const [isEdit, setEdit] = useState(false)
    
    const handleClick = () => {
        if( onClick) onClick()
    }

    const updateStatus = (_status: string) => {
        if(_status === "NONE") setStatus("NONE")
        else if(_status === "LOCKED") setStatus("LOCKED")
        else if(_status === "OPEN") setStatus("OPEN")
    }

    const handleSaveTask = () => {
        setEdit(false)
        if(newTask)
            dispatch(addTask(task.topicId, title, mediaTitle || "", status))
        else
            dispatch(updateTask(task.id, title, mediaTitle || "", status))
        if( newTask && onCompleteAdd ) onCompleteAdd()
    }
    
    const handleCancelSaveTask = () => {
        setTitle(task.title)
        setEdit(false)
        if( newTask && onCompleteAdd ) onCompleteAdd()
    }

    const handleDelete = () => {
        dispatch(deleteTask(task.id))
    }

	return (
    <div 
        className={`task-view ${active || newTask ? 'active' : ''}`} 
        onClick={() => handleClick()}
    >
        {!newTask && 
        <div className="d-flex align-items-center justify-content-end">
            <div>
                {task.status === "OPEN" &&
                <div className="d-flex align-items-center">
                    <LockOpen />
                    <div>Open for preview</div>
                </div>
                }
                {task.status === "LOCKED" &&
                <div className="d-flex align-items-center">
                    <Lock />
                    <div>Locked</div>
                </div>
                }
            </div>
            <ActionIcon variant="hover" className="ms-3" onClick={() => setEdit(true)}>
                <Edit />
            </ActionIcon>
            <ActionIcon variant="hover" className="ms-3" onClick={handleDelete}>
                <Trash />
            </ActionIcon>
        </div>
        }

        {(isEdit || newTask) ?
        <>
            <TextInput 
                className="mb-3"
                label="Task Name"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextInput 
                className="mb-3"
                label="Media Title"
                value={mediaTitle} 
                onChange={(e) => setMediaTitle(e.target.value)}                
            />
            <Chips className="mb-3" multiple={false} value={status} onChange={updateStatus}>
                <Chip value="NONE">None</Chip>
                <Chip value="LOCKED">Locked</Chip>
                <Chip value="OPEN">Open for preview</Chip>
            </Chips>
            <div className="d-flex">
                <Button className="me-3" onClick={handleSaveTask}>Save</Button>
                <Button variant="outline" className="me-3" onClick={handleCancelSaveTask}>Cancel</Button>    
            </div>
        </>
        :
        <>
            <div>{index}. {task.title}</div>
            {active &&
            <div className="mt-3 d-flex align-items-center">
                <div className="video-player d-flex align-items-center justify-content-center">
                    <PlayerPlay />
                </div>
                <div className="ms-3">
                    {task.mediaTitle}
                </div>
            </div>
            }
            
        </>
        }
    </div>
	)
}

export default Task