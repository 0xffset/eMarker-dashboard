import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { productlist } from './product-api'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles'
import {
    TableBody,
    TableCell,
    TableRow,
    Chip,
    IconButton
} from '@material-ui/core'
import arrBufferToBase64 from '../../components/helpers/buffeToBinary.js'

const useStyles = makeStyles((theme) => ({
  margin: {
        margin: theme.spacing(1),
    },
}));

export default function ProductLists(props) {
   
    const [products, setProducts] = useState([]);
    
  useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        productlist({},signal)
            .then((res) => {
                setProducts(res)
              })
    }, []);
  const classes = useStyles();
    return (
        <TableBody>
        {products.map((product) => (
        
         <TableRow key={product._id}>
           <Link to={`/product/update/${product._id}`}><IconButton arial-label="update" className={classes.margin} >
              <EditOutlinedIcon/>
       </IconButton></Link>
            {product.image ? ( <TableCell><img src={`data:${product.image.contentType};base64,${arrBufferToBase64(product.image.data.data)}`} style={{width: 50, height: 50}} /></TableCell>)
              : (<TableCell><img src={"http://react-material.fusetheme.com/assets/images/ecommerce/product-image-placeholder.png"} style={{width: 50, height: 50}}/></TableCell>)}
             <TableCell>{product.name}</TableCell>
            
            <TableCell>{product.categories}</TableCell>
            <TableCell>{"$"+product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
           <TableCell> {product.status === "Enable" ? <Chip color="primary"  label={product.status}/>  : <Chip color="secondary"  label={product.status}/> } </TableCell>
          </TableRow>
     
        ))}
      </TableBody>
    )
}