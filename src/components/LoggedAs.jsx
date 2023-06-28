import {useContext} from 'react'
import { Context } from '../context/Context'
import { CgProfile } from "react-icons/cg";
import '../components/components.css'

export default function LoggedAs() {
    const { values } = useContext(Context)
  return (
    <div className='loggedAsDiv'>
        <CgProfile size={20}/>
        <span>{values.user}</span>
    </div>
  )
}
