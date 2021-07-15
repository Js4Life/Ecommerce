import React, { useState ,useEffect} from 'react'
import { Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline } from '@material-ui/core';
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';

const steps = ['Shipping address','Payment details']

const Checkout = ({ cart ,onCaptureCheckout,error,order}) => {

  const [activeStep,setActiveStep]=useState(0)  
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData,setShippingData] = useState({})
  const [isFinished,setIsFinished]=useState(false)

  const classes = useStyles();
  // const history = useHistory();

  // cant make async at useEffect
  useEffect(()=> {

      const generateToken = async () => {
        try {
         const token =  await commerce.checkout.generateToken(cart.id,{type:'cart'})
         console.log('toke',token);
         setCheckoutToken(token)
        } catch (error) {
          console.log('errrrrrrrr',error)
       //   history.pushState('/')
        }
      }

      generateToken()

  },[cart]);


  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const test = (data) => {
    console.log('check data ship',data)
      setShippingData(data);
      nextStep()
  }

  const timeout = () =>{
    setTimeout(()=>{
      console.log('heelooo world');
      setIsFinished(true)
    },3000)
  }

  const Form = () => activeStep === 0 ?
    <AddressForm checkoutToken={checkoutToken} test={test}  /> 
   : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout} />

  let Confirmation = () => order.customer ? (
    <>
     <Typography variant='h5'>Thank you for your purchase ,{order.customer.firstname} {order.customer.lastname}</Typography>
     <Divider className={classes.divider} />
     <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
     <Button variant='outlined' type='button' component={Link} to='/'>Back to Home</Button>
    </>
  ): isFinished ? (<>
       <Typography variant='h3'>Thank you for your purchase</Typography>
       <Button variant='outlined' type='button' component={Link} to='/'>Back to Home</Button>
     <Divider className={classes.divider} />
  </>):
  (
    <div className={classes.spinner}>
      <CircularProgress/>
    </div>
    )



  if(error) {
    <>
    <Typography variant='h5'>Error:{error}</Typography>
    <Button variant='outlined' type='button' component={Link} to='/'>Back to Home</Button>
    <br/>
    </>
  }

  
  // JSX Render ---> useEffect() --> delay for null? add check dude :)


  return (
    <>
    <CssBaseline/>
      <div className={classes.toolbar}/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h5' align='left'>Checkout</Typography>
          <Stepper activeStep={0} className={classes.stepper}>
              {steps.map((step)=>(
                    <Step key={step}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
              ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation/>: checkoutToken && <Form/>}
        </Paper>

      </main>
    </>
  )
}

export default Checkout
