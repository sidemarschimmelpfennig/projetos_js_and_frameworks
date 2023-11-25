import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function PokeCard({name,image}) {
  return (
    <Card sx={{ maxWidth: 345 , borderRadius:5}} >
      <CardActionArea >
        <CardMedia
          component="img"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{textTransform:'capitalize', fontWeight:"bold",textAlign:'center'}}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          { /*Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica*/ }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}