import React from 'react'
import logouser from "../600px-User_icon_3.svg.png";

const Meprofile=({isAuth,profile,onclicks,editMode})=>{
    return(
        <div style={{
            border: '2px dotted #fff',
            width: '400px',
            hight: '200px',
            margin: '20px',
        }}>
            {
                isAuth.data.isAuth &&
                profile ?
                    <div style={{display: "flex"}}>
                        <div style={{margin: "10px"}}>
                            <img style={{width: '100px'}} src={profile.photos.small || logouser} alt=""/>
                        </div>

                        <div>
                            <span style={{fontSize: "25px"}}>Профиль</span><span style={{
                                margin:'0 10px'
                        }}>
                             {profile.userId === isAuth.data.id &&
                             <button onClick={()=>editMode()}>Edit</button>
                             }
                        </span>

                            <div style={{margin:'10px 0'}}><b>Full name:</b> {profile.fullName}</div>
                            <div style={{margin:'10px 0'}}><b>You id:</b> {profile.userId}</div>
                            <div style={{margin:'10px 0'}}><b>Find jobs:</b> {profile.lookingForAJob ? 'Yes' : 'No'}</div>
                            <div style={{margin:'10px 0'}}><b>About for me:</b> {profile.aboutMe}</div>
                            {Object.keys(profile.contacts).map(i=>{
                                return <div style={{margin:'10px 0'}}><b>{i}:{profile.contacts[i]}</b></div>
                            })}
                            {profile.userId === isAuth.data.id &&
                            <input type="file" id={'inputFile'} onChange={onclicks} />
                            }
                        </div>
                    </div>
                    : <span>Нужна реестрация для просмотра профиля...</span>
            }
        </div>
    )
}
export default Meprofile