import React from 'react';
import { Grid, Card, CardMedia } from '@mui/material';
import Deadpool from '../assets/images/deadpool_avatar.png';
import Harley from '../assets/images/harley_quinn.png';
import Joker from '../assets/images/joker.png';
import Batgirl from '../assets/images/batgirl.png';
import Venom from '../assets/images/venom.png';
import Thanos from '../assets/images/thanos_avatar.png';
import Antman from '../assets/images/antman.png';

const ImageGrid = ({ selectedImages, setSelectedImages }) => {
  const avatars = [
    { name: 'Deadpool', src: Deadpool },
    { name: 'Harley Quinn', src: Harley },
    { name: 'Joker', src: Joker },
    { name: 'Batgirl', src: Batgirl },
    { name: 'Venom', src: Venom },
    { name: 'Thanos', src: Thanos },
    { name: 'Antman', src: Antman },
  ];

  const handleImageClick = (src) => {
    const isSelected = selectedImages.includes(src);
    if (isSelected) {
      setSelectedImages(selectedImages.filter(image => image !== src));
    } else {
      setSelectedImages([...selectedImages, src]);
    }
  };

  return (
    <Grid container spacing={2}>
      {avatars.map((avatar, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card
            onClick={() => handleImageClick(avatar.src)}
            style={{
              cursor: 'pointer',
              border: selectedImages.includes(avatar.src) ? '6px solid orange' : '6px solid transparent'
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
