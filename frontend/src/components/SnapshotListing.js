import React, { Component } from 'react';
import { Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

const BACKEND_URL = "http://localhost:3000";

export default class SnapshotListing extends Component {
    constructor(props) {
        super(props);

        this.generateListEntry = this.generateListEntry.bind(this);
    }

    componentsWillRecieveProps() {
        console.log("aha")


    }

    generateListEntry(entry) {
        const dt = new Date(0);
        dt.setUTCSeconds(entry.time);
        console.log('wee');
        return (
            <ListGroupItem onClick={() => { this.props.setIpfsAddress(entry.ipfs)}} key={entry.ipfs}>{dt.toString()}</ListGroupItem>
        )
    }

    render() {
        return (
            <Jumbotron>
                <h1>{this.props.url}</h1>
                <ListGroup>
                    {this.props.entries.map(this.generateListEntry)}
                </ListGroup>
            </Jumbotron>
        )
    }
}
