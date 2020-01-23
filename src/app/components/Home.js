import React from "react";
import { browserHistory } from "react-router";

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: '',
            error: null,
            isLoggedIn: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.route.path == 'home/logout') {
            sessionStorage.clear();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('A name was submitted: ', this.state);
        fetch("http://127.0.0.1:2300/user/login", {
          method: 'POST',
          body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
        .then(res => res.json())
        .then(
          (result) => {
              console.log('result', result)
            if(!result.err) {
                this.setState({
                    token: result.data.token
                });
                sessionStorage.setItem('token', this.state.token);
                browserHistory.push("/user");
            } else {
                this.setState({
                    error: true
                })
            }
          },
          (error) => {
            console.log('error')
            this.setState({
              error
            });
          }
        )
        event.preventDefault();
    }

    render() {
        const error = this.state.error;
        let button;
        if (error) {
            button = <p>Email and passwors incorrect</p>;
        } else {
            button = <p></p>;
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>
            <label>
              Email:
              <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
            </label>
            <label>
              Password:
              <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Submit"  className="btn btn-primary"/>
            {button}
          </form>
        );
    }
}