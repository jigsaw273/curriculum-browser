import React, { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import {data} from './data.js'
import {Table, Container} from 'react-bootstrap'

function App() {
  
  return (
    <>
      <div className='search-container'>
        <SearchBar 
          input={search} 
          setInput={setSearch} 
        />

        <Table>
          <thead>
            <tr>
              <th>faculty</th>
              <th>code</th>
              <th>name</th>
              <th>email</th>
              <th>professor</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.faculty+item.code}>
                <td>{item.faculty}</td>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.professor}</td>
              </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default App
