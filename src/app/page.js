"use client"
import Image from "next/image";
import Header from  './components/Header'
import MyTasks from './MyTasks';
import { useAuth } from "./context/AuthContext";
import Hero from './components/Hero'
import Head from "next/head";


export default function Home() {
  const {isAuthenticated,openCount,isModalOpen} = useAuth();
  console.log(isAuthenticated)
  return (
   <>
   <Header/>
   
   {
  isAuthenticated && openCount === 1 ? <MyTasks /> : !isModalOpen && <Hero/>
}

   </>
  );
}
