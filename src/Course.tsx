import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from './hooks'
import Topic from './components/Topic';
import TopicList from "./components/TopicList"
import { ITopic } from './types';

function Course() {
    const topics = useAppSelector<ITopic[]>(state => state.course.topics);
    const [currentTopicIdx, setCurrentTopicIdx] = useState(0)

    return (
        <div className="container">
            <h1 className="mb-5">Course</h1>

            <Row>
                <Col sm={4} lg={3}>
                    <TopicList active={currentTopicIdx} onActiveChange={setCurrentTopicIdx} />
                </Col>
                <Col sm={8} lg={9}>
                    {topics.map((_topic) => (
                        <Topic 
                            key={`topic-main-${_topic.id}`}
                            topic={_topic}
                        />
                    ))}
                </Col>
            </Row>
        </div>
  );
}

export default Course;
