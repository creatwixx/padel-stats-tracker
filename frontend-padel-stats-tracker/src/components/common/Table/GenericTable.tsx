import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import * as React from 'react';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: keyof T;
  getValue?: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowKey?: (row: T, index: number) => React.Key;
}

export function GenericTable<T>({ columns, data, getRowKey }: GenericTableProps<T>) {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'grey.900' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align ?? 'left'}
                sx={{ color: 'grey.400', fontWeight: 600 }}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={getRowKey?.(row, i) ?? i}>
              {columns.map((col) => {
                let content: React.ReactNode = '—';
                if (col.getValue) {
                  content = col.getValue(row);
                } else if (col.accessor) {
                  // Safe: col.accessor is checked above and is keyof T
                  content = row[col.accessor as keyof T] ?? '—';
                }
                return (
                  <TableCell key={col.key} align={col.align ?? 'left'} sx={{ color: 'grey.100' }}>
                    {content}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body2" color="text.secondary">
                  No records found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
