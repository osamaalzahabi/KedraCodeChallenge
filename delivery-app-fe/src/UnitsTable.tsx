import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function UnitsTable() {
  const [units, setUnits] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get(`http://localhost:3000/units`)
      .then(res => {
        setUnits(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [])

  return loading ? <CircularProgress /> : (
    <>
      <div className='units-table-header'>
        <div>
          <h1>Units</h1>
        </div>
        <div>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigate("/addUnit", { replace: true })}>
            Add Unit
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Location Address</TableCell>
              <TableCell align="right">Unit Capacity</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit: any) => (
              <TableRow
                key={unit.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {unit.id}
                </TableCell>
                <TableCell align="right">{unit.location?.address}</TableCell>
                <TableCell align="right">{unit.capacity}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => { }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
