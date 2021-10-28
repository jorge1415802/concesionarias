import { Table, Button } from 'antd';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { API } from '../../global/enviroment'
import { ColumnsTable } from './ColumnsTable';
import { ModalCreateCategory } from './ModalCreateCategory';
import { ModalEditCategory } from './ModalEditCategory';
import { DeleteOutlined,EditOutlined,PlusOutlined } from '@ant-design/icons'


export const CategoryTable = () => {

    const [state, setState] = useState({
        selected : false,
        row : {},
        isModalEditOpen : false,
        isModalCreateOpen : false
    })

    const {selected, row, isModalEditOpen, isModalCreateOpen} = state;

    const categories = async() => {
        try {
            const result = await fetch(`${API}/category`);
            return result.json();    
        } catch (error) {
            return error.json();
        }
    }
    
    let categoriesQuery = [];

    categoriesQuery = useQuery('CATEGORIES',categories);

    let dataSource = [];

    categoriesQuery.data?.category.map((category) => {
        const data = {
            ...category,
            key : category.id
        };
        return dataSource.push(data);
    })

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
        categoriesQuery.refetch();
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
        categoriesQuery.refetch();
    }



    const handleModalEdit = isModalEditOpen ? <ModalEditCategory isModalOpen={isModalEditOpen} row={row} closeModal={closeModal} /> : <div></div>
    const handleModalCreate = isModalCreateOpen ? <ModalCreateCategory  isModalOpen={isModalCreateOpen} closeModal={closeModalCreate} /> : <div></div>

    const deleteCategory = async() => {
        try {
            if(selected) {
                await fetch(`${API}/category/delete/${row.id}`,{
                    method : 'DELETE',
                })
                categoriesQuery.refetch();
            }
        } catch (error) {
            console.log(error)
        }
        
    }


    return (
        <div>
            <h1 className="text-center" >Cateogries</h1>
            <div className="p-3"><Button type='primary' shape='circle' icon={<PlusOutlined />} onClick={openModalCreate}  /> <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={openModal}  /> <Button type='primary' danger shape='circle' icon={<DeleteOutlined />} onClick={deleteCategory} /> </div>
            {handleModalCreate}
            {handleModalEdit}
            <Table 
                rowSelection={{
                    type: 'radio',
                    ...rowSelection
                }}
                dataSource={dataSource}
                columns={ColumnsTable}
            />
        </div>
    )
}
