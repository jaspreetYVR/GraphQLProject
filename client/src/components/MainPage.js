import React from "react";
import AddCar from './forms/AddCar'
import PeopleList from './lists/PeopleList'
import AddPerson from './forms/AddPerson'

const MainPage = () => {
    return(
        <>
            <AddPerson />
            <AddCar />
            <PeopleList/>
        </>  
    )
}

export default MainPage