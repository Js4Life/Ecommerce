import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useFormContext,Controller } from 'react-hook-form'


const FormInput = ({name,label}) => {

  const { control } = useFormContext()


  return (
    <Grid xs={12} sm={6}>
        <Controller
        as={TextField}
        control={control}
        defaultValue=''
        fullWidth 
        name={name}
        label={label}
        required
        />
    </Grid>
  )
}

export default FormInput
