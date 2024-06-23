import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import { useUserContext } from "../context/user_context";

const SnackBar = () => {
  const { snackbar,getSnackClose } = useUserContext() 
  return (
    <div>
      <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={getSnackClose}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
    </div>
  )
}

export default SnackBar