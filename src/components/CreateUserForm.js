import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createUser, submitUser } from '../store'

const mapStateToProps = (state) => {
    return (
            {
                users: state.users,
                newUser: state.newUser
            }
        )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (inputUser) => dispatch(createUser(inputUser)),
        submitUser: (user) => dispatch(submitUser(user))
    }
}

class CreateUserForm extends Component {
    constructor () {
        super()
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(ev) {
        this.props.createUser({...this.props.newUser, [ev.target.name]: ev.target.value})
    }

    

    render () {
        const { history } = this.props
        const {handleChange} = this

        const handleSubmit = (ev) => {
            ev.preventDefault()
            this.props.submitUser(this.props.newUser)
            history.push('/users')
        } 

        return (
            <form onSubmit = {handleSubmit}>
                <input name = 'name' value = {this.props.newUser.name} onChange = {handleChange} type='text' placeholder = 'Name' className = 'form-control'/>
                <input name = 'bio' value = {this.props.newUser.bio} onChange = {handleChange} type='text' placeholder = 'Bio'  className = 'form-control'/>
                <input name = 'rank' value = {this.props.newUser.rank} onChange = {handleChange} type='text' placeholder = 'Rank'  className = 'form-control'/>
                <button type='submit' className = 'btn btn-primary'>Submit</button>
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm)