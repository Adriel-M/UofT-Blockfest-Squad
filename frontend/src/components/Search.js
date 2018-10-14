import React, { Component } from 'react';
import { Jumbotron, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';

const BACKEND_URL = "http://localhost:3000";

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
      </FormGroup>
    );
}

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleScrape = this.handleScrape.bind(this);
    }

    handleChange(event) {
        this.setState({
            url: event.target.value,
        });
    }

    handleScrape(event) {
        axios.post(`{BACKEND_URL}/scrape`, {
            url: this.state.url
        }).then(function(response) {
            this.props.setIpfsAddress(response.data);
        });
    }

    handleSubmit(event) {
        this.props.setUrl(this.state.url);
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        return (
            <Jumbotron>
                <form onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Text"
                        placeholder="Enter Url"
                        onChange={this.handleChange}
                    />
                    <Button onClick={this.handleScrape}>Scrape</Button>
                    <Button type="submit">Explore</Button>
                </form>

            </Jumbotron>
        )
    }
}


