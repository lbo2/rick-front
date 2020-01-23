import React from "react";
import { browserHistory } from "react-router";

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          isLoggedIn: false
        };
      }
    
      componentDidMount() {
        fetch("http://127.0.0.1:2300/getdata", {
			method: 'POST',
			body: JSON.stringify({
				token: sessionStorage.getItem('token')
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result,
                error: (result.err == true ? {message: 'Invalid session'} : null)
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      render() {
        const { error, isLoaded, items } = this.state;
        const style = {"margin-bottom": '2em'};
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <ul>
              {items.map(item => (
                <div className="row" key={item.name} style={style}>
                    <div className="col-md-6"><img src={item.image}></img></div>
                    <div className="col-md-4">
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Status:</strong> {item.status}</p>
                        <p><strong>Specie:</strong> {item.species}</p>
                        <p><strong>Gender:</strong> {item.gender}</p></div>
                </div>
                
              ))}
            </ul>
          );
        }
      }
}