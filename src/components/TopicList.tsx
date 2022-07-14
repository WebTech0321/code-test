import React, { useState } from "react"
import { Button, Input } from '@mantine/core';
import { CirclePlus } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../hooks'
import { addTopic } from "../store/actions"
import { ITopic } from "../types";

interface ITopicListProps {
    active: number,
    onActiveChange?: (active: number) => void
}

export const TopicList = ({
    active,
    onActiveChange
} : ITopicListProps) => {
    const dispatch = useAppDispatch();
    const topics = useAppSelector<ITopic[]>(state => state.course.topics);
    const [isAdding, setAdding] = useState(false)
    const [newTopicTitle, setNewTopicTitle] = useState("")

    const handleClickTopic = (idx: number) => {
        if( onActiveChange ) 
            onActiveChange(idx)
    }

    const handleSaveTopic = () => {
        if(newTopicTitle.length === 0) return false;

        setAdding(false)
        dispatch(addTopic(newTopicTitle))
        setNewTopicTitle("")
    }

    const handleCancelSaveTopic = () => {
        setAdding(false)
        setNewTopicTitle("")
    }
    
	return (
        <div>
            {topics.map((_topic, idx) => (
                <div 
                    key={`topic-${_topic.id}`}
                    className={`topic-label ${active === idx ? 'active' : ''}`} 
                    onClick={() => handleClickTopic(idx)}
                >
                    {_topic.title}
                </div>    
            ))}
            <div className="mt-2">
                {isAdding ?
                <div>
                    <input 
                        placeholder="Topic Title" 
                        className="mb-2 w-100"
                        value={newTopicTitle} 
                        onChange={(e) => setNewTopicTitle(e.target.value)}
                    />
                    <div className="d-flex">
                        <Button className="w-100" onClick={handleSaveTopic}>Save</Button>
                        <Button variant="outline" className="ms-3 w-100" onClick={handleCancelSaveTopic}>Cancel</Button>    
                    </div>
                </div>
                :
                <Button variant="white" color="gray" leftIcon={<CirclePlus size={24} />} onClick={() => setAdding(true)}>
                    New Topic
                </Button>
                }
            </div>
        </div>
	)
}

export default TopicList