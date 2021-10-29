import React, { useEffect, useState } from "react";
import { Form, Input, Button} from 'antd'
import { useMutation } from "@apollo/client";
import { UPDATE_PEOPLE } from "../../queries";

const UpdatePerson = props => {
    const [id] = useState(props.id)
    const [firstName,setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)

    const [updatePeople] = useMutation(UPDATE_PEOPLE)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect( () => {
        forceUpdate()
    },[])

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable,value)
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

    const onFinish = values => {
        const {firstName, lastName} = values

        updatePeople({
            variables:{
                id,
                firstName,
                lastName
            },
            optimisticResponse:{
                __typename: 'Mutation',
                updatePeople:{
                    __typename: 'People',
                    id,
                    firstName,
                    lastName
                }
            }
        })

        props.handleButtonClick()
    }

    return(
        <Form
        name="Person-update-form"
        form={form}
        layout="inline"
        onFinish={onFinish}
        size="large"
        initialValues={{
            firstName:firstName,
            lastName: lastName
        }}
        >
            <Form.Item
            name='firstName'
            rules={[{required:true, message:"please input a first name"}]}
            >
                <Input placeholder="i.e. Jaspreet" onChange = { e => updateStateVariable('firstName', e.target.value) }/>
            </Form.Item>

            <Form.Item
            name='lastName'
            rules={[{required:true, message:"please input a last name"}]}
            >
                <Input placeholder = "i.e. Singh" onChange = { e => updateStateVariable('lastName', e.target.value) } />
            </Form.Item>

            <Form.Item>
                <Button onClick = {props.handleButtonClick}>Cancel</Button>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {
                    () => (
                        <Button
                        type = "primary"
                        htmlType = "submit"
                        disabled = {
                            (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) || form.getFieldsError().filter(({errors}) => errors.length).length
                        }
                        >Update Details</Button>
                    )
                }
            </Form.Item>
        </Form>
    )
}

export default UpdatePerson