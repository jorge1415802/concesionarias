import React, { useEffect } from 'react'
import { Modal, Select } from 'antd'
import { Form, Input} from 'antd'
import { API } from '../../global/enviroment';
import { useQuery } from 'react-query';

export const ModalEditVehicleProperty = ({isModalOpen,closeModal,row}) => {

    const [form] = Form.useForm();
    const { Option } = Select;
    let categoiesQuery = [];
    const children = [];
    const { name, category } = row;

    useEffect(() => {
        form.setFieldsValue({
            name :name,
            category : category
        })
    }, [])

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

    const update = async() => {
        try {
            const data = await form.validateFields();
            const update =  await fetch(`${API}/property/update/${row.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            })

            const result = await update.json();
            console.log(result);
        } catch (error) {
            return error;
        }
        
    }


    const onFinish = async() => {
        try {
            await form.validateFields();
            await update();
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
            <Modal title='Edit Vehicle Property' visible={isModalOpen} width={800} onOk={onFinish} onCancel={handleCancel} >
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
