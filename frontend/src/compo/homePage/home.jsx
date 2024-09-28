import React from 'react'
import { Link } from 'react-router-dom'

const home= () =>{
const click= () =>{
console.log('hhh');
}

return (
    <div>

        <h1>gggggg</h1>
        <Link to='./predict' ><div onClick={click}>click </div></Link>
    </div>
) 
}


export default home