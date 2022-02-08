import React, {Component} from 'react';
//below components section
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

import ErrorBoundry from '../containers/errorBoundry'

import './App.css'



class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ''
         };
    }

    // onSearchChange = (event) => {
    //     this.setState({searchField: event.target.value})
    // }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return  response.json() })
            .then(users => { this.setState({ robots: users}) })
    }

    //this 'event' hapend in the input value of the search box Component,
    // but we need to bind this function search field to parent state that why I'm using arrow function and 'this.state'
    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})  
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
        return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        return (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }   
}

 export default App;