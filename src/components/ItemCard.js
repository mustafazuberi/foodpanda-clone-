import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "./partner-bg.png"
export default function MediaCard({itemDetails}) {
  return (
    <Card sx={{ maxWidth: 300 }} className="mt-5">
      <CardMedia
        sx={{ height: 140 }}
        image= {itemDetails.itemImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" style={{backgroundColor:"#e21b70",color:"white"}}>Edit</Button>
        <Button size="large" style={{backgroundColor:"#e21b70",color:"white"}} >Delete</Button>
      </CardActions>
    </Card>
  );
}
