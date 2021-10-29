import React, { useState } from "react";
import { List } from 'antd'
import CarListItem from "../listItems/CarListItem";
import { GET_CAR, GET_CAR_PER_OWNER } from "../../queries";
import { useQuery } from "@apollo/client";

const getStyle = () => ({
    list:{
        display:'flex',
        justifyContent:'center'
    }
})

const CarList = props => {
    const [personId] = useState(props.personId)
    const styles = getStyle()
    const {load} = useQuery(GET_CAR)
    const {loading, error, data} = useQuery(GET_CAR_PER_OWNER,{
        variables: {personId}
    })
    if(loading) return 'loading...'
    if(error) return `Error : ${error.message}`

    return(
        <List grid={{gutter:30, column:1}} style={styles.list}>
            {
                data.carsPerOwner.map(({id,year, make, model, price,personId}) => (
                    <List.Item key={id}>
                        <CarListItem  key={id} id={id} year = {year} make = {make} model = {model} price = {price} personId = {personId} />
                    </List.Item>
                ))
            }
        </List>
    )
}

export default CarList