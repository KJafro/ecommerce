import React from 'react'
import { useState, useEffect, createContext } from 'react'
export const Context = createContext()
import jwtDecode from "jwt-decode";

export const Contexter = ({children}) => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
    const [store, setStore] = useState([])
    const [filtered, setFiltered] = useState(store)
    const [search, setSearch] = useState("")
    const [select, setSelect] = useState("des")
    const [text, setText] = useState("All Items")
    const [items, setItems] = useState(cartFromLocalStorage)
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false)
    const [disable, setDisable] = useState(false)
    const [profilePic, setProfilePic] = useState("https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")
    const [modal, setModal] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [id, setId] = useState(null)

   useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
        const decode = jwtDecode(token)
        setUser(decode.name)
        setId(decode.id)
    } else {
        null
    }
}, [])

    const filterCat = (cat) => {
        setFiltered(store.filter((items) => items.category == cat))
        setText(cat)
    }

    const addToCart = (title, price, image, size) => {
      if (items.length > 7) {
        setDisable(true)
      }  else {
        setDisable(false)
        setItems((prevState) => [...prevState, {title, price, image, size}])
      } 
  }

  const deleteItems = (itemName) => {
    setItems(items.filter((item) => item !== itemName))
}


// const users = JSON.parse(localStorage.getItem("user"));
const shipping = JSON.parse(localStorage.getItem("shipping"));

    const values = {
        store,
        setStore,
        filtered,
        setFiltered,
        search,
        setSearch,
        select,
        setSelect,
        text,
        setText,
        filterCat,
        items,
        addToCart,
        deleteItems,
        user,
        setUser,
        // users, 
        password,
        setPassword,
        shipping,
        alert,
        disable,
        setDisable,
        profilePic,
        setProfilePic,
        modal,
        setModal,
        reviewModal,
        setReviewModal,
        id,
        setId
    }


    
  return (
    <Context.Provider value={{values}}>{children}</Context.Provider>
  )
}
