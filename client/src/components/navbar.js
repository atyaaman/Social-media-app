import React, { useContext } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { UserContext } from '../App'
const Navbar = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(UserContext)
  const renderList = () => {
    if (state) {
      return [
        <Link to="/codersHub" className=" brand-logo center Hub">Happy Place</Link>,

        <li><a href="/">Home</a></li>,

        <li><Link to="/CreatePost">Create-Post</Link></li>,
        <li><Link to="/chatBot">chat-Bot</Link></li>,
        <li><Link to="/profile">profile</Link></li>,
        <li><Link to="/myFollowingPost">My Following post</Link></li>,
        <button  className="btn waves-effect waves-light #b71c1c red darken-4"
          onClick={() => {
            localStorage.clear()
            dispatch({ type: "CLEAR" })
            history('/signin')
          }}>LOGOUT
        </button>

      ]
    }
    else {
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper mycolor navbarColor">
        <a href="#" className="brand-logo left"></a>

        <ul id="nav-mobile" className="right hide-on-med-and-down">

          {renderList()}

        </ul>
      </div>
    </nav>
  )
}


export default Navbar