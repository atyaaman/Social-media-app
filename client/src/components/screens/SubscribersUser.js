import React, {useState , useEffect, useContext} from 'react'
import {UserContext} from '../../App' 

const CodersHub = ()=>{
    const [data , setData] = useState([])
    const {state , dispatch} = useContext(UserContext)
    useEffect(()=>{
            fetch('/myFollowingPost' , {
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                setData(result.posts)
            })
    } , [])


    const likePost = (id)=>{
        fetch('/like' , {
            method: "put",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            } , 
            body:JSON.stringify({
                postId:id
            })

        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id)
                {
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
         })
    }
    const unlikePost = (id)=>{
        fetch('/unlike' , {
            method: "put",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            } , 
            body:JSON.stringify({
                postId:id
            })

        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id)
                {
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
         })
         .catch(err=>{
            console.log(err);
         })
    }
    const makeComment = (text , postId)=>{
        fetch('/comment' , {
            method:"put",
            headers:{
                "Content-type" : "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId , 
                text
            })

        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id)
                {
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
         })
         .catch(err=>{
            console.log(err);
         })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}` , {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }

        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="HUB">
            {
                data.map((item=>{
                    return(
                        <div className='card home-card' key = {item._id}>
                        <h5 style={{padding:"5px"}}>
                         {item.postedBy.name} {item.postedBy._id === state._id
                         &&   <i className='material-icons  red-text text-darken-2' style={{float:"right"}}
                         onClick = {()=>deletePost(item._id)}>
                         delete
                         </i>
                         }
                        
                        </h5>
                        <div className='card-image codersimg'>
                            <img src= {item.image} />
                        </div>
                        <div className='card-content'>
                            {item.likes.includes(state._id)
                            ?  <i className='material-icons  red-text text-darken-2'
                            onClick={()=>{unlikePost(item._id)}}
                            >favorite</i>
                            :   <i className='material-icons'
                            onClick={()=>{likePost(item._id)}}
                            >favorite_border</i>   
                            }
                      
                       
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(record=>{
                                    return (
                                        <h6><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{":- " + record.text}</h6>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value , item._id)
                            }}>
                            <input type="text" placeholder="Add comment" />
                            </form>
                        </div>
                        </div>
                    )
                }))
            }
          
            
        </div>
    )
}

export default CodersHub