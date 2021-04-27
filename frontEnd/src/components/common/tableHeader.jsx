import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp as sortUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown as sortDown } from "@fortawesome/free-solid-svg-icons";

const TableHeader = ({ columns, sortColumn, onSort }) => {

    let raiseSort = (path) => {
        const sortColumnLocal = sortColumn;
        if (path === sortColumn.path) {
            sortColumn.order === "asc" ?
                sortColumnLocal.order = "desc" : sortColumnLocal.order = "asc";
        } else {
            sortColumnLocal.order = "asc";
            sortColumnLocal.path = path;
        }
        onSort(sortColumnLocal);
    }

    const renderSortIcon = (column) => {
        if (column.path !== sortColumn.path) return null;
        return <FontAwesomeIcon icon={sortColumn.order === "asc" ? sortUp : sortDown} />;
    };

    return (
        <thead>
            <tr>
                {columns.map(column => {
                    return (<th className="icon" title="Click to sort data. Click again to reverse order." key={column.path || column.key} onClick={() => raiseSort(column.path)}>{column.label} {renderSortIcon(column)}</th>)
                })}
            </tr>
        </thead>
    );
}

export default TableHeader;