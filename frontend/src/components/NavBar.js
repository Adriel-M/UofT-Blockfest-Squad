import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar className="navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Not Archive.org</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        )
    }
}
