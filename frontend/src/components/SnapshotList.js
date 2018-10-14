import { Link } from 'react-router-dom'
import React, { Component } from 'react';
export default function(props) {
  const renderItem = function(entry) {
    return (
      <li key={entry.time}> <a href={entry.ipfs}> {entry.time} </a></li>
    )
  }
  return (
    <div>{props.url}
     <ul>
         {props.entries.map(renderItem)}
     </ul>
    </div>
  )
}
