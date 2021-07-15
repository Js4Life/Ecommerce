import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
// import Logo from '../../../assets/commerce.png';


const CartItem = ({ item , onUpdatecartQty,onRemoveFromCart}) => {
  const classes = useStyles();
  console.log('itemss',item)
  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={()=>onUpdatecartQty(item.id,item.quantity-1)}>
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size="small" onClick={()=>onUpdatecartQty(item.id,item.quantity+1)}>
            +
          </Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={()=>onRemoveFromCart(item.id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
