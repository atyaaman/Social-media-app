import React , {useState , useContext} from 'react'
import {UserContext} from '../../App'
import {Link , useNavigate} from 'react-router-dom'

import M from 'materialize-css';

const Signin = () => {
    const {state , dispatch} = useContext(UserContext); 
    const history = useNavigate()

    const [password , setPassword] = useState("")
    const [email , setEmail] = useState("")
    const PostData = ()=>{
       
       
        fetch("/signin",{

       
        method:"post",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
           
            password,
            email
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.error)
        {
            M.toast({html: data.error , classes:"#d32f2f red darken-2" });
        }
        else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
           return  M.toast({html: "Invalid Email" , classes:"#d32f2f red darken-2" });

        }
        else {
            localStorage.setItem("jwt" , data.token)
            localStorage.setItem("user" , JSON.stringify(data.user))
            dispatch({type:"USER" , payload:data.user})
            M.toast({html:"Sign in succesfully" , classes:"#1b5e20 green darken-3" })
            history('/codersHub')
        }
    })
    .catch(err=>{
        console.log(err);
    })

    }
    return (
        <div className='mycard'>
            <div className="card auth-card">
                <h2>Happy Place</h2>
                <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                 <button className="btn waves-effect waves-light"  
                  onClick={()=>PostData()}
                 >LOGIN
                 

                  </button>
                  <h5>
                    <Link to="/signup">Don't have any account ?</Link>
                  </h5>
            </div>
        </div>
    )
}

export default Signin