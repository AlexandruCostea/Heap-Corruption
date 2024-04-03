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
import { onDeleteClick } from '../services/PostService';
import { PostsContext } from '../App';
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


const PostTable = () => {
  const { postList, setPostList} = useContext(PostsContext);
  postList.sort((a, b) => (a.title < b.title) ? 1 : -1);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleUpdateClick = (post) => {
    navigate(`/update/post/${post.id}`);
  }

  const handlePostClick = (post) => {
      navigate(`/details/post/${post.id}`);
  }

  const handleDeleteClick = (postList, setPostList, post) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (userConfirmed) {
      axios.delete(`http://localhost:3000/posts/${post.id}`)
        .then(() => onDeleteClick(postList, setPostList, post))
        .catch(err => console.log(err));
      onDeleteClick(postList, setPostList, post);
      setPage(0);
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - postList.length) : 0;

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
            ? postList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : postList
          ).map((post) => (
            <TableRow className='tableRow' sx={rowStyle} key={post.id}>
                            <TableCell align='center'>
                                <Button sx={postCellStyle} onClick={() => handlePostClick(post)}>{post.title}</Button>
                            </TableCell>
                            <TableCell sx={cellStyle} align='center'>
                                <Button sx={deleteButtonStyle} onClick={
                                    () => handleDeleteClick(postList, setPostList, post)}>Delete</Button>
                            </TableCell>
                            <TableCell sx={cellStyle} align='center'>
                                <Button sx={updateButtonStyle} onClick={() => handleUpdateClick(post)}>Update</Button>
                            </TableCell>
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
              count={postList.length}
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

export default PostTable;