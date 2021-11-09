import React, { Component } from 'react';
import './App.css';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component'

class App extends Component {
  constructor() {
    super()

    // we set the state to be empty to wait for the component to mount and then fetch the data
    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  // this is called when the component is rendered to the DOM for the first time
  componentDidMount() {
    // fetches data from an API
    fetch('https://jsonplaceholder.typicode.com/users')
    // converts the data body into JSON
    .then(response => response.json())
    // sets the state using this data for the monsters
    .then(users => this.setState({monsters: users}))
  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value})
  }

  render() {

    // filtering monsters only including the searchField value to filter from
    const { monsters, searchField } = this.state
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      )

    return (
      <div className='App'>
      <h1> Monsters Rolodex </h1>
      <SearchBox
        placeholder='search monsters'
        handleChange={this.handleChange}
      />
      <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;