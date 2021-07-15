import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

const Product = ({ product ,onAddToCart}) => {
  const classes = useStyles();

 // console.log('inside pdt',product)

  // return (
  //   <div>test</div>
  // )
  
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.media.source} title={product.name} />

      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">{product.price.formatted_with_symbol}</Typography>
          <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{__html : product.description}} />       
        </div>
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="add to Cart" onClick={() => onAddToCart(product.id,1)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>

    </Card>
  );
};

export default Product;
