import React from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';

const ImageGrid = ({ selectedImages, setSelectedImages, shopItems }) => {
  const handleImageClick = (src) => {
    let selectedAvatar = null;

    // Iterate through each row in the shopItems array
    for (let row of shopItems) {
        // Find the avatar object with the matching src value
        selectedAvatar = row.find((avatar) => avatar.src === src);

        // If the selectedAvatar is found, break out of the loop
        if (selectedAvatar) {
            break;
        }
    }

    if (selectedAvatar) {
      const isSelected = selectedImages.some((image) => image.src === src);
      if (isSelected) {
        const updatedImages = selectedImages.filter((image) => image.src !== src);
        setSelectedImages(updatedImages);
      } else {
        setSelectedImages([...selectedImages, selectedAvatar]);
      }
    }
  };

  const rows = [];
  for (let rowIndex = 0; rowIndex < shopItems.length; rowIndex++) {
    const row = shopItems[rowIndex];
    const rowItems = [];

    rowItems.push(
      <Grid item xs={12} key={`xp-${rowIndex}`}>
        <Typography variant="h6" textAlign="center" style={{ fontWeight: 'bold' }}>
          {row[0].xp} XP
        </Typography>
      </Grid>
    );

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const avatar = row[columnIndex];
      rowItems.push(
        <Grid item key={`${rowIndex}-${columnIndex}`} mb={3} xs={12} sm={6} md={4} lg={2}>
          <Card
            onClick={() => handleImageClick(avatar.src)}
            style={{
              cursor: 'pointer',
              border: selectedImages.some((image) => image.src === avatar.src)
                ? '6px solid orange'
                : '6px solid transparent',
            }}
          >
            <CardMedia
              component="img"
              image={avatar.src}
              alt={avatar.name}
              height="auto"
              width="100%"
            />
            <Typography textAlign="center">{avatar.name}</Typography>
          </Card>
        </Grid>
      );
    }

    rows.push(
      <Grid container spacing={2} key={`row-${rowIndex}`}>
        {rowItems}
      </Grid>
    );
  }

  return <Grid container spacing={2}>{rows}</Grid>;
};

export default ImageGrid;
