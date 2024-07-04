import React from 'react';

const callback = (val)=>{
    return (

        <h1>Argument value is {val}</h1>
    )
}


const TestCase = ()=>{
    const handlesubmit = (val)=>{
        callback(val);
    }
    return (
        <>
        
        <form action='' method='post'>
            Enter argument value:  
            <input type="text" className="class" />
            <br></br>
            <br></br>
            <input type='submit' className='Submit'/>
        </form>
        
        
        </>
    )
}

export default TestCase;