import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } 
from '@mui/material';
import { paperStyle, rowStyle, cellStyle} from '../materialui-styles/MUIStyles';
import '../App.css'

const Post = ({post}) => {
    return (
        <TableContainer component={Paper} sx={{paperStyle}}>
            <Table>
                <TableBody>
                    <TableRow sx={rowStyle}>
                        <TableCell sx={cellStyle} align='center' colSpan={2}>{post.title}</TableCell> 
                    </TableRow>
                    <TableRow sx={rowStyle}>
                        <TableCell sx={cellStyle} align='center'>User:</TableCell>
                        <TableCell sx={cellStyle} align='center'>{post.username}</TableCell>
                    </TableRow>
                    <TableRow sx={rowStyle}>
                        <TableCell sx={cellStyle} align='center'>Date posted:</TableCell>
                        <TableCell sx={cellStyle} align='center'>{post.date}</TableCell>
                    </TableRow>
                    <TableRow sx={rowStyle}>
                        <TableCell sx={cellStyle} align='center' colSpan={2}>Issue:</TableCell>
                    </TableRow>
                    <TableRow sx={rowStyle}>
                        <TableCell sx={cellStyle} align='center' colSpan={2}>{post.description}</TableCell>
                    </TableRow>
                    <TableRow sx={rowStyle}>
                    <TableCell sx={cellStyle} align='center'>Upvotes:</TableCell>
                        <TableCell sx={cellStyle} align='center'>{post.upvotes}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default Post;