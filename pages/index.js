import Image from 'next/image'
import Layout, {siteTitle} from "../components/layout"
import Head from "next/head"
import headerClass from "../public/headerClass.png"
import classroom from "../public/classroom.png"
import plus from "../public/plus.png"
export let subjectName = "English"
let subjects = ["English", "EmergingTech"];
export default function Home() {
  
  const newSubj = ()=>{
    return(
      <div className='p-4'>
         <input type="text"/>
      </div>
    )
  }
  return ( 
      <div className= "bg-slate-200">
      <Head>
        <title>{siteTitle}</title>
        
      </Head>
      <div>
          <Image
           src={headerClass}
           style={{ width: '100%', height: 'auto' }} 
           alt="Welcome back to School"
           className='rounded-md'
          />
       </div>  
  
       <Layout> </Layout>

       <div className=' w-3/4 ml-20 pb-10 flex flex-col md:flex-row justify-around'>
        <Image
         src={classroom}
         style={{ width: '50%', height: 'auto' }} 
         alt="Welcome back to School"
         className='rounded-md'
        />
         
        <section className='w-2/5 '>
          <h1 className='text-center mb-2 bg-red-300 p-4 rounded-md'>Choose Class Subject</h1>
          <ul className='bg-white p-4 z-0 rounded-md shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
            {
              subjects.map(subj=> 
                <li className='text-slate-500 hover:text-slate-800 hover:font-bold' key={subj}>{subj}</li>
              )
            }
            <section className='relative flex justify-center bottom-[-30px]' onClick = {newSubj}>
          <Image
        src= {plus}
        width={40}
        height ={40}
        className='text-rose-400 '
       />
          </section>
          </ul>
          
         
        </section>
      

   
        
       </div>
      </div>
     
   
  )
  
}
