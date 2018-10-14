import React from 'react';
import { Jumbotron } from 'react-bootstrap';
const BACKEND_URL = 'https://localhost:3000';
export default function(props) {
    const iframeSrc = `${BACKEND_URL}/address/${props.ipfsAddress}`;
    return (
        <iframe src={iframeSrc} />
    )
}
