import React from 'react'
import Layout from "../components/layout"
import Link from "next/link"
import Head from "next/head"
import { useState } from 'react'
import search_ic from "../public/search_ic.png"
import trash from "../public/trash.png"
import Image from "next/image"
//import clientPromise from "../lib/mongodb";
//import { getServerSideProps } from './addNew'

export let prevInfo ={}
export default function ListOfStudents({studentCpE}) {
    //studentProp from getServerSideProps loads intial data
    const [student, setstudent] = useState(studentCpE);
    const [selectAll, setselectAll] = useState(false);
    
  //  Get API req, loads new data when edited or deletd
    async function GetData(){
        //what could be the problem with this function?
        let collectionName = "English"; //we will send this as req.query.collection 
        const res = await fetch (`http://localhost:3000/api/studentdb?collection=${collectionName}`, { 
            method:"GET"   
        });
        const data = await res.json()
        setstudent(data);
    }
    async function DeleteData(studentId){
        //will this code snippet work if I want to delete a certain user in the database?
        const collectionName = "English"
        const res = await fetch(`http://localhost:3000/api/studentdb?collection=${collectionName}&deleteAll=false`, {
            method: "DELETE"
          });
        const data = await res.json();
        
        window.alert(data.message);
        GetData();
    }
    async function DeleteAll(){
        const collectionName = "English";
        const deleteAll = window.confirm("Are you sure you want to DELETE all data? This cannot be undone.");
        console.log (deleteAll);
        if(deleteAll){
            const res = await fetch(`http://localhost:3000/api/studentdb?collection=${collectionName}&deleteAll=true`, {
            method: "DELETE"
          });
          
        const data = await res.json()
        
        window.alert(data.message)
        }
       
        GetData()
    }

    function getStud(stud){
        console.log("update")
        prevInfo = stud
    }
  
   
   

  return (
    <div className='bg-slate-200 '>
    <Layout >
        
        <Head><title>List of students</title></Head>
        <section className='bg-violet-400 w-full p-2  flex flex-row justify-between items-center rounded-md'>
            <p className='ml-4'>Subject Name</p>
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
    <div className='flex justify-center items-center flex-col bg-white mr-5 mt-5 w-full rounded-md shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
        

      
         <section className=' grid grid-cols-4 p-3  w-70  md:w-full'>
                <p className='p-1 md:p-3 w-1/2 col-span-2 font-bold'>Student Name</p>
                <p className=' p-1 md:p-3 w-1/2 col-span-1 font-bold'>Student Number</p>   
                <section className='items-center w-50 h-10 flex flex-row justify-around '>
                
                { selectAll? <button onClick={DeleteAll} className='bg-red-400 h-10 p-2 w-40 flex flex-row justify-around'> <Image src= {trash} alt = "trash" width={20} height = {20}></Image>Delete All?</button> : <p>Select All</p> }
                <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectAll}
                    onChange={()=>setselectAll(!selectAll)}
                />
                </section>      
            </section>
        
        { 
            student.map(stud=>(
                <section className=' grid grid-cols-4 p-3  w-70  md:w-full' key= {stud._id}>
                <p className='p-1 md:p-3 w-1/2 col-span-2'>{stud.name}</p>
                <p className=' p-1 md:p-3 w-1/2 col-span-1'>{stud.number}</p>
                <section className='flex flex-row  md:ml-2 md:col-span-1'>
                { /*studentInfo is an object that holds id, name and num, you should destructure it when passing*/}
                <Link href="./UpdateData"><button className='bg-yellow-400 ml-0 p-1 md:p-3 md:w-40  ml-2 hover:bg-yellow-700' onClick={()=>getStud(stud)}> Edit</button></Link>
                    <button className='bg-red-600  p-1 md:p-3 ml-0 md:w-40  ml-2 hover:bg-green-600' onClick = {()=>DeleteData(stud.id)}>Delete</button>
                </section>                
            </section> )
            )
        }
            
       
        
 
    </div>

   
    </Layout> </div>
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