import { useEffect, useState } from "react";

export default function useDarkMode(){
    const [isDark , setIsDark] = useState(()=>
    {
        const stored = localStorage.getItem("theme");
        // return true for dark mode and false for light mode 
        if(stored)
        {
            return stored === "dark"; // if false than it is dark mode 
        }
        else
        {
            // check what the user current window uses dark mode or light mode 
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
    })

    useEffect(()=>{
        const html = document.documentElement;
        if(isDark)
        {
            // add dark mode to all html element 
            html.classList.add("dark");
            localStorage.setItem("theme","dark");
        }
        else{
            html.classList.remove("dark");
            localStorage.setItem("theme","light");
        }
    },[isDark])

    return [isDark , setIsDark];
}