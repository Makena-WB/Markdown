import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, 
initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null){
            if (typeof initialValue === "function") {
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))

    }, [key, value])

    return [value, setValue] as [T, typeof setValue]
}

//initialValue is a function that returns T and we call that function to get the initial value