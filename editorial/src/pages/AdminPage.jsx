import React from 'react'
import Section from "../components/Section";
import Choise from "../components/Choise";
import LoginBar from '../components/LoginBar';

function AdminPage() {
  return (
    <div>
      <LoginBar/>
    <div className=" grid grid-cols-2 bg-slate-100 h-screen shadow-md   ">
      <Section title="Reviewer">
      <Choise href={"admin/addReviewr"}>Invite reviewr</Choise>

      <Choise href={"admin/deleteReviewr"}>delete Reviewr</Choise>

       </Section>

       <Section title="Editor">
       <Choise href={"admin/AddEditor"}>Invite editor</Choise>

       <Choise href={"admin/deleteEditor"}>delete Editor</Choise>

       </Section>
       <div >
       <Section  title="Author">
       <Choise href={"admin/deleteAuthor"}>Delete Author</Choise>
       </Section>
       </div>

    </div>
    
    </div>
  )
}

export default AdminPage