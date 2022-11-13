import React from 'react'
import { Sparklines } from 'react-sparklines';

 
export default function MyChart() {
 return(
  <Sparklines data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20} margin={5}>
</Sparklines>

 );
}