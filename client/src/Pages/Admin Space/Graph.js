import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


const Graph = ({ data }) => {
    return (
      <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="parents" stroke="#E35936" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="creches" stroke="#008B8D" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="enfants" stroke="#F0AB99" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  

export default Graph;
