import { getAllEquipments } from '@/lib/api/equipment';
import React from 'react';

const AllEquipmentPage = async() => {
    const equipments = await getAllEquipments();
    
    return (
        <div>
            All Equipments is : {equipments.length}
        </div>
    );
};

export default AllEquipmentPage;