import React, { useState } from "react"
import { Button, Collapse, Menu, Divider } from '@mantine/core';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks'
import { ITask, ITopic } from "../types";
import { updateTopic, deleteTopic } from "../store/actions";
import Task from "./Task";

interface ITopicProps {
    topic: ITopic
}

export const Topic = ({
    topic
} : ITopicProps) => {
    const tasks = useAppSelector<ITask[]>(state => state.course.tasks);
    const dispatch = useAppDispatch();
    const [topicTitle, setTopicTitle] = useState(topic.title)
    const [opened, setOpen] = useState(true);
    const [activeTask, setActiveTask] = useState<ITask>()
    const [isEdit, setEdit] = useState(false)
    const [isAddTask, setAddTask] = useState(false)

    const handleClickTitle = () => {
        if(isEdit) return;
        setOpen((s) => !s)
    }

    const handleDelete = () => {
        dispatch(deleteTopic(topic.id))
    }

    const handleSaveTopic = () => {
        if(topicTitle.length === 0) return false;

        setEdit(false)
        dispatch(updateTopic(topic.id, topicTitle))
    }

    const handleCancelSaveTopic = () => {
        setEdit(false)
        setTopicTitle(topic.title)
    }
    
	return (
    <>
        <div className="d-flex align-items-center">
            <div className="topic-title d-flex align-items-center" onClick={handleClickTitle}>
                {isEdit ? 
                <div className="d-flex align-items-center">
                    <input 
                        className="me-3"
                        value={topicTitle} 
                        onChange={(e) => setTopicTitle(e.target.value)}
                    />
                    <Button className="me-3" onClick={handleSaveTopic}>Save</Button>
                    <Button variant="outline" className="me-3" onClick={handleCancelSaveTopic}>Cancel</Button>    
                </div>
                : 
                <span className="me-3">{topic.title}</span>
                }
                {opened ? 
                    <ChevronDown /> : <ChevronUp />
                }
            </div>
            <Menu placement="end">
                <Menu.Item onClick={() => setEdit(true)}>Edit</Menu.Item>
                <Menu.Item color="red" onClick={handleDelete}>Delete</Menu.Item>
            </Menu>
        </div>
        <Divider />

        {opened &&
        <>
            {tasks.filter((_task) => _task.topicId === topic.id).map((_task, idx) => (
            <Task 
                index={idx + 1}
                key={`task-${_task.id}`} 
                task={_task}
                active={!isAddTask && activeTask?.id === _task.id}
                onClick={() => setActiveTask(_task)}
            />
            ))}
            {isAddTask ? 
            <div className="mt-3">
            <Task 
                index={0}
                task={{id: 0, topicId: topic.id, title: "", status: "NONE"}} 
                onCompleteAdd={() => {
                    setAddTask(false)
                    setActiveTask(undefined)
                }}
                newTask 
            />
            </div>
            :
            <Button variant="default" radius="xl" className="mt-3" onClick={() => setAddTask(true)}>Add Task</Button>
            }
        </>
        }
    </>
	)
}

export default Topic