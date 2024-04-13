import React from 'react';
import { Grid, Card, CardMedia } from '@mui/material';
import Harley from '../assets/images/harley_quinn.png';
import Joker from '../assets/images/joker.png';
import Batgirl from '../assets/images/batgirl.png';
import Venom from '../assets/images/venom.png';
import Thanos from '../assets/images/thanos_avatar.png';
import Antman from '../assets/images/antman.png';

const ImageGrid = ({ selectedImages, setSelectedImages, shopItems }) => {
  const handleImageClick = (src) => {
    const selectedAvatar = shopItems.find(avatar => avatar.src === src);
    if (selectedAvatar) {
      // Check if the selected avatar is already in selectedImages
      const isSelected = selectedImages.some(image => image.src === src);
      if (isSelected) {
        // If it's selected, remove it from selectedImages
        const updatedImages = selectedImages.filter(image => image.src !== src);
        setSelectedImages(updatedImages);
      } else {
        // If it's not selected, add it to selectedImages
        setSelectedImages([...selectedImages, selectedAvatar]);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      {shopItems.map((avatar, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card
            onClick={() => handleImageClick(avatar.src)}
            style={{
              cursor: 'pointer',
              border: selectedImages.some(image => image.src === avatar.src) ? '6px solid orange' : '6px solid transparent'
            }}
          >
            <CardMedia
              component="img"
              image={avatar.src}
              alt={avatar.name}
              height="300"
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGrid;
