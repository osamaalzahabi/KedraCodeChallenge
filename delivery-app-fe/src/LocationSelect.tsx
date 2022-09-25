import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';

export default function LocationSelect(props: { getSelectedLoc: any; }) {
    const { getSelectedLoc } = props;
    const [locations, setLocations] = React.useState([]);
    const [selectedLoc, setSelectedLoc] = React.useState({
        id: 0,
        address: ""
    });
    const handleChange = (event: { target: { value: any; }; }) => {
        const address = event.target.value;
        const id = _.find(locations, (l: any) => { return l.address === address; })?.id;
        setSelectedLoc({ id, address });
        getSelectedLoc({ id, address });
    };

    React.useEffect(() => {
        axios.get(`http://localhost:3000/locations`)
            .then(res => {
                setLocations(res.data)
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, [])

    return (
        <FormControl fullWidth>
            <InputLabel id="loc-label">Location Address</InputLabel>
            <Select
                labelId="loc-label"
                value={selectedLoc.address}
                label="Location Address"
                onChange={handleChange}
            >
                {locations.map((loc) => {
                    const { id, address } = loc;
                    return (
                        <MenuItem key={id} value={address}>
                            {address}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
