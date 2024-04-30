import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } 
from '@mui/material';
import { paperStyle, rowStyle, cellStyle} from '../materialui-styles/MUIStyles';
import '../App.css'

const Details = ({entity, colSpanList}) => {
    return (
        <TableContainer component={Paper} sx={{paperStyle}}>
            <Table>
                <TableBody>
                {
                    Object.keys(entity).map((key, index) => {
                        return (
                            <TableRow sx={rowStyle} key={index}>
                            {
                                colSpanList[index] === 1 ? (
                                    <>
                                        <TableCell sx={cellStyle} align='center'>{key}</TableCell>
                                        <TableCell sx={cellStyle} align='center'>{entity[key]}</TableCell>
                                    </>
                                 ) :
                                    <TableCell sx={cellStyle} align='center' colSpan={2}>{entity[key]}</TableCell>
                            }  
                            </TableRow>
                        )
                    })
                }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Details;