import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { paperStyle, rowStyle, postCellStyle, cellStyle, deleteButtonStyle, updateButtonStyle } from '../materialui-styles/MUIStyles';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { deleteEntity } from '../services/EntityService';
import { AppContext } from '../App';
import axios from 'axios';

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const EntityTable = ({entityList, setEntityList, config, checkFunction}) => {
  
  const {token, setToken} = useContext(AppContext);
  entityList.sort((a, b) => (a[config.displayField] < b[config.displayField]) ? 1 : -1);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleUpdateClick = (entity) => {
    const expirationDate = new Date(token.expirationDate);
    const currentDate = new Date();
    if (expirationDate > currentDate) {
      navigate(config.updatePath + entity.id);
    }
    else {
      setToken(null);
      alert('Login expired');
    }
  }

  const handleDetailsClick = (entity) => {
      navigate(config.detailsPath + entity.id);
  }

  const handleDeleteClick = (entityList, setEntityList, entity) => {
    const expirationDate = new Date(token.expirationDate);
    const currentDate = new Date();
    if (expirationDate > currentDate) {
      const userConfirmed = window.confirm(config.deleteConfirmationMessage);
      if (userConfirmed) {
        axios.delete(config.deletePath + entity.id)
          .then(() => deleteEntity(entityList, setEntityList, entity))
          .catch(err => alert(err));
        setPage(0);
      }
    }
    else {
      setToken(null);
      alert('Login expired');
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - entityList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{paperStyle}}>
      <Table>
        <TableBody>
            {
          (rowsPerPage > 0
            ? entityList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : entityList
          ).map((entity) => (
            <TableRow className='tableRow' sx={rowStyle} key={entity.id}>
                            {
                            token && checkFunction(entity, token) ? (
                            <>
                              <TableCell align='center'>
                                <Button sx={postCellStyle} onClick={() => handleDetailsClick(entity)}>{entity[config.displayField]}</Button>
                              </TableCell>
                              <TableCell sx={cellStyle} align='center'>
                                  <Button sx={deleteButtonStyle} onClick={
                                      () => handleDeleteClick(entityList, setEntityList, entity)}>Delete</Button>
                              </TableCell>
                              <TableCell sx={cellStyle} align='center'>
                                  <Button sx={updateButtonStyle} onClick={() => handleUpdateClick(entity)}>Update</Button>
                              </TableCell> 
                            </>
                            ) : (
                              <TableCell align='center' colSpan={3}>
                              <Button sx={postCellStyle} onClick={() => handleDetailsClick(entity)}>{entity[config.displayField]}</Button>
                            </TableCell>
                            )
                            }
                        </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell sx={cellStyle} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={entityList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default EntityTable;