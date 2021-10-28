import { ItemCard } from "./ItemCard";
export const columns = [
    {
        title : 'Name',
        dataIndex : 'name',
        key : 'name'
    },
    {
        title : 'Properties',
        dataIndex : 'properties',
        key : 'properties',
        render : (properties) => <div>{properties.map(property =>(
            <ItemCard key={property} item={property} />
        ))}</div>
    },

]
