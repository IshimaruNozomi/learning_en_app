import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AccuracyChart = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="word" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="accuracy" fill="#93c5fd" />
  </BarChart>
);

export default AccuracyChart;
