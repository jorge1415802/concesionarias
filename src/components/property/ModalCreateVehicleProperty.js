import React from 'react'
import { Modal, Select } from 'antd'
import { Form, Input} from 'antd'
import { API } from '../../global/enviroment';
import { useQuery } from 'react-query';


export const ModalCreateVehicleProperty = ({isModalOpen, closeModal}) => {

    const [form] = Form.useForm();
    const { Option } = Select;
    let categoiesQuery = [];
    const children = [];
    
    
    const categories = async() => {
        try {
            const result = await fetch(`${API}/category`);
            return result.json();    
        } catch (error) {
            return error.json();
        }
        
    }
    
    categoiesQuery = useQuery('CATEGORIES',categories);
    
    categoiesQuery.data?.category.map((category) => {
        return children.push(<Option key={category.id} value={category.name}>{category.name}</Option>)
    })

    const create = async() => {
        try {
            const data = form.getFieldValue();
            await fetch(`${API}/property/create`,{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            })
        } catch (error) {
            return error;
        }
    }

    const onFinish = async() => {
        try {
            await form.validateFields();
            await create();
            closeModal();
        } catch (error) {
            return error;
        }
    }

    const handleCancel = () => {
        closeModal();
    }

    const handleChange = (value) => {
        console.log(value)
    }

    return (
        <div>
            <Modal title='Create Vehicle Property' visible={isModalOpen} width={800} onOk={onFinish} onCancel={handleCancel} >
                <Form form={form}>
                    <Form.Item
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'The Name is required'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Name" name="name" autoComplete="off" />
                    </Form.Item>
                    <Form.Item
                        name='category'
                    >
                        <Select 
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Select Category"
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
