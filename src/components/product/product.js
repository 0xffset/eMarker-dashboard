import React, { useEffect, useState } from 'react'
import { productlist } from './product-api'
import {
    TableBody,
    TableCell,
    TableRow,
    Chip
} from '@material-ui/core'


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