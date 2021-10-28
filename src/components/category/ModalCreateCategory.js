import { Modal } from 'antd'
import { Form, Input} from 'antd'
import React from 'react'
import { API } from '../../global/enviroment';

export const ModalCreateCategory = ({ isModalOpen, closeModal }) => {
    const [form] = Form.useForm();

    const createCategory = async() => {
        try {
            const data = form.getFieldValue();
            await fetch(`${API}/category/create`,{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            });    
        } catch (error) {
            return error;    
        }
        

    }

    const onFinish = async() => {
        try {
            await form.validateFields();
            await createCategory();
            closeModal();
        } catch (error) {
            return error;
        }
        
    }

    const handleCancel = () => {
        closeModal();
    } 


    return (
        <div>
            <Modal title='Create Category' visible={isModalOpen} width={800} onOk={onFinish} onCancel={handleCancel} >
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
                        name='icon'
                        rules={[
                            {
                                required: true,
                                message: 'The Icon is required'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Icon" name="icon" autoComplete="off" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
