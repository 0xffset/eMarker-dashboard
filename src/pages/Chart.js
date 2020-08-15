import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import {chart} from '../components/orders/orders-api.js'
import auth from '../components/auth/auth-helper'
export default function Chart() {
  const  [data, setData] = useState()
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    chart({t: jwt.token})
      .then((res) => {
        setData(res)
      })
  })
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Sales</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="created_at" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}