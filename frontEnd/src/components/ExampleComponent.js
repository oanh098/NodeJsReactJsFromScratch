import React, { component } from 'react';

class ExampleComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            articles : [
                {   title: "React Redux Tutorial for Beginner ", id:1 },
                {   title: "Typescript Tutorial for Beginner", id:1 }
            ]
        };
    }

    render() {
        const { articles } = this.state;
        return (
            <ul>
                {articles.map(el => <li key={el.id}>{el.title}</li>)}
            </ul>
        )
    }
}

export default ExampleComponent