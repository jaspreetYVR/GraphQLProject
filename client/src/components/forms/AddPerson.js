import React,{ useState, useEffect} from 'react'
import {Form,Input, Button} from 'antd'
import { useMutation } from '@apollo/client'
import { v4 as uuidv4} from 'uuid'
import { ADD_PEOPLE, GET_PEOPLE } from '../../queries'

const AddPerson = () => {
    const [id] = useState(uuidv4())
    const [form] = Form.useForm()
    const [,forceUpdate] = useState()
    const [addPeople] = useMutation(ADD_PEOPLE)

    useEffect(() => {
        forceUpdate({})
    },[])

    const onFinish = values => {
        const {firstName, lastName} = values

        addPeople({
            variables:{
                id, 
                firstName,
                lastName
            },
            optimisticResponse:{
                __typename: 'Mutation',
                addPeople:{
                    __typename: 'People',
                    id,
                    firstName,
                    lastName
                }
            },
            update:(proxy, {data : {addPeople}}) => {
                const data = proxy.readQuery({query : GET_PEOPLE})
                proxy.writeQuery({
                    query: GET_PEOPLE, 
                    data : {
                    ...data, peoples : [...data.peoples,addPeople]
                }})
            }
        })
    }

    return(
        <Form
        name="Add person Form"
        size="large"
        layout="inline"
        onFinish = {onFinish}
        style={{marginBottom: '40px'}}
        form={form}
        >
            <Form.Item name="firstName" rules={[{required:true, message:"please enter your first name"}]}>
                <Input placeholder="i.e. John"/>
            </Form.Item>

            <Form.Item name="lastName" rules={[{required:true, message:"please enter your last name"}]}>
                <Input placeholder="i.e. Cena"/>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {
                    () => (
                        <Button type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) || form.getFieldsError().filter(({errors}) => errors.length).length
                                }
                        >
                            Add Person
                        </Button>
                    )
                }
            </Form.Item>
        </Form>
    )
}

export default AddPerson
