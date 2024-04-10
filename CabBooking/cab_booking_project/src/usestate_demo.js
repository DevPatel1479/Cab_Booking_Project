import React, {useState} from "react";

function App(){
    const [text, setText] = useState("Enter text...");

    const onchangeHandler = (event)=>{
        setText(event.target.value);
    }

    const onclickHandler = ()=>{
        const new_text = text.toUpperCase();
        setText(new_text);
    }

    return (
        <>
            <center>
                <h1>Use State Demo </h1>
                <br></br>
                <br></br>
                <textarea rows="5" cols="50" value={text}  onChange={onchangeHandler}></textarea>
                <br></br>
                <button type="button" onClick={onclickHandler}>Click</button>
            </center>

            

            


        </>
    );

}

export default App;