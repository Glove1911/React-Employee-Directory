// import logo from './logo.svg';
import './App.css';
import Api from "./utils/Api.js";
import React, { useState, useEffect } from 'react';
import Header from "./components/Header.js"

const tableStyle  = {
  width: "100%"
}
function App() {
  const [empList, setEmpList] = useState(
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
      setEmpList({ ...empList, allEmps: response.data.results })
    })
  }, []);

  const handleSort = () => {

    if (empList.asc === true) {

      function compare(a, b) {
        if (a.name.first > b.name.first) return 1;
        if (b.name.first > a.name.first) return -1;

        return 0;
      }
      var sorted = empList.allEmps.sort(compare)
      console.log(sorted);
      setEmpList({ ...empList, allEmps: sorted, asc: !empList.asc })

    } else {

      function compare(a, b) {
        if (a.name.first > b.name.first) return -1;
        if (b.name.first > a.name.first) return 1;

        return 0;
      }
      let sorted = empList.allEmps.sort(compare)
      console.log(sorted);
      setEmpList({ ...empList, allEmps: sorted, asc: !empList.asc })

    }


  }

  const handleTyping = (e) => {
    console.log(e.target.value);
    let filteredEmps = []
    empList.allEmps.map((oneEmp) => {
      if (oneEmp.name.first.substring(0, e.target.value.length).toLowerCase() === e.target.value.toLowerCase()) {
        filteredEmps.push(oneEmp);
      }

    })
    console.log(filteredEmps);
    setEmpList({ ...empList, filteredEmps: filteredEmps, searchTerm: e.target.value })

    //if()



    /// sift thru the array of emplys and pick off only the T's

    // update the state with our new array of emps tha tonly have the T's

  }

  var pplToDisplay = empList.allEmps

  if (empList.filteredEmps.length > 0) {
    pplToDisplay = empList.filteredEmps
  } else if (empList.searchTerm.length > 0 && empList.filteredEmps.length == 0) {
    pplToDisplay = []
  }



  console.log('THIS IS OUR STATE', empList);
  return (

    <div>
      <Header/>
      <input type ="text" id="filter" name="fitler"onChange={handleTyping}></input>
      <label for="filter">Begin Typing to Filter</label>
      <table className="table">
  <thead>
    <tr>
      <th scope="col"> <button id="caret"onClick={handleSort}><i class="fa fa-fw fa-sort"></i></button>First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Image</th>
      <th scope="col">Email</th>
     
    </tr>
  </thead>
  <tbody>
  {pplToDisplay.map((oneEmp) => {
          return (
            <tr>
              <td>{oneEmp.name.first}</td>
              <td>{oneEmp.name.last}</td>
              <td><img src={oneEmp.picture.thumbnail} alt=""/></td>
              <td>{oneEmp.email}</td>
            </tr>

          )
        })}
  </tbody>
</table>
        {/* {pplToDisplay.map((oneEmp) => {
          return (
            <tr>
              <td>{oneEmp.name.first}</td>
              <td>{oneEmp.name.last}</td>
              <td><img src={oneEmp.picture.thumbnail} alt=""/></td>
              <td>{oneEmp.email}</td>
            </tr>

          )
        })}
      </table> */}

    </div>);

}

export default App;
