import { useState } from 'react'
import './App.css'
import Form from './components/form'
import {Button} from "@heroui/react";

function App() {

  return (
    <>
      <div className='p-6'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold mt-4 text-white'>İşçi Məlumatları</h1>
          <Button className='px-6 py-2 text-base bg-indigo-500 hover:bg-slate-500 rounded-lg'>
            Əlavə Et
          </Button>
        </div>
        <Form/>
      </div>
    </>
  )
}

export default App
