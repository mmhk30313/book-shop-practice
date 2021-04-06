import React, { useContext, useEffect, useState } from 'react';
import editIcon from '../../images/icons/editIcon.png';
import deleteIcon from '../../images/icons/deleteIcon.png';
import { UserContext } from '../../App';
import { CircularProgress } from '@material-ui/core';

const ManageBooks = () => {
    const [loggedInUser, setLoggedInUser, books, setBooks] = useContext(UserContext);
    // const [allBooks, setAllBooks] = useState([]);
    // console.log(allBooks);
    // useEffect(() =>{
    //     fetch('http://localhost:5000/allBooks')
    //     .then(res => res.json())
    //     .then(data => {
    //         setBooks(data);
    //     })
    // },[])
    const handleDeleteBook = (id) =>{
        fetch(`http://localhost:5000/delete/${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.deletedCount){
                fetch('http://localhost:5000/allBooks')
                .then(res => res.json())
                .then(data => {
                    setBooks(data);
                })
            }
        })
        .catch(err => console.log(err, loggedInUser, setLoggedInUser))
    }
    return (
        <>
           <h4 className="mt-5 ml-2">Manage Books</h4>
           
            <div className="input-form p-3">
                <div className="scrolling py-3 px-4 w-100 mx-auto my-3 card shadow bg-white table-responsive">
                    <div className="table">
                        <table className="table table-hover">
                            <thead className="bg-light rounded">
                                <tr>
                                    <th scope="col" colSpan="3" className="text-muted<span></span>span>">Book Name</th>
                                    <th scope="col" colSpan="2" className="text-center text-muted">Author Name</th>
                                    <th scope="col" className="text-center text-muted">Price</th>
                                    <th scope="col" className="text-center text-muted">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    books && books.map(book => <tr key={book._id}>
                                        <td colSpan="3">{book.bookName}</td>
                                        <td className='text-center' colSpan="2">{book.authorName}</td>
                                        <td className='text-center'>${book.bookPrice}</td>
                                        <td className='text-center'>
                                            <span style={{cursor: 'pointer'}}><img style={{height: '30px'}} className="mr-1" src={editIcon} alt=""/></span>
                                            <span onClick={() => handleDeleteBook(book._id)} style={{cursor: 'pointer'}}><img style={{height: '30px'}} src={deleteIcon} alt=""/></span>
                                        </td>
                                    </tr>)
                                }
                                    {/* Delete Button E handleDelete function diye data delete korte hobe... */}
                            </tbody>
                        </table>
                        {
                            books.length === 0 && <div className="text-center d-flex justify-content-center">
                            <CircularProgress color="primary" />
                        </div>
                        }
                    </div>
                </div>
            </div> 
        </>
    );
};

export default ManageBooks;