import React from 'react'
import { Link } from 'react-router-dom'
import {PiBookOpenTextLight} from 'react-icons/pi'
import {BiUserCircle} from 'react-icons/bi'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import BookSingleCart from './BookSingleCart'

const BooksCard = ({books}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' >
        {books.map((item)=>(
           <BookSingleCart key={item._id} book={item}/>
    ))}
    </div>
  )
}

export default BooksCard