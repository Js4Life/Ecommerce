import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { Link } from 'react-router-dom';

import CartItem from "./CartItem/CartItem";
const Cart = ({
  cart,
  handleUpdateQty,
  handleEmptyCart,
  handleRemoveFromCart,
}) => {
  //  console.log('99457',!cart.line_items.length)

  // const isEmpty = !cart.line_items.length;
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Your have no items in your shopping cart <br/>
      <Link to="/" className={classes.Link}>
         Start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4}  key={item.id}>
            {/* <div>{item.name}</div> */}
            <CartItem item={item} 
             onUpdatecartQty={handleUpdateQty}
             onRemoveFromCart={handleRemoveFromCart}
              />
          </Grid>
        ))}
      </Grid>

      <div className={classes.cardDetails}>
        <Typography variant="h4">
          SubTotal : {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
          component={Link}
          to='/checkout'
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loading...!";

  return (
    <Container>
      <div>test</div>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        {" "}
        Your Shopping Cart{" "}
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
