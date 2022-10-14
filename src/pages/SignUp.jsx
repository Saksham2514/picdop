import React, { useState } from 'react'
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Layout from "../layout/Layout";

const SignUp = () => {
  const [next, setNext] = useState(false)
  
  return (
    <div>
       <Layout>  
        <Step1 setNext = {setNext}/>
        {
        next ? <Step2 disabled={false}/> : <Step2 disabled={true}/>  
        }
      </Layout>
    
    </div>
  )
}

export default SignUp
