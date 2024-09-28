// import React, { useState } from 'react'
// import axios from 'axios'

// export const Next = () => {

//   const [data, setdata] = useState({})
//   const [prediction, setpredition] = useState(null)

//   // funciton to handle input changes
//   const handle_in_change = (e) =>{
//     const { name, value } = e.target
//     setdata((prevdata) =>({
//       ...prevdata,
//       [name]: value,
//     }))
//   }

//   // function to send the Post request to the flask api
//   const handlePred = async () =>{
//     try{
//       const responce = await axios.post('http://localhost:3000/prediction')
//       setpredition(responce.data)
//     }catch(error){
//       console.log('Error occured', error)
//     }
//   }

//   return (
//     <div>

//     <div>next</div>
//     <label>
//       Feature 1:
//       <input
//       type='int'
//       name ='MedInc'
//       value={data.MedInc || ''}
//       onChange={handle_in_change}
//       />
//     </label>

//     <label>
//       Feature 2
//       <input type="int"
//       name='HouseAge'
//       value={data.HouseAge || ''}
//       onChange={handle_in_change}
//       />
//     </label>
//     <button onClick={handlePred}> Get Prediction</button>

//     {/* display the prediction */}
//     {prediction && (
//       <div>
//         <h2>Predicted results</h2>
//         <p>{prediction}</p>
//       </div>
//     )}
//     </div>
//   )
// }

// export default Next

import React, { useState } from 'react'

export const Next =() =>{
  const [formData, setformData] = useState({
    MedInc: '',
    HouseAge: '',
    AveRooms: '',
    AveBedrms: '',
    Population: '',
    AveOccups: '',
    Latitude: '',
    Longitude: ''
  })
  const [error, setError] = useState(null)
  const [prediction, setprediction ] = useState(null)
  

  // function to handle input Change
  const handleInputChange=(e) =>{
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value
    })
  }

  // send the data to flask api
  const handlePred = async () =>{
    setError(null)
    setprediction(null)
    try{
      const response= await fetch('http://127.0.0.1:5000/predict', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({data: formData }),  // sending the formDaata as JSon to flask api
      })
      if(!response.ok){
        throw new Error('Failed to fetch prediction')
      }
     const result = await response.json();
     // assuming the flask api responce contain either prediction or an error
     if(result.error){
      setError(result.error)
     }else{
       setprediction(result)  //  update teh prediction state with the API response
     }
    }catch(error){
    console.error('Erorr during prediction', error)
    setError('An error occured while fetching the prediction{ pred was not fetched} ')}
  }

  return(
<div>
<h1>House Price Prediction</h1>
<label> MedInc:
  <input type="number"
  name='MedInc'
  value={formData.MedInc}
  onChange={handleInputChange} />
</label>
<br />

<label> HouseAge:
  <input type="number"
  name='HouseAge'
  value={formData.HouseAge}
  onChange={handleInputChange} />
</label>
<br />

<label> AveRooms:
  <input type="number"
  name='AveRooms'
  value={formData.AveRooms}
  onChange={handleInputChange} />
</label>
<br />
<label> AveBedrms:
  <input type="number"
  name='AveBedrms'
  value={formData.AveBedrms}
  onChange={handleInputChange} />
</label>
<br />
<label> Population:
  <input type="number"
  name='Population'
  value={formData.Population}
  onChange={handleInputChange} />
</label>
<br />

<label> AveOccups:
  <input type="number"
  name='AveOccups'
  value={formData.AveOccups}
  onChange={handleInputChange} />
</label>
<br />

<label> Latitude:
  <input type="number"
  name='Latitude'
  value={formData.Latitude}
  onChange={handleInputChange} />
</label>
<br />

<label> Longitude:
  <input type="number"
  name='Longitude'
  value={formData.Longitude}
  onChange={handleInputChange} />
</label>
<br />
<button onClick={handlePred}> get predict</button>

{prediction && (
<div>
  <h2>Prediction are : </h2>
  <p>{prediction}</p>
</div>)
}
{error && (
  <div>
  <h2>Eror</h2>
  <p>{error}</p></div>
)}
</div>
  )}

export default Next


