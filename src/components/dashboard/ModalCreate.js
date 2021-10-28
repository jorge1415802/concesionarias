import React from 'react'
import { Form, Input,Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { API } from '../../global/enviroment';


export const ModalCreate = ({ isModalOpen, closeModal }) => {
    const [form] = Form.useForm();

    const handleCancel = () => {
        closeModal();
    }

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };

      const createVehicle = async() => {
          const data = form.getFieldValue();
          console.log(data);
          await fetch(`${API}/vehicle/create`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
      }

      const onFinish = async() => {
        try {
            await form.validateFields();
            await createVehicle()
            closeModal();
        } catch (error) {
               
        }
        // console.log(form.getFieldValue());
      };



    return (
        <div>
            <Modal title='Create Vehicle' visible={isModalOpen} width={800} onOk={onFinish} onCancel={handleCancel} >
                <Form form={form} >
                    <Form.Item
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'The vehicle is required'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Name" name="vehicle" autoComplete="off" />
                    </Form.Item>
                    <Form.List
                        name="properties"
                        rules={[
                            {
                                validator: async (_, properties) => {
                                    if (!properties || properties.length < 1) {
                                        return Promise.reject(new Error('At least 1 property'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Preperties' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input properties's name or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="property name" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add property
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>


                </Form>
            </Modal>
        </div>
    )

}
