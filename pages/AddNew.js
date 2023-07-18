import React from 'react'
import Layout from "../components/layout"
import Head from "next/head"
import { useState,  } from 'react'
import search_ic from "../public/search_ic.png"
import Image from "next/image"


export default function AddNew({studentCpE}) {
  const [studInfo, setstudInfo] = useState({name:" ", num: 0}); //inputs
  const [student, setstudent] = useState(studentCpE); //studentList from server-json
  let collectionName = "English"; 
  //loads new set of data
  async function GetData(){
    let collectionName = "English"; //we will send this as req.query.collection 
    const res = await fetch (`http://localhost:3000/api/studentdb?collection=${collectionName}`, { 
        method:"GET"   
    });
    const data = res.json()
    setstudent(data);
}

  function setName(e){
    setstudInfo(prev=>({
      ...prev,
      name: e.target.value,
    }))
  }
  function setNum(e){
    setstudInfo(prev=>({
      ...prev,
      num: e.target.value,
    }))
  }
  function setCollection(e){
    collectionName = e.target.value;
    window.alert(collectionName);
  }
   

  async function newData(e){
    e.preventDefault();
    let item = { 
    name: studInfo.name, 
    number: studInfo.num,
  }

      const res = await fetch(`http://localhost:3000/api/studentdb?collection=${collectionName}`, {
        method: "POST",
        headers: {'Content-Type':"application/json"},
        body: JSON.stringify(item)
      })
      const data = await res.json();
       window.alert(data.message) ;
       clear(); //clear input box
       GetData();
  }
    


  function clear(){
    const name = document.getElementById("student_name")
    const number = document.getElementById("student_num")

    name.value = " "
    number.value = 0;
  }

  return (
    <Layout>
        <Head><title>Add New</title></Head>
        <section className='bg-violet-400 w-full p-2  flex flex-row justify-between items-center rounded-md'>
            <p className='ml-4'>Please fill-up the form  below</p>
            <section className='w-1/4 flex flex-row justify-around '>
            <input
                type="text"
                className='p-1 w-3/4 rounded-md border border-slate-700 focus:outline-red-400'
            />
            <section className='w-10 h-10 pt-2'>
            <Image
              src= {search_ic}
              
            /></section>
             </section>
        </section>
        <form action ="/AddNew" method = "POST" className=' flex flex-col'>
        
           <fieldset className='flex flex-row my-2'>
           <label  className='font-semibold py-2 px-3 w-60 '>Please enter name: </label>
            <input type = "text"
                name = "name"
                id = "student_name"
                value= {studInfo.name}
                onChange = {setName}
                className=' w-1/4 appearance-none focus:drop-shadow-xl border-2 border-slate-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-30'
            />
            </fieldset>
            <fieldset  className='flex flex-row my-2'>
             <label  className='font-semibold py-2 px-3 w-60 ' >Please enter number: </label>
             <input type ="number"
                name = "number"
                id = "student_num"
                value={studInfo.num}
                onChange = {setNum}
                className='w-1/4 appearance-none focus:drop-shadow-xl border-2 border-slate-300 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-30'
                required
               min="10"
                maxLength="20"
            />
            </fieldset>
            <fieldset  className='flex flex-row my-2'>
             <label  className='font-semibold py-2 px-3 md:w-60 ' >Choose Subject: </label>
             <select name="subjects" onChange ={ setCollection }  className='rounded-md border border-2 border-slate-300 p-2'>
                <option value="English">English for daily use</option>
                <option value="EmergingTech">Emerging Technologies</option>
              </select>
            </fieldset>
            <fieldset className='flex flex-row px-3 py-2'>
                <button  onClick= {newData} type ="submit" value="submit" className='mr-2 py-2 px-3 drop-shadow-md border border-solid border-slate-400 rounded w-30  bg-none  hover:bg-red-500'>Submit</button>
               
            <button type="reset" onClick = {clear} value="clear" className='mr-2 py-2 px-3 drop-shadow-md border border-solid border-slate-400 rounded w-30  bg-none  hover:bg-green-500' >Clear</button>
            </fieldset>

          
        </form>
    </Layout>
  )
  }

  export async function getServerSideProps(){
    let collectionName = "English"; //we will send this as req.query.collection 
    const res = await fetch (`http://localhost:3000/api/studentdb?collection=${collectionName}`, { 
        method:"GET"   
    });
    //       
    const data = await res.json();
    //we need to stringify the data from json
    return {
        props: { studentCpE: data }
    };

}