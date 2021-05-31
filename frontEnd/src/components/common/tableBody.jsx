import React, { useState } from 'react';

const TableBody = ({ data, onDelete, onUpdate }) => {
    const [showPopup, setShowPopup] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null);

    return (
        <>
            <div className={showPopup ? 'confirmDelete shown' : 'confirmDelete'}>
                <div>
                    <p>{`Are you sure you want to permanently delete ${itemToDelete ? itemToDelete.name : ''}?`}</p>
                    <span>
                        <button onClick={() => {
                            onDelete(itemToDelete);
                            setItemToDelete(null);
                            setShowPopup(false);
                        }}>Yes</button>
                        <button onClick={() => setShowPopup(false)}>No</button>
                    </span>
                </div>
            </div>
            <tbody>
                {data.map(item => {
                    return (
                        <tr key={item._id}>
                            <td onClick={() => { onUpdate(item) }}><p className="updateLink" title="Click to update item">{item.name}</p></td>
                            {item.classesCoached && <td>{item.classesCoached.map(x => {
                                return (<p key={x}>{x}</p>)
                            })}</td>}
                            {item.details && <td>{item.details.map(x => {
                                return (<p key={x}>{x}</p>)
                            })}</td>}
                            {item.order && <td>{item.order}</td>}
                            {item.image && <td><img className="thumbnailImg" src={`../../images/${item.image}`} alt={'picture of ' + item.name} /></td>}
                            <td>
                                <button onClick={() => {
                                    setItemToDelete(item);
                                    setShowPopup(true)
                                }}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </>
    );
}

export default TableBody;