import {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem,
    Select,
    TextField
} from "@mui/material";


const BusinessEditDialog = ({ open, onClose, businessDetails, onUpdateBusiness }) => {
    const [editedBusiness, setEditedBusiness] = useState(businessDetails);
    const [citiesOptions, setCitiesOptions] = useState([businessDetails.city]);
    const [businessTypesOptions, setBusinessTypesOptions] = useState([businessDetails.businessType]);

    useEffect(() => {
        fetch("http://localhost:8080/api/cities")
            .then(response => response.json())
            .then(data => {
                setCitiesOptions(data);
                // Aktualizuj miasto, jeśli domyślna wartość nie jest już odpowiednia
                if (!data.includes(editedBusiness.city)) {
                    setEditedBusiness({ ...editedBusiness, city: data[0] });
                }
            });

        fetch("http://localhost:8080/api/businessTypes")
            .then(response => response.json())
            .then(data => {
                setBusinessTypesOptions(data);
                // Aktualizuj typ biznesu, jeśli domyślna wartość nie jest już odpowiednia
                if (!data.includes(editedBusiness.businessType)) {
                    setEditedBusiness({ ...editedBusiness, businessType: data[0] });
                }
            });
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBusiness({ ...editedBusiness, [name]: value });
    }

    const handleSubmit = () => {
        onUpdateBusiness(editedBusiness);
    }

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edytuj dane biznesu</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="businessName"
                    label="Nazwa biznesu"
                    type="text"
                    fullWidth
                    value={editedBusiness.businessName}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Miasto</InputLabel>
                    <Select
                        name="city"
                        value={editedBusiness.city}
                        onChange={handleChange}
                        label="Miasto"
                    >
                        {citiesOptions.map((city, index) => (
                            <MenuItem key={index} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    name="address"
                    label="Adres"
                    type="text"
                    fullWidth
                    value={editedBusiness.address}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Opis"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={editedBusiness.description}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Typ biznesu</InputLabel>
                    <Select
                        name="businessType"
                        value={editedBusiness.businessType}
                        onChange={handleChange}
                        label="Typ biznesu"
                    >
                        {businessTypesOptions.map((type, index) => (
                            <MenuItem key={index} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Anuluj
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Zapisz
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BusinessEditDialog;