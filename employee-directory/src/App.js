import logo from './logo.svg';
import './App.css';
import Api from "./utils/Api.js";
import React, { useState, useEffect } from 'react';


function App() {
  const [empList,setEmpList]= useState(
    {
      allEmps: [],
      filteredEmps: [],
      searchTerm: '',
      asc: false
    }
  );

  

  useEffect(() => {
     Api.employees().then(response => {
       console.log(response.data.results);
      setEmpList({...empList, allEmps: response.data.results})
     })
  },[]);

  const handleSort= () => {

    if(empList.asc === true) {

    function compare(a, b) {
      if (a.name.first > b.name.first) return 1;
      if (b.name.first > a.name.first) return -1;
    
      return 0;
    }
    var sorted = empList.allEmps.sort(compare)
    console.log(sorted);
    setEmpList({...empList, allEmps: sorted, asc: !empList.asc})

    } else {

      function compare(a, b) {
        if (a.name.first > b.name.first) return -1;
        if (b.name.first > a.name.first) return 1;
      
        return 0;
      }
      var sorted = empList.allEmps.sort(compare)
      console.log(sorted);
      setEmpList({...empList, allEmps: sorted, asc: !empList.asc})

    }


  }

  const handleTyping = (e) => {
    console.log(e.target.value);
    var filteredEmps = []
    empList.allEmps.map((oneEmp) => {
      if (oneEmp.name.first.substring(0, e.target.value.length) === e.target.value){
        filteredEmps.push(oneEmp);
      }
  
    })
    console.log(filteredEmps);
    setEmpList({...empList, filteredEmps: filteredEmps, searchTerm: e.target.value})

    //if()



    /// sift thru the array of emplys and pick off only the T's

    // update the state with our new array of emps tha tonly have the T's
   
  }

var pplToDisplay = empList.allEmps

if(empList.filteredEmps.length > 0){
  pplToDisplay = empList.filteredEmps
} else if(empList.searchTerm.length > 0 && empList.filteredEmps.length == 0) {
  pplToDisplay =[]
}



  console.log('THIS IS OUR STATE',empList);
  return (<div>
    <input onChange= {handleTyping}></input>
    <button onClick= {handleSort}>Name</button>
    <tbody>
    {pplToDisplay.map((oneEmp) => {
      return (
        <tr>{oneEmp.name.first + " " + oneEmp.name.last } <img src={oneEmp.picture.thumbnail} alt=""></img></tr>
      )
    })}
    </tbody>

  </div>);
  
}

export default App;
