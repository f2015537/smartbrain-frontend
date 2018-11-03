import React, { Component } from 'react'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }
    handleChange = e => {
        this.setState({
        [e.target.id]: e.target.value
    })}

    handleSubmit = e => {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
        
    }
    render(){
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={this.handleChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={this.handleChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.handleChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={this.handleSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                </div>
                </main>
            </article>
              )
    }
}

export default Register