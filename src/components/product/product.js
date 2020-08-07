import React, { useEffect, useState } from 'react'
import { productlist } from './product-api'
import {
    TableBody,
    TableCell,
    TableRow,
    Chip
} from '@material-ui/core'
import arrBufferToBase64 from '../../components/helpers/buffeToBinary.js'



export default function ProductLists(props) {
   
    const [products, setProducts] = useState([]);
    
  useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        productlist({},signal)
            .then((res) => {
                setProducts(res)

            })
    });
    return (
        <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
          <TableCell><img src={`data:${product.image.contentType};base64,${arrBufferToBase64(product.image.data.data)}`} style={{width: 50, height: 50}} /></TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.categories}</TableCell>
            <TableCell>{"$"+product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
           <TableCell> {product.status === "Enable" ? <Chip color="primary"  label={product.status}/>  : <Chip color="secondary"  label={product.status}/> } 
     
    </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}