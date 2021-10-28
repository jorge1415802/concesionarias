import React, { useState } from 'react'
import { Table, Button } from 'antd'
import { useQuery } from 'react-query'
import { API } from '../../global/enviroment'
import { columns } from './ColumnsTable'
import { DeleteOutlined,EditOutlined,PlusOutlined } from '@ant-design/icons'
import { ModalEdit } from './ModalEdit'
import { ModalCreate } from './ModalCreate'



export const Dashboard = () => {
    
    const [state, setState] = useState({
        isModalOpen : false,
        selected : false,
        isModalCreateOpen : false,
        row : {},
    })

    const {isModalOpen, selected,row, isModalCreateOpen} = state;
    const vehicles = async() => {
        try {
           const result = await fetch(`${API}/vehicle`);
           return result.json();
        } catch (error) {
            return error.json();
        }
    }

    let queryVehicles = []
    queryVehicles = useQuery('VEHICLES',vehicles);

    let dataSource = [];
    queryVehicles.data?.vehicle.map((vehicle) => {
        const data = {
            ...vehicle,
            key : vehicle.id
        };
        return dataSource.push(data);
    })

    const openModal = () => {
        if(selected) {
            setState({
                ...state,
                isModalOpen : true
            })
        }
    }

    const openModalCreate = () => {
        setState({
            ...state,
            isModalCreateOpen : true
        })
    }

    const closeModal = () => {
        setState({
            ...state,
            isModalOpen : false
        });
        queryVehicles.refetch();
    }

    const closeModalCreate = () => {
        setState({
            ...state,
            isModalCreateOpen : false
        });
        queryVehicles.refetch();
    }

    const handleModal = isModalOpen ?  <ModalEdit isModalOpen={isModalOpen} row={row} closeModal={closeModal} ></ModalEdit> : <div></div>

    const handleModalCreate = isModalCreateOpen ? <ModalCreate isModalOpen={isModalCreateOpen} closeModal={closeModalCreate} ></ModalCreate> : <div></div>

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

    const deleteVehicle = async() => {
        try {
            if(selected) {
                await fetch(`${API}/vehicle/${row.id}`,{
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                });
                queryVehicles.refetch();    
            }
        } catch (error) {
            console.log(error)
        }
        

    }

    return (
        <div>
            <h1 className="text-center">Vehicles</h1>
            <div className="p-3"><Button type='primary' shape='circle' icon={<PlusOutlined />} onClick={openModalCreate}  /> <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={openModal}  /> <Button type='primary' danger shape='circle' icon={<DeleteOutlined />} onClick={deleteVehicle} /> </div>
            <br />
            {handleModal}
            {handleModalCreate}
            <Table 
                rowSelection={{
                    type: 'radio',
                    ...rowSelection
                }}
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    )
}
