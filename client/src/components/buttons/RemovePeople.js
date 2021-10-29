import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE, REMOVE_PEOPLE } from '../../queries'
import {filter} from  'lodash' 

const RemovePeople = ({id, firstName, lastName}) => {

    const [removePeople] = useMutation(REMOVE_PEOPLE)

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to delete!");
        if(result){
            removePeople({
                variables:{
                    id
                },
                optimisticResponse:{
                    __typename:'Mutation',
                    removePeople:{
                        __typename:'People',
                        id,
                        firstName,
                        lastName
                    }
                },
                update:(proxy, {data : {removePeople}}) =>{
                    const { peoples } = proxy.readQuery({query : GET_PEOPLE})
                    proxy.writeQuery({
                        query: GET_PEOPLE,
                        data :{
                            peoples: filter(peoples, p => {
                                return p.id !== removePeople.id
                            })
                        }
                    })
                }
            })
        }
    }

    return(
        <DeleteOutlined 
        key="delete"
        style={{color:"red"}}
        onClick={handleButtonClick}
        />
    )
}

export default RemovePeople;