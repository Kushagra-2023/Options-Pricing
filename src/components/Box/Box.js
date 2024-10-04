import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({url, title, text}) {
  return (
    <div className='box'>
    <Card sx={{ maxWidth: '50vw', height: '100%', padding: '10px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ bgcolor: '#EEEEE', color: '#333333' }}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}
