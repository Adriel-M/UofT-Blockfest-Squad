import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron } from 'react-bootstrap';
const BACKEND_URL = 'http://localhost:3000';

export default class ViewUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iFrameHeight: '0px'
        }
    }

    render() {
        const iframeSrc = `${BACKEND_URL}/address/${this.props.ipfsAddress}`;
        return (
            <Jumbotron>
                <iframe 
                    style={{width:'100%', height:this.state.iFrameHeight, overflow:'scroll'}}
                    onLoad={() => {
                        const obj = ReactDOM.findDOMNode(this);
                        this.setState({
                            "iFrameHeight":  800 + 'px'
                        });
                    }} 
                    ref="iframe" 
                    src={iframeSrc} 
                    width="100%" 
                    height={this.state.iFrameHeight} 
                    scrolling="yes" 
                    frameBorder="0"
                />
            </Jumbotron>
        )
    }
}