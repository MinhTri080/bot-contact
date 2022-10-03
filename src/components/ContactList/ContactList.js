import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './../Spinner/Spinner';
import ContactService from './../../services/contactService';
import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';




function ContactList() {
    const [state, setState] = useState({
        loading: false,
        contacts: [],
        errorMessage: ''
    })

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let contactRes = await ContactService.getContacts();
                setState({
                    ...state,
                    contacts: contactRes.data,
                    loading: false
                })
            }
            getData();


            // fetch('https://63369f658aa85b7c5d2fde42.mockapi.io/bot')
            //     .then(res => res.json())
            //     .then(contactRes => {
            //         setState({
            //             ...state,
            //             contacts: contactRes,
            //             loading: false
            //         })
            //     })
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });

        }

    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (keyword) {
            setState({
                ...state,
                contacts: contacts.filter(contact => contact.name.toLowerCase().includes(keyword.toLowerCase()))
            })
        } else {          
            async function getData() {
                let contactRes = await ContactService.getContacts();
                setState({
                    ...state,
                    contacts: contactRes.data,
                    loading: false
                })
            }
            getData();
        }
    }


    const [keyword, setKeyword] = useState('')

    const handleRemoveContact = (contact) => {
        confirmAlert({
            title: 'Confirm to remove ' + contact.name,
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        try {
                            async function removeData() {
                                setState({ ...state, loading: true });
                                let deleteResult = await ContactService.deleteContact(contact.id);
                                let contactRes = await ContactService.getContacts();
                                // let destroyResult = await FileService.destroy(contact.photoUrl)
                                setState({
                                    ...state,
                                    contacts: contactRes.data
                                })
                                toast.success("Contact removed success.");
                            }
                            removeData();
                        } catch (error) {
                            toast.error(error.message);
                            setState({
                                ...state,
                                loading: false,
                                errorMessage: error.message
                            });
                        }
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }
    const { loading, contacts, errorMessage } = state;
    return (
        <>
            <section className='add-contact-area'>
                <div className='container'>
                    <div className='d-flex align-items-center '>
                        <h3 className='fw-boler'>Contact Manager</h3>
                        <Link className='btn btn-primary btn-sm ms-2 ' to={'/contact/add'}>
                            <i className='fa fa-plus me-2'></i>
                            New
                        </Link>
                    </div>
                    <div>
                        <p className='fst-italic'>Nostrud fugiat sint minim mollit eiusmod. Ipsum incididunt laborum cillum tempor amet. Excepteur pariatur laborum irure velit nulla ullamco consectetur. Labore excepteur deserunt laborum cillum ad labore cupidatat voluptate. Ullamco aliqua pariatur pariatur dolore tempor.</p>
                    </div>
                    <div className='d-flex w-25 my-2'>
                        <form onSubmit={handleSearch} className='d-fe'>
                            {/* <input type="search" className='form-control' onInput={(e) => setKeyword(e.target.value)} />
                        <button className='btn btn-outline-secondary btn-sm ms-2' onClick={handleSearch}>Search</button> */}
                            <input type="search" className='form-control' onInput={(e) => setKeyword(e.target.value)} />
                            <button className='btn btn-outline-secondary btn-sm ms-2' type='submit'>Search</button>
                        </form>
                    </div>
                </div>
            </section>
            <section>
                <div className='container'>
                    <div className='row'>
                        {
                            loading ? <Spinner /> : (
                                contacts.map(contact => (
                                    <div className='col-6 mb-4' key={contact.id}>
                                        <div className='card'>
                                            <div className='card-body'>
                                                <div className='row align-items-center'>
                                                    <div className='col-3'>
                                                        <img className='border border-4 rounded-circle image' src={contact.photoUrl} alt="" />
                                                    </div>
                                                    <div className='col-8 list-group'>
                                                        <ul className='list-group'>
                                                            <li className='list-group-item'>
                                                                Name: <span className='fw-bold'>{contact.name}</span>
                                                            </li>
                                                            <li className='list-group-item'>
                                                                Mobile: <span className='fw-bold'>{contact.mobile}</span>
                                                            </li>
                                                            <li className='list-group-item'>
                                                                Email: <span className='fw-bold'>{contact.email}</span>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                    <div className='col-1'>
                                                        <div className='d-flex flex-column align-items-center justify-content-between'>
                                                            <Link className='btn btn-warning'><i className='fa fa-eye'></i></Link>
                                                            <Link className='btn btn-primary my-1   '><i className='fa fa-edit'></i></Link>
                                                            <button className='btn btn-danger' onClick={() => handleRemoveContact(contact)}><i className='fa fa-trash'></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            )
                        }
                    </div>

                </div>
            </section>
        </>

    )
}

export default ContactList;