import React from "react";
import {Grid} from "@material-ui/core";
import Product from "./product/Product";
import useStyles from './styles'

// const products = [
//   { id: 1, name: "shoes", description: "Running Shoe" ,price : '$5',image : 'http://placehold.it/120x120&text=image1'},
//   { id: 2, name: "MacBook", description: "Apple Macbook",price:'$6', image :'http://placehold.it/120x120&text=image2' },
// ];

export const Products = ({products , onAddToCart}) => {
  console.log('inside pdts',onAddToCart)
  const classes = useStyles()
  return (
    <main className={classes.content}>
      <div  className={classes.toolbar} />
      <Grid container  justifyContent="center" spacing={4}>
        {products.map((pdt) => (
          <Grid item key={pdt.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={pdt}  onAddToCart = {onAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products
