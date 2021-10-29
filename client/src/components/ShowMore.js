import React, {useState} from "react";
import {useLocation} from 'react-router-dom'
import { GET_PERSON_CAR } from "../queries";
import PeopleListItem from "./listItems/PeopleListItem";
import { useQuery } from "@apollo/client";
import {List} from 'antd'
import UpdatePerson from "./forms/UpdatePerson";
import { Card } from "antd";
import CarListItem from "./listItems/CarListItem";
import { Link } from "react-router-dom";

const getStyle = () => ({
    list:{
        display:'flex',
        justifyContent:'center'
    },
    card:{
        width:'500px'
    }
})

const ShowMore = props => {
    const styles = getStyle();
    const location = useLocation()
    const { id } = location.state
    const {loading, error, data} = useQuery(GET_PERSON_CAR,{
        variables: {id}
    })
    if(loading) return 'loading...'
    if(error) return `Error : ${error.message}`
    

    return(

        <>
        <Link to ="/">Go Back Home</Link>
        <List grid={{gutter:30, column:1}} style={styles.list}>
                <List.Item key={id}>
                    <Card style = {styles.card}>
                                            {data.person.firstName} {data.person.lastName}
                                            <List grid={{gutter:30, column:1}} style={styles.list}>
                                            {
                                                data.person.carPerson.map(({id,year, make, model, price,personId}) => (
                                                    <List.Item key={id}>
                                                        <CarListItem  key={id} id={id} year = {year} make = {make} model = {model} price = {price} personId = {personId} />
                                                    </List.Item>
                                                ))
                                            }
                                        </List>
                                </Card>
                </List.Item>
        </List>
        </>
    )
}

export default ShowMore