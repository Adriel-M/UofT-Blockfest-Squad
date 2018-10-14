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
      entries: [],
    }
    this.setUrl = this.setUrl.bind(this);
    this.setIpfsAddress = this.setIpfsAddress.bind(this);
    this.setEntries = this.setEntries.bind(this);
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

  setEntries(entries) {
    console.log('new entries', entries)
    this.setState({
      entries,
    })
  }

  renderPage() {
    if (this.state.ipfsAddress) {
        return <ViewUrl ipfsAddress={this.state.ipfsAddress} />
    } else if (this.state.url) {
        return <SnapshotListing url={this.state.url} setIpfsAddress={this.setIpfsAddress} entries={this.state.entries}/>
    } else {
        return <Search setUrl={this.setUrl} setIpfsAddress={this.setIpfsAddress} setEntries={this.setEntries}/>
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
