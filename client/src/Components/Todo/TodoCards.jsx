import React from 'react'
import { RiChatDeleteFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

export const TodoCards = ({title,body,id,deleteItem,showUpdate,ind}) => {

    return (
    <div className='p-3 todo-cards'>
       <div>
       <h5>{title}</h5>
        <p className='para'>{body.split("",100)}...</p>
       </div>
       <div className='icons-div d-flex justify-content-between '>
            <div className='d-flex justify-content-between align-items-center icons upd' onClick={()=>showUpdate(id,ind)} >
                Update <FaEdit/>
            </div>
            <div className='d-flex justify-content-between align-items-center icons del' onClick={()=>deleteItem(id,ind)}>
                Delete <RiChatDeleteFill/>
            </div>
       </div>
    </div>
  )
}
