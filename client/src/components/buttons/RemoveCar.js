import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_CAR, REMOVE_CAR } from '../../queries'
import {filter} from  'lodash' 

const RemoveCar = ({id, year, make, model, price, personId}) => {
    
    const [removeCar] = useMutation(REMOVE_CAR)

    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to delete!");
        if(result){
            removeCar({
                variables:{
                    id
                },
                optimisticResponse:{
                    __typename:'Mutation',
                    removeCar:{
                        __typename:'Car',
                        id,
                        year,
                        make,
                        model,
                        price,
                        personId
                    }
                },
                update:(proxy, {data : {removeCar}}) =>{
                    const { car } = proxy.readQuery({ query : GET_CAR })
                    
                    proxy.writeQuery({
                        query: GET_CAR,
                        data :{
                            car: filter(car, c => {
                                return c.id !== removeCar.id
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

export default RemoveCar;