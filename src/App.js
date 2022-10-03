import {Routes,Route} from 'react-router-dom';
import './App.css';
import { React } from 'react';
import Navbar from './components/Navbar/Navbar';
import ContactList from './components/ContactList/ContactList';
import AddContact from './components/AddContact/AddContact';
import EditContact from './components/EditContact/EditContact';
import ViewContact from './components/ViewContact/ViewContact';
// import Spinner from './components/Spinner/Spinner';


function App() {
  return (
 <> 
 <Navbar/>
 
 <Routes>
  <Route path='/bot-contact' element={<ContactList/>}/>
  <Route path='/bot-contact/contact/list' element={<ContactList/>}/>
  <Route path='/bot-contact/contact/add' element={<AddContact/>}/>
  <Route path='/bot-contact/contact/edit' element={<EditContact/>}/>
  <Route path='/bot-contact/contact/view' element={<ViewContact/>}/>
 </Routes>
 </>
  );
}

export default App;
