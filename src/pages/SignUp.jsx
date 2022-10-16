import React, { useState } from 'react'
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import Layout from "../layout/Layout";

const SignUp = () => {
  const [step1, setStep1] = useState(false)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3] = useState(false)
  const [step4, setStep4] = useState(false)

  
  return (
    <div>
       <Layout>  
        <Step1 setStep1 = {setStep1}/>
        {
        step1 ? <Step2 disabled={false}  setStep2 = {setStep2} /> : <Step2 disabled={true} setStep2 = {setStep2} />  
        }
        {
        step2 ? <Step3 disabled={false}  setStep3 = {setStep3} /> : <Step3 disabled={true} setStep3 = {setStep3} />  
        }
       
        {
        step3? <Step4 disabled={false}  setStep4 = {setStep4} /> : <Step4 disabled={true} setStep4 = {setStep4} />  
        }
        {
        step4 ? <Step5 disabled={false}   /> : <Step5 disabled={true}  />  
        }
       
        
      </Layout>
    
    </div>
  )
}

export default SignUp
