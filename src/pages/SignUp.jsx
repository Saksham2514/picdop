import React, { useState } from 'react'
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [step1, setStep1] = useState(false)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3] = useState(false) 
  const [step4, setStep4] = useState(false)
  const [details, setDetails] = useState({})
  
  return (
    <div>
       <Layout>  
        <Step1 setDetails={setDetails} details={details} setStep1 = {setStep1}/>
        {
        step1 ? <Step2 setDetails={setDetails} details={details} disabled={false}  setStep2 = {setStep2} /> : <Step2 setDetails={setDetails} details={details} disabled={true} setStep2 = {setStep2} />  
        }
        {
        step2 ? <Step3 setDetails={setDetails} details={details} disabled={false}  setStep3 = {setStep3} /> : <Step3 setDetails={setDetails} details={details} disabled={true} setStep3 = {setStep3} />  
        }
       
        {
        step3? <Step4 setDetails={setDetails} details={details} disabled={false}  setStep4 = {setStep4} /> : <Step4 setDetails={setDetails} details={details} disabled={true} setStep4 = {setStep4} />  
        }
        {
        step4 ? <Step5 setDetails={setDetails} details={details} disabled={false}   /> : <Step5 setDetails={setDetails} details={details} disabled={true}  />  
        }
       
        <Link to="/" style={{marginLeft:"0.75rem",color:"var(--main-color)",textDecoration:"none"}}> Login instead ? </Link> 
      </Layout>
    
    </div>
  )
}

export default SignUp
