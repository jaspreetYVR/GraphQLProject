import React, { useState } from "react";
import {Card} from "antd"
import RemovePeople from "../buttons/RemovePeople";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../forms/UpdatePerson";
import CarList from "../lists/CarList";
import ShowMore from "../ShowMore"
import { Link } from "react-router-dom";

const getStyle = () => ({
    card:{
        width:'500px'
    }
})

const PeopleListItem = (props) => {
    const [id] = useState(props.id)
    const [firstName,setFirstName] = useState(props.firstName)
    const [lastName,setLastName] = useState(props.lastName)
    const [editMode, setEditMode] = useState(false)

    const styles = getStyle()

    const updateStateVariable = (variable, value) => {
        switch(variable){
            case 'firstName':
                setFirstName(value)
                break;
            case 'lastName':
                setLastName(value)
                break;
            default:
                break
        }
    }

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    

    return(

        <div>
            {editMode ? <UpdatePerson 
                            id = {props.id}
                            firstName = {props.firstName}
                            lastName = {props.lastName}
                            updateStateVariable = {updateStateVariable}
                            handleButtonClick = {handleButtonClick}
                        /> : 
                        <Card style = {styles.card}
                            actions = {[ <EditOutlined key = "edit" onClick = {handleButtonClick} /> ,
                                     <RemovePeople id = {id} firstName={firstName} lastName={lastName} />]}>
                                    {firstName} {lastName}

                            <CarList personId = {id}/>

                            <Link to = {{
                                pathname : "/showmore",
                                state : {
                                    id : id
                                }
                            }}> Show More </Link>
                        </Card>
            }
        </div>
    )
}

export default PeopleListItem