// AioMain.jsx
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const AioMain = () => {
    const signOutGoogle = async () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('success signOut');
        }).catch((err) => alert(err.message));
    }
    const [categoryNum, setCategoryNum] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        console.log('useEffect is called');
        axios.get(`${baseURL}/category/`).then((response) => {
            console.log(response);
            setCategoryNum(response.data.number);
            setCategories(response.data.categories);
        });
    }, [])

    return (
        <div>
            <Button onClick={signOutGoogle} name="sign-out">
                Sign Out
            </Button>
            <div>
                <Box sx={{ width: '80%', maxWidth: 540, marginX: 2, bgcolor: 'background.paper' }}>
                    <h4>Number of Categories: {categoryNum}</h4>
                    <List>
                        {categories.map((category, index) => {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={category} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </div>
        </div>
    );
};

export default AioMain;