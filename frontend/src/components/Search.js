import React, { Component } from 'react';
import { Jumbotron, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';

const SCRAPE_URL = "http://localhost:3002";
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
        const self = this;
        axios.post(`${SCRAPE_URL}/scrape`, {
            url: self.state.url
        }).then(function(response) {
            self.props.setIpfsAddress(response.data);
        });
    }

    handleSubmit(event) {
        const self = this;
        if (this.state.url) {
            axios.post(`${BACKEND_URL}/explore`, {
                url: self.state.url,
            }).then(function(response) {
                console.log('set');
                try {
                    self.props.setEntries(response.data);
                    self.props.setUrl(self.state.url);




                } catch (e) {
                    console.log(e);
                }
            })
        }
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


