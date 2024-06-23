// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
// import { IoMdAdd } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
// import { useUserContext } from "./context/user_context";
// import { useLocation } from 'react-router-dom';
// import { useProductContext } from './context/productContext';

// const UploadProduct = () => {
//   const location = useLocation();
//   const product = location.state || { images: [{ id: 1, file: null }], description: '' };
//   const [images, setImages] = useState([]);
//   const [description, setDescription] = useState('');
//   const { getUser } = useUserContext();
//   const { uploadProducts, isUploadLoading } = useProductContext();
//   const user = getUser();
//   const pId = product ? product.id : null;
//   console.log(product);
//   useEffect(() => {
//     if (product) {
//       setDescription(product.description || '');
//       setImages(product.images.map((img, index) => ({ id: index + 1, file: img.file ? new File([], img.file) : null })));
//     }
//    }, []); 

//   const handleAddImage = () => {
//     setImages([...images, { id: images.length + 1, file: null }]);
//   };

//   const handleDelImage = () => {
//     if (images.length > 1) {
//       setImages(images.slice(0, images.length - 1));
//     }
//   };

//   const handleImageChange = (index, event) => {
//     const newImages = [...images];
//     newImages[index].file = event.target.files[0];
//     setImages(newImages);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     uploadProducts(description, pId, images, user);
//     setDescription('');
//     setImages([{ id: 1, file: null }]);
//   };

//   if (isUploadLoading) {
//     return <Typography variant="h4" gutterBottom>...Loading</Typography>;
//   }

//   return (
//     <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4, boxShadow: 3, borderRadius: 2 }}>
//       <Typography variant="h4" gutterBottom>Upload Product</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Product Description"
//           multiline
//           rows={4}
//           fullWidth
//           value={description}
//           onChange={handleDescriptionChange}
//           sx={{ mb: 3 }}
//           inputProps={{ style: { textTransform: 'none' } }}
//         />
//         {images.map((image, index) => (
//           <Box key={image.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//             <Button variant="contained" component="label" sx={{ mr: 2 }} color='secondary'>
//               Upload Image {image.id}
//               <input type="file" hidden onChange={(event) => handleImageChange(index, event)} />
//             </Button>
//             {image.file && (
//               <Typography variant="body2">{image.file.name}</Typography>
//             )}
//           </Box>
//         ))}
//         <IconButton color="secondary" onClick={handleAddImage}>
//           <IoMdAdd size={35} />
//         </IconButton>
//         <IconButton color="secondary" onClick={handleDelImage}>
//           <MdDelete size={35} />
//         </IconButton>
//         <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3 }}>Submit</Button>
//       </form>
//     </Box>
//   );
// };

// export default UploadProduct;


import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useUserContext } from "./context/user_context";
import { useLocation,useNavigate } from 'react-router-dom';
import { useProductContext } from './context/productContext';
import axios from "axios";

const UploadProduct = () => {
  const location = useLocation();
  const product = location.state || { images: [], description: '' };
  const [images, setImages] = useState(
    product.images.map((url, index) => ({ id: index + 1, file: null, url }))
  );
  const [description, setDescription] = useState(product.description);
  const { getUser } = useUserContext();
  const { uploadProducts, isUploadLoading } = useProductContext();
  const user = getUser();
  const pId = product ? product.id : null;
  const redirect = useNavigate();

  const handleAddImage = () => {
    setImages([...images, { id: images.length + 1, file: null, url: '' }]);
  };

  const handleDelImage = () => {
    if (images.length > 1) {
      setImages(images.slice(0, images.length - 1));
    }
  };

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], file: event.target.files[0], url: URL.createObjectURL(event.target.files[0]) };
    setImages(newImages);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const urlToFile = async (url, filename, mimeType) => {
    try {
      const response = await axios.get(url);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const buffer = await response.arrayBuffer();
      return new File([buffer], filename, { type: mimeType });
    } catch (error) {
      console.error('Error converting URL to file:', error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedImages = await Promise.all(
      images.map(async (image, index) => {
        if (image.file) {
          return image;
        } else if (image.url) {
          const mimeType = "image/jpeg";
          const file = await urlToFile(image.url, `image${index}.jpg`, mimeType);
          return file ? { ...image, file } : null;
        }
        return image;
      })
    );

    const validImages = updatedImages.filter(img => img !== null);

    try {
      await uploadProducts(description, pId, validImages, user);
      setDescription('');
      setImages([{ id: 1, file: null, url: '' }]);
      redirect("/products");
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  if (isUploadLoading) {
    return <Typography variant="h4" gutterBottom>...Loading</Typography>;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>Upload Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
          sx={{ mb: 3 }}
          inputProps={{ style: { textTransform: 'none' } }}
        />
        {images.map((image, index) => (
          <Box key={image.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" component="label" sx={{ mr: 2 }} color='secondary'>
              Upload Image {image.id}
              <input type="file" hidden onChange={(event) => handleImageChange(index, event)} />
            </Button>
            {image.url && (
              <img src={image.url} alt={`product image ${image.id}`} width={100} />
            )}
          </Box>
        ))}
        <IconButton color="secondary" onClick={handleAddImage}>
          <IoMdAdd size={35} />
        </IconButton>
        <IconButton color="secondary" onClick={handleDelImage}>
          <MdDelete size={35} />
        </IconButton>
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 3 }}>Submit</Button>
      </form>
    </Box>
  );
};

export default UploadProduct;
