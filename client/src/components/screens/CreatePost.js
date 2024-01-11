import React , {useState , useEffect} from 'react'
import M from 'materialize-css'
import  { useNavigate} from 'react-router-dom'





const CreatePost = () => {
    const history = useNavigate()
    const [title , setTitle] = useState("");
    const [image , setImage] = useState("");
    const [body , setBody] = useState("");
    const[url , setUrl] = useState(""); 

    useEffect(()=>{
        
                
        fetch("/createpost",{

          
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data.error);
        console.log("url = " + url)
            if(data.error)
            {
                M.toast({html: data.error , classes:"#d32f2f red darken-2" });
                
            }
            else {
                M.toast({html:"Upload succesfully" , classes:"#1b5e20 green darken-3" })
                history('/codersHub')
            }
        })
        .catch(err=>{
            console.log("error hiaey efasfasfa")
            console.log(err);
        })
        
    } , [url])
    const postDetails = ()=>{
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
  
    return (
        <div className='card input-filed create-post-class'>
            <h1><strong>Create Post</strong></h1>
            <input type="text" placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" placeholder="body" 
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload image</span>
                    <input type="file"
                    onChange = {(e)=>setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                
                </div>
                
                </div>
                <button className="btn waves-effect waves-light"  
                  onClick={()=>postDetails()}
                 >Create-Post
                 

                  </button>
           </div>
    )}



export default CreatePost