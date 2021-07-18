import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

interface Column {
  id: 'name' | 'email' | 'cpf' | 'lastQnaireDate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'email', label: 'E-mail', minWidth: 100 },
  {
    id: 'cpf',
    label: 'CPF',
    minWidth: 170,
    align: 'right',
    format: (value: number) =>
      value.
      toString().
      padStart(11, '0').
      replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
        (regex, arg1, arg2, arg3, arg4) => arg1 + '.' + arg2 + '.' + arg3 + '-' + arg4)
  },
  {
    id: 'lastQnaireDate',
    label: 'Data do último questionário',
    minWidth: 170,
    align: 'right',
    format: (value: number) => {
      const dateFormat = new Date(value);
      return ((dateFormat.getDate() )) + "/" + ((dateFormat.getMonth() + 1)) + "/" + dateFormat.getFullYear();
    },
  },
];

interface Data {
  name: string;
  email: string;
  cpf: number;
  lastQnaireDate: number;
  
}

function createData(name: string, email: string, cpf: number, lastQnaireDate: number): Data {
  return { name, email, cpf, lastQnaireDate };
}

const rows = [
  createData('André Silva', 'aaa@ddd.com', 1324171354, 1580266800000),
  createData('José da Cunha', 'aaa@ddd.com', 1403500365, 1580256000000),
  createData('Bruno', 'aaa@ddd.com', 60483973, 1580266800000),
  createData('Alice in Chains', 'aaa@ddd.com', 327167434, 1580256000000),
  createData('Eduardo Cabral', 'aaa@ddd.com', 37602103, 1580256000000),
  createData('Victor Camejo', 'aaa@ddd.com', 25475400, 1580266800000),
  createData('Josefina', 'aaa@ddd.com', 83019200, 1580266800000),
  createData('Luana Amaral', 'aaa@ddd.com', 4857000, 1580266800000),
  createData('Simone Souza', 'aaa@ddd.com', 126577691, 1580256000000),
  createData('Bia Novaes', 'aaa@ddd.com', 126317000, 1580266800000),
  createData('João Camilo', 'aaa@ddd.com', 67022000, 1580266800000),
  createData('Julia Hitaki', 'aaa@ddd.com', 67545757, 1580266800000),
  createData('Claudia Paes', 'aaa@ddd.com', 146793744, 1580256000000),
  createData('Tulio Pazos', 'aaa@ddd.com', 200962417, 1580256000000),
  createData('Saulo Silva', 'aaa@ddd.com', 210147125, 1580266800000),
];

const useStyles = makeStyles({
  root: {
    marginTop: '64px',
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState<number[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.cpf);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, cpf: number) => {
    const selectedIndex = selected.indexOf(cpf);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, cpf);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (cpf: number) => selected.indexOf(cpf) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const isItemSelected = isSelected(row.cpf);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.cpf}
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                  onClick={(event) => handleClick(event, row.cpf)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
