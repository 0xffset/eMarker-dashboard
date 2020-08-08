import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {TextField, 
        Grid,
        Card,
        CardActionArea,
        CardMedia,
        Button,
        Paper,
        ButtonBase,
        Container} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PanelLeft from '../../pages/Drawer.js';
import { useSnackbar } from 'notistack';
import arrBufferToBase64 from '../helpers/buffeToBinary.js'
import {update} from './product-api'


import {getProductBefore} from './product-api.js'
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
       width: 204.8,
       height: 204.8
     },
  media: {
    width: 75,
    height: 75
  },
 content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  ButtonSave: {
    margin: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    width: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
     
}));

const UpdateProduct =(props)=> {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    name: '',
    description: '',
    caregories: '',
    price: '',
    tax: '',
    sku: '',
    quantity: '',
    width: '',
    height: '',
    depth: '',
    weight: '',
    image: ''

  });

  useEffect(() => {
  getProductBefore(props.match.params.id)
    .then((res) => {
     
     setValues({
      name: res.data[0]['name'],
      description: res.data[0]['description'],
      categories: res.data[0]['categories'],
      price: res.data[0]['price'],
      tax: res.data[0]['tax'],
      sku: res.data[0]['sku'],
      quantity: res.data[0]['quantity'],
      width: res.data[0]['width'],
      height: res.data[0]['height'],
      depth: res.data[0]['depth'],
      weight: res.data[0]['weight'],
      image: res.data[0]['image'],
     
     })

  })
}, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeValues = name =>  event => {
    const value = name === "image" ? event.target.files[0] : event.target.value
    setValues({...values, [name]: value})
  }

const clickSubmit = () => {
    let productData = new FormData()
    values.name && productData.append('name', values.name)
    values.description && productData.append('description', values.description)
    values.categories && productData.append('categories', values.categories)
    values.image && productData.append('image', values.image)
    values.price && productData.append('price', values.price)
    values.tax && productData.append('tax', values.tax)
    values.sku && productData.append('sku', values.sku)
    values.quantity && productData.append('quantity', values.quantity)
    values.width && productData.append('width', values.width)
    values.depth && productData.append('depth', values.depth)
    values.weight && productData.append('weight', values.weight)

    update(productData, props.match.params.id)
      .then((data) => {
          if (data.error) {
            Message(data.error, "error")
          } 

          if (data.message) {
            Message(data.message, "success");
            setValues({...values, redirect: true})
          }
      })
}
const Message = (message, type) => {
     if (type === "error") {
        enqueueSnackbar(message, {
          variant: 'error',
          anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
    },
  });
}

if (type === "success") {
      enqueueSnackbar(message, {
          variant: 'success',
          anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
    },
});
}
}
 const handleCategories = (value)=> {
  let arr = []
  for (let i =0; i < value.length;  i++) {
    arr.push(value[i]['title'])
  }
  setValues({...values, categories: arr.toString()})
 }
  if(values.redirect) {
    return (<Redirect to="/product"/>)
  }
  return (
    <div className={classes.root}>
     <PanelLeft name="Products"/>
     <main className={classes.content}>
      <div className={classes.appBarSpacer} />
     <Container maxWidth="lg" className={classes.container}>
 
 
   <Grid container
        
         justify="flex-start"
        alignItems="center">
   <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>

            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="img" src={values.image ? `data:${values.image.contentType};base64,${arrBufferToBase64(values.image.data.data)}` : "http://react-material.fusetheme.com/assets/images/ecommerce/product-image-placeholder.png"} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>

            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                 {values.name == "" ? "--" : values.name} 
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {values.sku ? "SKU: " + values.sku : "--" }
                </Typography>
                <Typography variant="body2" color="textSecondary">
                 {values.categories ? values.categories : "--"  }
                </Typography>
              </Grid>
              <Grid item>
               <Button  onClick={clickSubmit} variant="contained" color="primary">
                  Save
           </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{values.price ? "$"+ values.price : "$0.00"}</Typography>
            </Grid> 
          </Grid>
        </Grid>
      </Paper>
   </Grid>

    <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Basic Info" {...a11yProps(0)} />
          <Tab label="Product Images" {...a11yProps(1)} />
          <Tab label="Pricing" {...a11yProps(2)} />
          <Tab label="Inventory" {...a11yProps(3)} />
          <Tab label="Shipping" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       <Grid container 
              alignItems="center" 
              spacing={3}>
          <Grid item xs={12}>
          <TextField
          id="name"
          label="Name"
          value={values.name}
          
          onChange={handleChangeValues('name')}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          required
        />
        </Grid>
         <Grid item xs={12}>
         <TextField
          id="description"
          value={values.description}
          label="Description"
          onChange={handleChangeValues('description')}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows= {5}
          required
        />
         </Grid>
        <Grid item xs={12}>
        <Autocomplete
        style={{margin: 8}}
        multiple
        id="categories"
        onChange={(event, value) => handleCategories(value)}
        options={Caregories}
        getOptionLabel={(option) => option.title}
        // defaultValue={values.categories ? {"title": values.categories.split(",")} : ['']}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-full-width"
            variant="outlined"
            label="Categories"
            name="categories"
          />
        )}
      />
        </Grid>
       </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
    <Grid container>
    <Grid item xs={6} sm={3} >
</Grid>
<Grid item xs={6} sm={3} >
  {values.image ? (

  <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="204.8"
          width="204.8"
          image={`data:${values.image.contentType};base64,${arrBufferToBase64(values.image.data.data)}`}
          title="Contemplative Reptile"
        />
       
      </CardActionArea>
  </Card>
    ) : ("")}
</Grid>
  </Grid>
    <form>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        onChange={handleChangeValues('image')}
        multiple
        type="file"
        style={{display: 'none'}}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </form>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid container 
              alignItems="center" 
              spacing={3} >
              <Grid item xs={12}>
       <TextField
        value={values.tax}
        label="VAT Tax (%)"
        style={{ margin: 8 }}
        onChange={handleChangeValues('tax')}
        id="tax"
        type="Number"
        variant="outlined"
        fullWidth

      />
     </Grid>
     <Grid item xs={12}>
      <TextField
        value={values.price}
        label="Price"
        onChange={handleChangeValues('price')}
        style={{ margin: 8 }}
        name="price"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        variant="outlined"
        fullWidth
        />
      </Grid>
     <Grid item xs={12}>
       <TextField
        label="Price Including VAT"
        value={values.price > 0 && values.tax > 0 ? parseFloat(values.price) + parseFloat(((values.tax * values.price) / 100))  : 0}

        style={{ margin: 8 }}
        name="PriceIncludingVAT"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom
         
        }}
        variant="outlined"
        fullWidth

      />
     </Grid>
      <Grid item xs={12}>
      <TextField
        label="Price Excluding VAT"
        value={values.price}
        style={{ margin: 8 }}
        name="TaxIncludePrice"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
          readOnly: true
        }}
        variant="outlined"
        fullWidth

      />
      </Grid>
      <Grid item xs={12}>
      <TextField
        label="Amount Tax"
        value={parseFloat(((values.tax * values.price) / 100))}
        style={{ margin: 8 }}
        name="AmountTax"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
          readOnly: true
        }}
        variant="outlined"
        fullWidth

      />
      </Grid>
      

      </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div>
     <Grid container 
              alignItems="center" 
              spacing={3} >
      <Grid item xs={12}>
      <TextField
      value={values.sku}
        label="SKU"
        style={{ margin: 8 }}
        name="sku"
        onChange={handleChangeValues('sku')}
        margin="normal"
        id="outlined-full-width"
        variant="outlined"
        fullWidth
        required

      />
      </Grid>
    <Grid item xs={12}>
      <TextField
        value={values.quantity}
        label="Quantity"
        style={{ margin: 8 }}
        name="quantity"
        onChange={handleChangeValues('quantity')}
        margin="normal"
        id="standard-number"
        type="number"
        variant="outlined"
        fullWidth
        required

      />
    </Grid>
     </Grid>
      </div>
      </TabPanel>
         <TabPanel value={value} index={4}>
        <Grid container 
              alignItems="center" 
              spacing={3}>
          
     <Grid item xs={12}>
          <TextField
        value={values.width}
        label="Width (cm)"
        style={{ margin: 8, width: '31%' }}
        onChange={handleChangeValues('width')}
        name="width"
        margin="normal"
        id="standard-adornment-weight"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatShopping,
        }}
        


      />
       <TextField
        value={values.height}
        label="Height (cm)"
        style={{ margin: 8, width: '33%' }}
        onChange={handleChangeValues('height')}
        name="height"
        margin="normal"
        id="standard-adornment-weight"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatShopping,
        }}
        


      />
       <TextField
        value={values.depth}
        label="Depth (cm)"
        style={{ margin: 8, width: '31%' }}
        name="depth"
        onChange={handleChangeValues('depth')}
        margin="normal"
        id="standard-adornment-weight"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatShopping,
        }}
        
        />
    </Grid>
      <Grid item xs={12}>
        <TextField
        value={values.weight}
        label="Weight (g)"
        style={{ margin: 8 }}
        name="weight"
        onChange={handleChangeValues('weight')}        
        margin="normal"
        id="standard-adornment-weight"
        variant="outlined"
        fullWidth
        InputProps={{
          inputComponent: NumberFormatShopping,
        }}
        
      />
    </Grid>
   
        </Grid>
      </TabPanel>

     </Container>
     </main>
      </div>
  );
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function NumberFormatShopping(props) {
  const { inputRef, onChange,  ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      
    />
  );
}

NumberFormatShopping.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


const Caregories = [
  { title: 'Arts & Crafs' },
  { title: 'Automovile' },
  { title: 'Baby' },
  { title: 'Beautiful & and Person Care' },
  { title: 'Books' },
  { title: 'Computer' },
  { title: 'Electronics' },
  { title: 'Womens Fashion ' },
  { title: 'Mens fashion' },
  { title: 'Girls Fashion' },
  { title: 'Boys Fashion' },
  { title: 'Deals' },
  { title: 'Health & Household' },
  { title: 'Health & Household' },
  { title: 'Home & Kitchen' },
  { title: 'Industrial & Scientific' }
];

export default UpdateProduct;