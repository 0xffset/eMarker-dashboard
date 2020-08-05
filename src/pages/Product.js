import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {TextField, 
        Chip,
        Grid,
        InputAdornment,
        FormHelperText,
        Input,
        Card,
        CardActionArea,
        CardActions,
        CardContent,
        CardMedia,
        Button,
        Container} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PanelLeft from './Drawer';

import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

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
     
}));

const ActionProducts =()=> {
  const classes = useStyles();
  let fileObj = []
  let fileArray = []
  const [value, setValue] = useState(0);
  const [values, setValues] = useState({
    preview: '',
    raw: ''
  }) 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const uploadMultiplesImages = (e) => {
    if (e.target.files.length) {
       setValues({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
       });
    }
  }
  //Api
  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("image", values.raw);
  }
  const uploadFiles = (event) => {
      console.log(values)
      event.preventDefault()
  }

  return (
     

    <div className={classes.root}>
     <PanelLeft name="Products"/>
     <main className={classes.content}>
      <div className={classes.appBarSpacer} />
     <Container maxWidth="lg" className={classes.container}>
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
          id="outlined-full-width"
          label="Name"
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
          id="outlined-full-width"
          label="Description"
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
        id="tags-outlined"
        options={Caregories}
        getOptionLabel={(option) => option.title}
        // d efaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-full-width"
            variant="outlined"
            label="Categories"
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
  {values.preview ? (

  <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="204.8"
          width="204.8"
          image={values.preview}
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
        multiple
        type="file"
        onChange={uploadMultiplesImages}
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
        label="Tax Excluded Price"
        style={{ margin: 8 }}
        name="TaxExcluededPrice"
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
        label="Tax Include Price"
        style={{ margin: 8 }}
        name="TaxIncludePrice"
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
        label="Tax Rate"
        style={{ margin: 8 }}
        name="TaxRate"
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
        label="Tax Compared Price"
        style={{ margin: 8 }}
        name="TaxComparedPrice"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
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
        label="SKU"
        style={{ margin: 8 }}
        name="SKU"
        margin="normal"
        id="outlined-full-width"
        variant="outlined"
        fullWidth
        required

      />
      </Grid>
    <Grid item xs={12}>
      <TextField
        label="Quantity"
        style={{ margin: 8 }}
        name="Quantity"
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
        label="Width (cm)"
        style={{ margin: 8, width: '31%' }}
        name="Width"
        margin="normal"
        id="standard-adornment-weight"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatShopping,
        }}
        


      />
       <TextField
        label="Height (cm)"
        style={{ margin: 8, width: '33%' }}
        name="Height"
        margin="normal"
        id="standard-adornment-weight"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatShopping,
        }}
        


      />
       <TextField
        label="Depth (cm)"
        style={{ margin: 8, width: '31%' }}
        name="Depth"
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
        label="Weight (kg)"
        style={{ margin: 8 }}
        name="Weight"
        margin="normal"
        id="standard-adornment-weight"
        variant="outlined"
        fullWidth
        InputProps={{
          inputComponent: NumberFormatShopping,
        }}
        
      />
    </Grid>
    <Grid item xs={12}>
        <TextField
        label="Extra Shipping Fee "
        style={{ margin: 8 }}
        name="ExtraShippingFee"
        margin="normal"
        id="standard-adornment-weight"
        variant="outlined"
        fullWidth
        InputProps={{
          inputComponent: NumberFormatCustom,
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

export default ActionProducts;