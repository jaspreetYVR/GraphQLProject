import {gql} from '@apollo/client'

export const GET_PEOPLE = gql`
    {
        peoples {
            id
            firstName
            lastName
        }
    }
`

export const GET_CAR = gql`
    {
        car {
            id
            year
            make
            model
            price
            personId
          }
    }
`
export const GET_CAR_PER_OWNER = gql`
    query GetCarsPerOwnerQuery($personId: String!) {
        carsPerOwner(personId: $personId) {
        id
        year
        make
        model
        price
        personId
        }
    }
`

export const ADD_PEOPLE = gql`
    mutation AddPeopleMutation($id: String!, $firstName: String!, $lastName: String!) {
        addPeople(id: $id, firstName: $firstName, lastName: $lastName) {
        id
        firstName
        lastName
        }
    }
`

export const ADD_CAR = gql`
    mutation AddCarMutation($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
        addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
        id
        year
        make
        model
        price
        personId
        }
    }
`        
   

export const REMOVE_PEOPLE = gql`
    mutation RemovePeopleMutation($id: String!) {
        removePeople(id: $id) {
        id
        firstName
        lastName
        }
    }
`
export const REMOVE_CAR = gql`
    mutation RemoveCarMutation($id: String!) {
        removeCar(id: $id) {
          id
          year
          make
          model
          price
          personId
        }
      }
`

export const UPDATE_PEOPLE = gql`
    mutation UpdatePeopleMutation($id: String!, $firstName: String, $lastName: String) {
        updatePeople(id: $id, firstName: $firstName, lastName: $lastName) {
        id
        firstName
        lastName
        }
    }
`

export const UPDATE_CAR = gql`
    mutation UpdateCarMutation($id: String!, $year: String, $make: String, $model: String, $price: String, $personId: String) {
        updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
        id
        year
        model
        price
        personId
        make
        }
  }
`

export const GET_PERSON_CAR = gql`
    query carPersonQuery($id: String!) {
        person(id: $id) {
        id
        firstName
        lastName
        carPerson {
            id
            year
            make
            model
            price
            personId
        }
        }
    }
`