import React, { useEffect, useState } from "react";
import { Form, Input, Button} from 'antd'
import { useMutation } from "@apollo/client";
import { UPDATE_CAR } from "../../queries";

const UpdateCar = props => {
    const [id] = useState(props.id)
    const [year,setYear] = useState(props.year)
    const [make,setMake] = useState(props.make)
    const [model,setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)

    const [updateCar] = useMutation(UPDATE_CAR)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect( () => {
        forceUpdate()
    },[])

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable,value)
        switch(variable){
            case 'year':
                setYear(value)
                break;
            case 'make':
                setMake(value)
                break;
            case 'model':
                setModel(value)
                break;
            case 'price':
                setPrice(value)
                break;
            case 'personId':
                setPersonId(value)
                break;
            default:
                break
        }
    }

    const onFinish = values => {
        const {year, make, model, price, personId} = values

        updateCar({
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
                updateCar:{
                    __typename: 'Car',
                    id,
                    year,
                    make,
                    model,
                    price,
                    personId
                }
            }
        })

        props.handleButtonClick()

    }

    return(
        <Form
        name="Car-update-form"
        form={form}
        layout="inline"
        onFinish={onFinish}
        size="middle"
        initialValues={{
            year:year,
            make:make,
            model:model,
            price:price,
            personId:personId
        }}
        >
            <Form.Item
            name='year'
            rules={[{required:true,message:"please input a year"}]}
            >
                <Input placeholder="i.e. 2021" onChange= { e => updateStateVariable('year',e.target.value)}/>
            </Form.Item>

            <Form.Item
            name='make'
            rules={[{required:true,message:"please input a make"}]}
            >
                <Input placeholder="i.e. Honda" onChange= { e => updateStateVariable('make',e.target.value)}/>
            </Form.Item>

            <Form.Item
            name='model'
            rules={[{required:true,message:"please input a model"}]}
            >
                <Input placeholder="i.e. civic" onChange= { e => updateStateVariable('model',e.target.value)}/>
            </Form.Item>

            <Form.Item
            name='price'
            rules={[{required:true,message:"please input a price"}]}
            >
                <Input placeholder="i.e. 60K" onChange= { e => updateStateVariable('price',e.target.value)}/>
            </Form.Item>

            <Form.Item
            name='personId'
            rules={[{required:true,message:"please input a existing user Id"}]}
            >
                <Input placeholder="i.e. Gates" onChange= { e => updateStateVariable('personId',e.target.value)}/>
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
                            (!form.isFieldTouched('year') && 
                            !form.isFieldTouched('make')) && 
                            !form.isFieldTouched('model') && 
                            !form.isFieldTouched('price') && 
                            !form.isFieldTouched('personId') || 
                            form.getFieldsError().filter(({errors}) => errors.length).length
                        }
                        >Update Details</Button>
                    )
                }
            </Form.Item>
        </Form>
    )
}

export default UpdateCar;