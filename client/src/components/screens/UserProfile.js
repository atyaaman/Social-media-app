import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
const Profile = () => {
    const [userProfile, setProfile] = useState(null);
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    const [showfollow, setShowFollow] = useState(state?!state.following.includes(userid):true);
    
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {  
                setProfile(result)
            })
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
               
                followId: userid
                
            })
            
        }).then(res => res.json())
            .then(data => {
                
                dispatch({ type: "UPDATE", payload: { following: data.following, follower: data.follower } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            follower: [...prevState.user.follower, data._id]
                        }
                    }
                })
                setShowFollow(false)
            })
    }


    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followrs: data.follower } })
                localStorage.setItem("user", JSON.stringify(data))
             
                setProfile((prevState) => {
                    const newFollower = prevState.user.follower.filter(item=>item !== data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            follower: newFollower
                        }
                    }
                })
                setShowFollow(true)
                
            })
           
    }


    return (
        <>
            <>
                
            </>
            {userProfile ?

                <div style={{ maxWidth: "70%", margin: "0px auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom: "2px solid grey"
                    }}>
                        <div >
                            
                            <img className="profile-image" style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                src={userProfile.user.pic}
                                
                            />
                            
                        </div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h6>{userProfile.user.email}</h6>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "120%" }}>
                                <h6>{userProfile.posts.length} Posts</h6>
                                <h6>{userProfile.user.follower.length} followers</h6>
                                <h6> {userProfile.user.following.length} following </h6>

                            </div>
                            {showfollow ?
                                <button style={{
                                    margin:"10px"
                                }} className="btn waves-effect waves-light"
                                    onClick={() => followUser()}
                                >Follow


                                </button>
                                :
                                
                                <button style={{
                                    margin:"10px"
                                }} className="btn waves-effect waves-light"
                                    onClick={() => unfollowUser()}
                                >UnFollow


                                </button>
                            }





                        </div>
                    </div>
                    <div className='gallery'>
                        {
                            userProfile.posts.map((item => {
                                return (
                                    <img className='imggallery' key={item._id} src={item.image} alt="my image" />
                                )
                            }))
                        }

                    </div>
                </div>

                :
                <h1>Loading ...</h1>
            }

        </>
    )

}

export default Profile