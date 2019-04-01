import React, { Component } from 'react';
import { fetchUsers, deleteUser } from '../store'
import { connect } from 'react-redux'

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchInitialUsers: () => dispatch(fetchUsers()),
        deleteUser: (id) => dispatch(deleteUser(id))
    }
}

const mapStateToProps = ( state ) => {
    return {
        users: state.users
    }
}

class Users extends Component {
    async componentDidMount() {
        await this.props.fetchInitialUsers()
    }

    render() {
        const users = this.props.users
        const { deleteUser } = this.props
        
        return (
            <div>
                <ul className = 'list-group'>
                    {users.map(user => (
                        <li key = {user.name} className = 'list-group-item'>
                            {user.name}
                            <br/>
                            {user.bio}
                            <br/>
                            <span className = 'badge badge-success' style={{marginBottom: 10}}>Ranked {user.rank}</span>
                            <br/>
                            <button type='submit' className = 'btn btn-warning' onClick = { () => deleteUser(user.id)}>Delete</button>
                        </li>
                    ))    
                    }

                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)