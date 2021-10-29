import React from "react";
import PeopleListItem from "../listItems/PeopleListItem";
import {List} from 'antd'
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";

const getStyle = () => ({
    list:{
        display:'flex',
        justifyContent:'center'
    }
})

const PeopleList = () => {
    const styles = getStyle();
    const {loading, error, data} = useQuery(GET_PEOPLE)
    if(loading) return 'loading...'
    if(error) return `Error : ${error.message}`

    return(
        <List grid={{gutter:30, column:1}} style={styles.list}>
            {
                data.peoples.map(({id,firstName, lastName}) => (
                    <List.Item key={id}>
                        <PeopleListItem key={id} id={id} firstName={firstName} lastName={lastName} />
                    </List.Item>
                ))
            }
        </List>
    )
}

export default PeopleList