import React , {useEffect , useState , useContext} from 'react'
import {UserContext} from '../../App'

const Profile = ()=>{
    const [mypics , setPics] = useState([]); 
    const {state , dispatch} = useContext(UserContext)
    const [image, setImage] = useState("")
   
    useEffect(()=>{
        fetch('/mypost' , {
            headers:{
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
            
        })
        
    } , [])
useEffect(()=>{
    if(image)
    {
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
          
           localStorage.setItem("user", JSON.stringify({...state,pic:data.url}))
           dispatch({type:"UPDATEPIC", payload:data.url})
           fetch('/updatepic',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                pic:data.url
            })
           }).then(res=>res.json())
           .then(result=>{
            console.log(result)  
            localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
            dispatch({type:"UPDATEPIC", payload:result.pic})
            window.location.reload()
        })
           
        })
        .catch(err=>{
            console.log("afaf" + err);
        })
    }
},[image])
const updatePhoto = (file)=>{
    setImage(file)
    
}
    return (
        <div style={{maxWidth:"70%" , margin:"0px auto"}}>
        <div style={{
             
                margin:"18px 0px",
                borderBottom:"2px solid grey"
            }}>

        
            <div style={{
                display:"flex",
                justifyContent:"space-around"
                
            }}>
                <div >
                    <img className="profile-image" style={{width:"160px" , height:"160px" , borderRadius:"80px"}}
                        src={state?state.pic:"loading"}
                    />
                   
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div style={{display:"flex" ,  justifyContent:"space-between" , width:"120%"}}>
                        <h6>{mypics.length} Posts</h6>
                        <h6> {state?state.follower.length : "loading"} followers </h6>
                        <h6>{state?state.following.length : "loading"} following </h6>
                    </div>
                </div>
            </div>
            
            <div className="file-field input-field" style={{margin: "10px 220px"}}>
                    <div className="btn">
                        <span>Update profile image</span>
                        <input type="file"
                            onChange={(e) => updatePhoto(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />

                    </div>

                </div>
             </div>
            <div className='gallery'>
                {
                  mypics.map((item=>{
                    return (
                        <img className='imggallery' key = {item._id} src= {item.image} alt = "my image" />
                    )
                  }))
            }
                
             </div>
        </div>
    )
}

export default Profile