import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Box,
    CircularProgress,
    Chip,
} from "@mui/material";

interface TableColumn {
    id: string;
    label: string;
    align?: "left" | "center" | "right";
    minWidth?: number;
}

interface TableData {
    [key: string]: any;
}

interface CustomTableProps {
    columns: TableColumn[];
    data: TableData[];
    loading: boolean;
    totalCount: number;
    page: number;
    limit: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newLimit: number) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
    columns,
    data,
    loading,
    totalCount,
    page,
    limit,
    onPageChange,
    onRowsPerPageChange,
}) => {
    return (
        <Paper sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 400, maxWidth: 960, overflowX: "auto", display: "block" }}>
                <Table stickyHeader>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align || "left"} style={{ minWidth: column.minWidth }}>
                                    <b>{column.label}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <CircularProgress />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, index) => (
                                <TableRow key={index} hover>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align || "left"}>
                                            {column.id.includes("image") ? (
                                                row[column.id] ? (
                                                    <img
                                                        src={row[column.id]}
                                                        alt={column.label}
                                                        style={{ width: 100, height: "auto", borderRadius: 8 }}
                                                    />
                                                ) : (
                                                    <Chip label="Belum Ada" color="error" variant="outlined" />
                                                )
                                            ) : typeof row[column.id] === "boolean" ? (
                                                <Chip
                                                    label={row[column.id] ? "Selesai" : "Belum"}
                                                    color={row[column.id] ? "success" : "error"}
                                                    variant="outlined"
                                                />
                                            ) : (
                                                row[column.id] || "N/A"
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                component="div"
                count={totalCount}
                rowsPerPage={limit}
                page={page}
                onPageChange={(_, newPage) => onPageChange(newPage)}
                onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
            />
        </Paper>
    );
};

export default CustomTable;
