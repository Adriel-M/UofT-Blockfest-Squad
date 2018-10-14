import React, { Component } from 'react';

import Search from './Search';
import SnapshotListing from './SnapshotListing';
import NavBar from './NavBar';
import ViewUrl from './ViewUrl';

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
    });
  }

  renderPage() {
    if (this.state.ipfsAddress) {
        return <ViewUrl ipfsAddress={this.state.ipfsAddress} />
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
