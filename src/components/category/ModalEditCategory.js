import React, { useEffect }from 'react'
import { Modal } from 'antd'
import { Form, Input} from 'antd'
import { API } from '../../global/enviroment';


export const ModalEditCategory = ({isModalOpen, closeModal, row}) => {
    const [form] = Form.useForm();
    const { name, icon } = row;
    
    useEffect(() => {
        form.setFieldsValue({
            name :name,
            icon : icon
        })
    }, [])

    const updateCategory = async() => {
        try {
            const data = form.getFieldValue();
            const result = await fetch(`${API}/category/update/${row.id}`,{
                method : 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            });
            const update = await result.json();
            console.log(update)    
        } catch (error) {
            return error;    
        }
        

    }

    const onFinish = async() => {
        try {
            await form.validateFields();
            await updateCategory();
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
