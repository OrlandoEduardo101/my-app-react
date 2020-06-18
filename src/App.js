import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
//import {useState, useEffect} from 'react';

function App() {
  let [name, setName] = useState("Vazio");
  let [bio, setBio] = useState("Vazio");
  let [location, setLocation] = useState("Vazio");
  let [company, setCompany] = useState("Vazio");
  let [search, setSearch]=useState('vazio');
  let [urlImg, setImg] = useState("Vazio");
  let [found, setFound] = useState(false);
  let [id, setId] = useState("Vazio");
  let [repos, setRepos] = useState([]);

  async function searchGit(){
     await axios.get(`https://api.github.com/users/${search}`).then((body)=>{
        console.log(body);
        setName(body.data.name);
        setBio(body.data.bio);
        setLocation(body.data.location);
        setCompany(body.data.company);
        setImg(body.data.avatar_url);
        setFound(true);
        setId(body.data.id);     
    }).catch((err)=>{
        console.log(err);
        setFound(false);
    });
  }

  useEffect(()=> {
      if(found == true){
        axios.get(`https://api.github.com/users/${search}/repos`).then((body)=>{
            console.log(body);
            setRepos(body.data);
        }).catch((err)=>{
            console.log(err);
        });
      }else{
        setRepos([]);
      }
  }, [id]);

  return (
    <div>
      <div className="SearchBar">
        <input type="text" value={search} onChange={(e)=>{
          setSearch(e.target.value)}}/>
        <button onClick={searchGit}>Search</button>
      </div>
      <div className="Profile">
        <div className = "container"><img src={urlImg}></img></div>
        <div className = "container">
        <div>Name:{" "+name}</div>
        {company==null ? (<div>Bio:{" not found"}</div>) : <div>Bio:{" "+bio}</div> }
        {company==null ? (<div>Location:{" not found"}</div>) : <div>Location:{" "+location}</div> }
        {company==null ? (<div>Company:{" not found"}</div>) : <div>Company:{" "+company}</div> }
      </div>
      </div>
      <div className="Repo">
        <ul>
          {
            repos.map((element)=>(
              <li key={element.id}>
                <h5>Name: {element.name}</h5>
                <h5>Full Name: {element.full_name}</h5>
                <h5>Description: {element.description}</h5>
                <h5>Stars: {element.stargazers_count}</h5>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
