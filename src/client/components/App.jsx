import React, { Component } from 'react';

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            title: 'My React Boilerplate!'
        }
    }

    render(){
        return(
            <div class="app-container">
                <h1>{this.state.title}</h1>
            </div>
        );
    }
}

export default App;