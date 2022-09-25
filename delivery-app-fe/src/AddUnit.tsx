import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LocationSelect from './LocationSelect'
import axios from 'axios';

export default function AddUnit() {
  const [unit, setUnit] = React.useState({});
  const navigate = useNavigate();
  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setUnit({
      ...unit,
      [event.target.name]: event.target.value,
    });
  };

  const handleLocationSelectChange = (selectedLoc: any) => {
    setUnit({
      ...unit,
      locationId: selectedLoc.id,
    });
  };

  const handleCreateClick = () => {
    axios.post(`http://localhost:3000/units`, { ...unit })
      .then(() => {
        alert("Added unit successfully!");
      })
      .catch((error) => {
        alert("Adding unit failed!");
        console.error('There was an error!', error);
    });
  };

  return (
    <div className='add-unit-form'>
      <h1>Add Unit</h1>
      <TextField fullWidth margin={'normal'} label="Unit Name" variant="outlined" name="name" onChange={handleChange} />
      <TextField fullWidth margin={'normal'} label="Mac Address" variant="outlined" name="macAddress" onChange={handleChange} />
      <LocationSelect getSelectedLoc={handleLocationSelectChange} />
      <TextField fullWidth margin={'normal'} label="Compartment Capacity" variant="outlined" name="capacity" type="number" onChange={handleChange} />
      <Button fullWidth variant="contained" endIcon={<AddIcon />} onClick={() => navigate("/addUnit", { replace: true })}>
        Add Compartment
      </Button>
      <div className='add-unit-buttons'>
        <Button variant="outlined" onClick={() => navigate("/", { replace: true })}>Cancel</Button>
        <Button variant="contained" onClick={handleCreateClick}>Create Unit</Button>
      </div>
    </div>
  );
}
