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

class TopRanked extends Component {
    async componentDidMount() {
        await this.props.fetchInitialUsers()
    }

    render() {
        const users = this.props.users
        const { deleteUser } = this.props
        const usersValues = []
        if (users.length) {
            users.map(user => {
                const values = Object.values(user)
                if (values[3]) {
                    usersValues.push(values[3])
                }
            })
        }
        const sortedValues = usersValues.sort((a, b) => a - b)

        return (
            <div>
                <ul className = 'list-group'>
                    {users.map(user => {
                        if (user.rank === sortedValues[0]){
                        return (
                            <li key = {user.name} className = 'list-group-item'>
                                {user.name}
                            <br/>
                                {user.bio}
                            <br/>
                              <span className = 'badge badge-success' style={{marginBottom: 10}}> Ranked {user.rank} </span>  
                            <br/>
                            <button type='submit' onClick = { () => deleteUser(user.id)} className = 'btn btn-warning'>Delete</button>
                            </li>
                            )}
                        })    
                    }

                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopRanked)