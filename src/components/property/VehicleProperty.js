import { Table, Button, Alert } from 'antd';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { API } from '../../global/enviroment';
import { columnVehicleProperty } from './ColumnVehicleProperty';
import { ModalCreateVehicleProperty } from './ModalCreateVehicleProperty';
import { ModalEditVehicleProperty } from './ModalEditVehicleProperty';
import { DeleteOutlined,EditOutlined,PlusOutlined } from '@ant-design/icons'


export const VehicleProperty = () => {

    const [state, setState] = useState({
        selected : false,
        row : {},
        isModalEditOpen : false,
        isModalCreateOpen : false
    })

    const {selected, row, isModalEditOpen, isModalCreateOpen} = state;

    const vehicleProperties = async() => {
        try {
            const result = await fetch(`${API}/property`);
            return result.json();
        } catch (error) {
            return error.json();
        }
    }

    let propertiesQuery = [];
    let dataSource = [];

    propertiesQuery = useQuery('PROPERTIES',vehicleProperties);

    if(propertiesQuery.isError) {
        return <Alert message="Error cargando properties" type="error"/>
    }

    console.log(propertiesQuery)
        propertiesQuery.data?.property.map((item) => {
            const data = {
                ...item,
                key : item.id
            }
            return dataSource.push(data);
        });

    

    const openModal = () => {
        if(selected) {
            setState({
                ...state,
                isModalEditOpen : true
            })
        }
    }

    const closeModal = () => {
        setState({
            ...state,
            isModalEditOpen : false
        });
        propertiesQuery.refetch();
    }

    const openModalCreate = () => {
        setState({
            ...state,
            isModalCreateOpen : true
        })
    }

    

    const closeModalCreate = () => {
        setState({
            ...state,
            isModalCreateOpen : false
        });
        propertiesQuery.refetch();
    }

    const handleModalCreate = isModalCreateOpen ? <ModalCreateVehicleProperty isModalOpen={isModalCreateOpen} closeModal={closeModalCreate} /> : <div></div>
    const handleModalEdit = isModalEditOpen ? <ModalEditVehicleProperty  isModalOpen={isModalEditOpen} row={row} closeModal={closeModal} /> : <div></div>

    

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setState({
                ...state,
                selected : true,
                row : selectedRows[0]
            })
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };

    const deleteProperty = async() => {
        try {
            if(selected) {
                await fetch(`${API}/property/delete/${row.id}`,{
                    method: 'DELETE'
                })
                propertiesQuery.refetch();
            }
            
        } catch (error) {
            return error;
        }
    }

    return (
        <div>
            <h1 className="text-center">Vehicle Properties</h1>
            {handleModalCreate}
            {handleModalEdit}
            <div className="p-3"><Button type='primary' shape='circle' icon={<PlusOutlined />} onClick={openModalCreate}  /> <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={openModal}  /> <Button type='primary' danger shape='circle' icon={<DeleteOutlined />} onClick={deleteProperty} /> </div>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection
                }}
                dataSource={dataSource}
                columns={columnVehicleProperty} 
            />
        </div>
    )
}
