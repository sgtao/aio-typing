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
    const [selectCategory, setSelectCategory] = useState(0)
    useEffect(() => {
        console.log('useEffect is called');
        axios.get(`${baseURL}/category/`).then((response) => {
            console.log(response);
            setCategoryNum(response.data.number);
            setCategories(response.data.categories);
            setSelectCategory(0);
        });
    }, [])
    const handleClick = async (index) => {
        console.log(index);
        console.log();
        await setSelectCategory(index);
    };

    return (
        <div>
            <Button onClick={signOutGoogle} name="sign-out">
                Sign Out
            </Button>
            <Box sx={{ width: '90%', maxWidth: 640, marginX: 4, bgcolor: 'background.paper' }}>
                {(selectCategory === 0) ?
                    <>
                        <h4>Number of Categories: {categoryNum}</h4>
                        <List>
                            {categories.map((category, index) => {
                                return (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={() => handleClick(index+1)}>
                                            <ListItemText primary={category} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </>
                :
                    <>
                        <ListItemButton onClick={() => handleClick(0)}>
                            <ListItemText primary="to Category Menu" />
                        </ListItemButton>
                    </>
                }
            </Box>

        </div>
    );
};

export default AioMain;