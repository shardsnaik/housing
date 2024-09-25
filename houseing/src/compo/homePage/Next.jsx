import React, { useState } from 'react'
import axios from 'axios'

export const Next = () => {

  const [data, setdata] = useState({})
  const [prediction, setpredition] = useState(null)

  // funciton to handle input changes
  const handle_in_change = (e) =>{
    const { name, value } = e.target
    setdata((prevdata) =>({
      ...prevdata,
      [name]: value,
    }))
  }

  // function to send the Post request to the flask api
  const handlePred = async () =>{
    try{
      const responce = await axios.post('http://localhost:3000/prediction')
      setpredition(responce.data)
    }catch(error){
      console.log('Error occured', error)
    }
  }

  return (
    <div>

    <div>next</div>
    <label>
      Feature 1:
      <input
      type='int'
      name ='MedInc'
      value={data.MedInc || ''}
      onChange={handle_in_change}
      />
    </label>

    <label>
      Feature 2
      <input type="int"
      name='HouseAge'
      value={data.HouseAge || ''}
      onChange={handle_in_change}
      />
    </label>
    <button onClick={handlePred}> Get Prediction</button>

    {/* display the prediction */}
    {prediction && (
      <div>
        <h2>Predicted results</h2>
        <p>{prediction}</p>
      </div>
    )}
    </div>
  )
}

export default Next