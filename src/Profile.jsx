import React, { useState,useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { MdOutlineContentCopy, MdDelete } from 'react-icons/md';
import { useUserContext } from './context/user_context';


const UserCard = ({ user }) => {

  const { getSnackOpen,getUser,getLogOut,AccountDelete } = useUserContext();

  const handleCopy = () => {
    navigator.clipboard.writeText(user.referral_code);
    getSnackOpen("Referral code copied to clipboard")
  };
  
  
  const handleDelete = () => {
    // Logic to delete the user goes here (example alert for demonstration)
    AccountDelete(user);
    getLogOut();
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          User Information
        </Typography>
        <Typography variant="body1">
          <strong>ID:</strong> {user.id}
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body1">
            <strong>Referral Code:</strong> {user.referral_code}
          </Typography>
          <IconButton onClick={handleCopy} aria-label="copy" sx={{ ml: 1 }}>
            <MdOutlineContentCopy />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Referred Users:</strong>
        </Typography>
        <List>
          {user.referred_users.map((refUser, index) => (
            <ListItem key={index}>
              <ListItemText primary={`User ID: ${refUser}`} />
            </ListItem>
          ))}
        </List>
        <Typography variant="body1">
          <strong>Points:</strong> {user.points}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" color="error" startIcon={<MdDelete />} onClick={handleDelete}>
            Delete Account
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Example user object

// Rendering the UserCard component
const Profile = () => {
  const { getUserAPI, getUser } = useUserContext();
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = getUser();
        if (storedUser) {
          const userData = await getUserAPI(storedUser.userId, storedUser.password);
          setUser(userData);
        } else {
          console.log('User not found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {user ? <UserCard user={user} /> : <p>Loading user data...</p>}
    </Box>
  );
};

export default Profile;