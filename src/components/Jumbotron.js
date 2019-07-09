import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import backgroundImage from '../assets/bg.jpeg';

const Styles = styled.div`
    .jumbo{
        background: url(${backgroundImage}) no-repeat fixed bottom;
        background-size: cover;
        color: #ccc;
        height: 200px;
        position: relative;
        z-index: -2;
    }

    .overlay{
        background-color: #000;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        right : 0;
        bottom:0;
        z-index: -2;
    }
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                <h1>Uberlo Rideshare Services</h1>
                <h3> إركب أدلعك إنزل أدفعك</h3>
            </Container>
        </Jumbo>
    </Styles>

)