import { useRef } from 'react'
import CreateForm from './CreateForm'
import Togglable from './Togglabe'
import BlogList from './BlogList'

const Homepage = () => {

  const createFormRef = useRef()
  const createForm = () => (
    <Togglable buttonText="create blog" ref={createFormRef}>
      <CreateForm createFormRef={createFormRef}/>
    </Togglable>
  )
  return (
    <>
      {createForm()}
      <BlogList />
    </>
  )
}

export default Homepage