import React, { useState , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css';
const Signup = () => {


    const history = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(()=>{

        if(url)
        {
            uploadFields()
        }
    } , [url])
    const uploadPic = ()=>{
        const data = new FormData();
        data.append("file" , image);
        data.append("upload_preset" , "CodeBuddy");
        data.append("cloud_name" , "dl162qeyp");
        fetch("https://api.cloudinary.com/v1_1/dl162qeyp/image/upload" , {
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url);
        })
        .catch(err=>{
            console.log("afaf" + err);
        })
  
    }
    const uploadFields = ()=>{
        fetch("/signup", {


            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
                }
                else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                    return M.toast({ html: "Invalid Email", classes: "#d32f2f red darken-2" });

                }
                else {
                    M.toast({ html: data.message, classes: "#1b5e20 green darken-3" })
                    history('/signin')
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    const PostData = () => {
        if(image)
        {
            uploadPic()
        } else {
            uploadFields()
        }


    }
    return (
        <div className='mycard'>
            <div className="card auth-card">
                <h2>Happy Place</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload profile image</span>
                        <input type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />

                    </div>

                </div>
                <button className="btn waves-effect waves-light"
                    onClick={() => PostData()}
                >Signup
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup