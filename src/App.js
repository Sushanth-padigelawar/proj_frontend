// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import Swal from 'sweetalert2'

// const App = () => {
//   const [students, setStudents] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
  

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const [selectedStudents, setSelectedStudents] = useState([]);

//   const handleCheckboxChange = (id) => {
//     if (selectedStudents.includes(id)) {
//       setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id));
//     } else {
//       setSelectedStudents([...selectedStudents, id]);
//     }
//   };

//   const handleInputChange = (e, id, field) => {
//     const updatedStudents = students.map((student) => {
//       if (student._id === id) {
//         return {
//           ...student,
//           [field]: e.target.value,
//         };
//       }
//       return student;
//     });
//     setStudents(updatedStudents);
//   };


//   const fetchStudents = () => {
//     const temp = document.getElementById('id1').value;
//     axios.get('http://localhost:5000/students',{
//       params:{
//         page:(temp)?temp:1,
//         maxrec:3
//       }
//     })
//       .then((response) => {
//         setStudents(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const addStudent = () => {
//     axios.post('http://localhost:5000/students', { name, email, mobile })
//       .then((response) => {
//         console.log(response.data);
//         fetchStudents();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // const updateStudent = (id) => {
//   //   axios.put(`http://localhost:5000/students/${id}`, { name, email, mobile })
//   //     .then((response) => {
//   //       console.log(response.data);
//   //       fetchStudents();
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // };
//   const updateStudent = () => {
//     selectedStudents.forEach((id) => {
//       const studentToUpdate = students.find((student) => student._id === id);
  
//       if (!studentToUpdate) {
//         return;
//       }
//       if(!studentToUpdate.name||!studentToUpdate.email||!studentToUpdate.mobile) {
//         fetchStudents()
//         Swal.fire('Update Failed','','error');
//         return;
//       }
//       else{
//         axios
//         .put(`http://localhost:5000/students/${id}`, {
//           name: studentToUpdate.name,
//           email: studentToUpdate.email,
//           mobile: studentToUpdate.mobile,
//         })
//         .then((response) => {
//           console.log(response.data);
//           fetchStudents();
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//         Swal.fire('Update Successful','','success');
//       }
//     });
//     setSelectedStudents([]);
//   };
  
  

//   const deleteStudent = (id) => {
//     // eslint-disable-next-line no-restricted-globals
//     var result = confirm("Are you sure to delete this row??");
//     if(result){
//       axios.delete(`http://localhost:5000/students/${id}`)
//       .then((response) => {
//         console.log(response.data);
//         fetchStudents();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//       Swal.fire({imageUrl:"https://cdn.dribbble.com/users/616823/screenshots/2362844/checkbox.gif",imageHeight:100,title:"Deleted Successfully"});
//     }
//   };

//   const increment = ()=>{
//     var x = document.getElementById("id1");
//     x.value = Number(x.value)+1;
//     fetchStudents();
//   }

//   const decrement = ()=>{
//     var x = document.getElementById("id1");
//     if(x.value-1===0){
//       x.value = 1;
//     }
//     else{
//       x.value = Number(x.value)-1;
//     }
//     fetchStudents();
//   }
  
//   return (
//     <div className='container'>
//       <h1>Student CRUD Operations</h1>
//       <div className='card'>
//         <h2>Add Student</h2>
//         <form onSubmit={addStudent}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <br></br>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <br></br>
//           <input
//             type="number"
//             placeholder="Mobile"
//             max={9999999999}
//             min={1111111111}
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           /><br></br>
//           <button className='btn btn-add' type="submit">Add</button>
//         </form>
//       </div>

//       <h2>Student List</h2>
//       <div className='tableContainer'>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Checkbox</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student._id} >
//                 <td>
//                   <input
//                     type="text"
//                     value={student.name}
//                     onChange={(e) => handleInputChange(e, student._id, 'name')}
//                     name='name'
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={student.email}
//                     onChange={(e) => handleInputChange(e, student._id, 'email')}
//                     name='email'
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={student.mobile}
//                     onChange={(e) => handleInputChange(e, student._id, 'mobile')}
//                     name='mobile'
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedStudents.includes(student._id)}
//                     onChange={() => handleCheckboxChange(student._id)}
//                   />
//                 </td>
//                 <td>
//                   <button className='btn btn-delete' onClick={() => deleteStudent(student._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <br></br>
//       <p><button onClick={decrement}>⬅️</button><input id="id1" min={1}/><button onClick={increment}>➡️</button>
//       {/* <button className='btn btn-fetch' onClick={fetchStudents}>Fetch</button> */}
//       <button className='btn btn-update' onClick={() => updateStudent(students._id)}>Update</button></p>
//     </div>
//   );
// };


// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Swal from 'sweetalert2'

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleInputChange = (e, id, field) => {
    const updatedStudents = students.map((student) => {
      if (student._id === id) {
        return {
          ...student,
          [field]: e.target.value,
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const fetchStudents = () => {
    const temp = document.getElementById('id1').value;
    axios.get('http://localhost:5000/students', {
      params: {
        page: (temp) ? temp : 1,
        maxrec: 3
      }
    })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addStudent = () => {
    axios.post('http://localhost:5000/students', { name, email, mobile })
      .then((response) => {
        console.log(response.data);
        fetchStudents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateMobile = (mobile) => {
    // Regular expression for mobile number validation
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const updateStudent = () => {
    selectedStudents.forEach((id) => {
      const studentToUpdate = students.find((student) => student._id === id);
  
      if (!studentToUpdate) {
        return;
      }
  
      if (!studentToUpdate.name || !studentToUpdate.email || !studentToUpdate.mobile) {
        fetchStudents();
        Swal.fire('Update Failed', '', 'error');
        return;
      }
  
      const isEmailValid = validateEmail(studentToUpdate.email);
      const isMobileValid = validateMobile(studentToUpdate.mobile);
  
      if (!isEmailValid || !isMobileValid) {
        fetchStudents();
        Swal.fire('Update Failed', 'Please enter a valid email and mobile number', 'error');
        return;
      }
  
      axios
        .put(`http://localhost:5000/students/${id}`, {
          name: studentToUpdate.name,
          email: studentToUpdate.email,
          mobile: studentToUpdate.mobile,
        })
        .then((response) => {
          console.log(response.data);
          fetchStudents();
        })
        .catch((error) => {
          console.log(error);
        });
      Swal.fire('Update Successful', '', 'success');
    });
  
    setSelectedStudents([]);
  };
  // const updateStudent = () => {
  //   selectedStudents.forEach((id) => {
  //     const studentToUpdate = students.find((student) => student._id === id);

  //     if (!studentToUpdate) {
  //       return;
  //     }
  //     if (!studentToUpdate.name || !studentToUpdate.email || !studentToUpdate.mobile) {
  //       fetchStudents()
  //       Swal.fire('Update Failed', '', 'error');
  //       return;
  //     } else {
  //       axios
  //         .put(`http://localhost:5000/students/${id}`, {
  //           name: studentToUpdate.name,
  //           email: studentToUpdate.email,
  //           mobile: studentToUpdate.mobile,
  //         })
  //         .then((response) => {
  //           console.log(response.data);
  //           fetchStudents();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //       Swal.fire('Update Successful', '', 'success');
  //     }
  //   });
  //   setSelectedStudents([]);
  // };

  const deleteStudent = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Are you sure to delete this row??");
    if (result) {
      axios.delete(`http://localhost:5000/students/${id}`)
        .then((response) => {
          console.log(response.data);
          fetchStudents();
        })
        .catch((error) => {
          console.log(error);
        });
      Swal.fire({ imageUrl: "https://cdn.dribbble.com/users/616823/screenshots/2362844/checkbox.gif", imageHeight: 100, title: "Deleted Successfully" });
    }
  };

  const increment = () => {
    var x = document.getElementById("id1");
    x.value = Number(x.value) + 1;
    fetchStudents();
  }

  const decrement = () => {
    var x = document.getElementById("id1");
    if (x.value - 1 === 0) {
      x.value = 1;
    }
    else {
      x.value = Number(x.value) - 1;
    }
    fetchStudents();
  }

  return (
    <div className='container'>
      <h1>Student CRUD Operations</h1>
      <div className='card'>
        <h2>Add Student</h2>
        <form onSubmit={addStudent}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br></br>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br></br>
          <input
            type="number"
            placeholder="Mobile"
            max={9999999999}
            min={1111111111}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          /><br></br>
          <button className='btn btn-add' type="submit">Add</button>
        </form>
      </div>

      <h2>Student List</h2>
      <div className="tableContainer">
        {students.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Checkbox</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => handleInputChange(e, student._id, 'name')}
                      name="name"
                      disabled={!selectedStudents.includes(student._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={student.email}
                      onChange={(e) => handleInputChange(e, student._id, 'email')}
                      name="email"
                      disabled={!selectedStudents.includes(student._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={student.mobile}
                      onChange={(e) => handleInputChange(e, student._id, 'mobile')}
                      name="mobile"
                      disabled={!selectedStudents.includes(student._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student._id)}
                      onChange={() => handleCheckboxChange(student._id)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-delete" onClick={() => deleteStudent(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Checkbox</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody><p>No data</p></tbody>
          </table>
          </div>
        )}
      </div>
      {/* <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Checkbox</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => handleInputChange(e, student._id, 'name')}
                    name='name'
                    disabled={!selectedStudents.includes(student._id)} // Disable the input if the checkbox is not checked
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={student.email}
                    onChange={(e) => handleInputChange(e, student._id, 'email')}
                    name='email'
                    disabled={!selectedStudents.includes(student._id)} // Disable the input if the checkbox is not checked
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={student.mobile}
                    onChange={(e) => handleInputChange(e, student._id, 'mobile')}
                    name='mobile'
                    disabled={!selectedStudents.includes(student._id)} // Disable the input if the checkbox is not checked
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => handleCheckboxChange(student._id)}
                  />
                </td>
                <td>
                  <button className='btn btn-delete' onClick={() => deleteStudent(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <br></br>
      <p>
        <button onClick={decrement}>⬅️</button>
        <input id="id1" min={1} defaultValue={1}/>
        <button onClick={increment}>➡️</button>
        <button className='btn btn-update' onClick={() => updateStudent(students._id)}>Update</button>
      </p>
    </div>
  );
};

export default App;
