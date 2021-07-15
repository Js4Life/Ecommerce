import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, test }) => {
  // console.log('next',next)
  const [shippingCountries, setshippingCountries] = useState([]);
  const [shippingCountry, setshippingCountry] = useState("");
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));
  console.log("options", options);

  console.log("shippingOptions", shippingOptions);

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProv = null
  ) => {
    console.log("req body", checkoutTokenId, { country, region: stateProv });
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProv }
    );
    setShippingOptions(options);
    // setShippingOption(options[0].id)
  };

  console.log("ObjKey", countries);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    console.log("countries", countries);
    setshippingCountries(countries);
    console.log("shippingCountries", shippingCountries);
    // [AL]
    setshippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubDivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    console.log("subdivisionz", subdivisions);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form 
        onSubmit={methods.handleSubmit((data)=> test({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
          <Grid container spacing={3}>
          <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                defaultValue={""}
                fullWidth
                onChange={(e) => setshippingCountries(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivisions(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <br/>

          <div style={{display:'flex',justifyContent:'space-between'}}>
            <Button component={Link}  to='/cart' variant='outlined'>Back to Cart</Button>
            <Button type='submit' color='primary' variant='contained'>Next</Button>
          </div>

        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
