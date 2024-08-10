import React, { useMemo, useState, useEffect } from 'react'
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';



function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const ProductsBody = ({ rows, rowsPerPage, order, page, orderBy, dense, header }) => {

    const [emptyRows, setEmptyRows] = useState(0);
    const [visibleRows, setVisibleRows] = useState([]);


    useEffect(() => {
        // Avoid a layout jump when reaching the last page with empty rows.
        const newEmptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
        if (emptyRows !== newEmptyRows) {
            setEmptyRows(newEmptyRows);
        }
    }, [page, rowsPerPage, rows]);

    useEffect(() => {
        const newVisible = stableSort(rows, getComparator(order, orderBy)).slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage );
        setVisibleRows(newVisible);
    }, [rows, order, orderBy, page, rowsPerPage]);
    


    return (
        <TableBody>
            {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                        className={ row.sealed_quantity <= row.warning_quantity ? "showWarning":""}
                    >
                        {/* {rows()} */}
                        {header.map( (h,i) => {
                            if(i === 0) {
                                return <TableCell className={h.id} component="th" id={labelId} scope="row" padding="none"> {row[h.id]} </TableCell>
                            } else  return <TableCell className={h.id} align="right">{row[h.id]}</TableCell>
                        })}
                    </TableRow>
                );
            })}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                >
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    )
}

export default ProductsBody;