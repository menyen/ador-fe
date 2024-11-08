import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';

import { TableProps } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: '75vh',
    },
    tableHeadCell: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    tableHeadCheckbox: {
      color: theme.palette.common.white,
    },
    hideColumnForSmallScreen: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    cellRoot: {
      padding: '6px 10px'
    }
  })
);

export default function GenericTable(props: TableProps) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState<number[]>([]);

  const { columns, rows, shouldHideCheckboxes = false } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                padding="checkbox"
                className={clsx(classes.tableHeadCell, classes.hideColumnForSmallScreen)}
                classes={{root: classes.cellRoot}}
              >
                {!shouldHideCheckboxes && (
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                    color="default"
                    classes={{ root: classes.tableHeadCheckbox }}
                  />
                )}
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                  className={clsx(classes.tableHeadCell, {
                    [classes.hideColumnForSmallScreen]: column.hideForSmallScreen
                  })}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    onClick={(event) =>
                      !shouldHideCheckboxes && handleClick(event, row.id)
                    }
                  >
                    <TableCell
                      padding="checkbox"
                      className={classes.hideColumnForSmallScreen}
                      classes={{root: classes.cellRoot}}
                    >
                      {!shouldHideCheckboxes && (
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      )}
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align="left"
                          className={clsx({
                            [classes.hideColumnForSmallScreen]: column.hideForSmallScreen,
                          })}
                          classes={{root: classes.cellRoot}}
                        >
                          {column.format
                            ? column.format(value)
                            : value
                          }
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
        labelRowsPerPage={<>Linhas por página</>}
      />
    </Paper>
  );
}
