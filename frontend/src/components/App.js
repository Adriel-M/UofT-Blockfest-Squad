import React, { Component } from 'react';

import Search from './Search';
import SnapshotListing from './SnapshotListing';
// import SnapshotList from './SnapshotList';
// import HeadNav0 from './HeadNav0';
import NavBar from './NavBar'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      ipfsAddress: '',
    }
    this.setUrl = this.setUrl.bind(this);
    this.setIpfsAddress = this.setIpfsAddress.bind(this);
  }

  setUrl(url) {
    this.setState({
        url,
    });
  }

  setIpfsAddress(ipfsAddress) {
    this.setState({
      ipfsAddress,
    })
  }

  renderPage() {
    if (this.state.ipfsAddress) {
        // noop
    } else if (this.state.url) {
        return <SnapshotListing url={this.state.url} setIpfsAddress={this.setIpfsAddress} />
    } else {
        return <Search setUrl={this.setUrl} setIpfsAddress={this.setIpfsAddress} />
    }
  }

  render() {

    const pageToRender = this.renderPage();
    return (
      <div>
        <NavBar />
        {pageToRender}
      </div>
    );
  }
}
