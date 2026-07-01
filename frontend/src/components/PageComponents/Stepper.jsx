import React from 'react'

const Stepper = ({step,setStep}) => {
  
  
  return (
    <div>
        <div className="flex justify-between mt-10 mb-5">
            <div style={{backgroundColor: step==1?"#32cd32":step>1?"#0080ff":"#588bae"} } className="w-15 h-15 rounded-full text-center pt-4 text-white">step1</div>
            <div style={{backgroundColor: step==2?"#32cd32":step>2?"#0083ff":"#588bae"}} className="w-15 h-15 rounded-full text-center pt-4 text-white" >step2</div>
            <div style={{backgroundColor: step==3?"#32cd32":step>3?"#0083ff":"#588bae"}} className="w-15 h-15 rounded-full text-center pt-4 text-white">step3</div>
            <div style={{backgroundColor: step==4?"#32cd32":step>4?"#0083ff":"#588bae"}} className="w-15 h-15 rounded-full text-center pt-4 text-white">step4</div>
            <div style={{backgroundColor: step==5?"#32cd32":step>5?"#0083ff":"#588bae"}} className="w-15 h-15 rounded-full text-center pt-4 text-white">step5</div>
            <div style={{backgroundColor: step==6?"#32cd32":step>6?"#0083ff":"#588bae"}} className="w-15 h-15 rounded-full text-center pt-4 text-white">step6</div>
        </div>
    </div>
  )
}

export default Stepper