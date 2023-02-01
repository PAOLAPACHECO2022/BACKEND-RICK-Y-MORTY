import React from 'react';




export default function Footer() {
  return (

   
    <footer 

    className=" bg-dark landing-inner text-center text-bg-light mt-5 " display="flex" justifyContent="between" >
      Copyright &copy; {new Date().getFullYear()} Rick & Morty
    </footer>
  );
}
