import React, { useEffect, useState } from 'react'
import {Form, Input,Button} from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_CAR, GET_CAR } from '../../queries'
import { v4 as uuidv4} from 'uuid'


const AddCar = () => {
    const [id] = useState(uuidv4())
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [addCar] = useMutation(ADD_CAR)

    useEffect(() =>{
        forceUpdate({})
    },[])

    const onFinish = values => {
        const {year, make, model, price, personId} = values

        addCar({
            variables:{
                id, 
                year,
                make,
                model,
                price,
                personId
            },
            optimisticResponse:{
                __typename: 'Mutation',
                addCar:{
                    __typename: 'Car',
                    id, 
                    year,
                    make,
                    model,
                    price,
                    personId
                }
            },
            update:(proxy, {data : {addCar}}) => {
                console.log(addCar)

                const data = proxy.readQuery({query : GET_CAR})
                console.log(data)
                proxy.writeQuery({
                    query: GET_CAR, 
                    data : {
                    ...data, car : [...data.car,addCar]
                }})
            }
        })
    }

    return(
        <Form
        name="Add car form"
        layout="inline"
        size="large"
        onFinish = {onFinish}
        style={{marginBottom:'40px'}}
        form={form}
        >
            <Form.Item name="year" rules = {[{required:true, message:"please enter manufacturing year"}]}>
                <Input placeholder="i.e. 2021"/>
            </Form.Item>

            <Form.Item name="make" rules={[{required:true, message:"please enter manufacturer"}]}>
                <Input placeholder="i.e. Toyota"/>
            </Form.Item>

            <Form.Item name="model" rules={[{required:true, message:"please enter model"}]}>
                <Input placeholder="i.e. camry"/>
            </Form.Item>

            <Form.Item name = "price" rules={[{required:true, message: "please enter the price"}]}>
                <Input placeholder="i.e. 60K"/>
            </Form.Item>

            <Form.Item name = "personId" rules={[{required:true, message: "please enter the owner Id"}]}>
                <Input placeholder="i.e. a number.."/>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {
                    () => (
                        <Button htmlType="submit"
                                type="primary"
                                disabled ={!form.isFieldsTouched(true) || form.getFieldsError().filter(({errors}) => errors.length).length}
                        >
                            Add Car
                        </Button>
                    )
                }
            </Form.Item>

        </Form>
    )
}

export default AddCar;