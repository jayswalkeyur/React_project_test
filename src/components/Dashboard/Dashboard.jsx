// Dashboard.js
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Dashboard = () => {
    const data = [
        { title: "Card 1", content: "This is the content of card 1." },
        { title: "Card 2", content: "This is the content of card 2." },
        { title: "Card 3", content: "This is the content of card 3." },
        { title: "Card 4", content: "This is the content of card 4." },
    ];

    return (
        <div className="container mt-4">
            <h2>Dashboard</h2>
            <Row>
                {data.map((item, index) => (
                    <Col key={index} md={3} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Dashboard;
