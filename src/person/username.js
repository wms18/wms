import React, {useState,useEffect} from 'react'
import axios from "axios";
import qs from 'qs'
function Name() {
    let [nickname,setNickname] = useState('') //改名
    let [avatar,setAvatar] =useState('')
    let [name,setName] =useState('')
    let [nick,setNick] = useState('')
    let [fileData, setFileData] = useState('')
    let [pwd,setPwd] = useState('')
    let [pwd2,setPwd2] = useState('')
    let [pwd3,setPwd3] =useState('')
    let usersp = document.getElementsByClassName('spda')
    useEffect(()=>{
        axios({
            method:'get',
            url:'http://xueba.it266.com:8081/api/user/whoami',
            params:{
                token:localStorage.getItem('token')
            }
        }).then((response)=>{
            // console.log(response)
            if (response.data.code === "SUCCESS"){
                setAvatar(response.data.data.avatar)
                setName(response.data.data.username)
                setNick(response.data.data.nickname)
            }
        }).catch((error)=>{
            alert(error)
        })
    },[fileData,nickname])
    //改昵称
    let handlenick = () =>{
        axios({
            method:'post',
            url:'http://xueba.it266.com:8081/api/user/update',
            params:{
                token:localStorage.getItem('token')
            },
            data:qs.stringify({
                nickname:nickname
            })
        }).then((response)=>{
            // console.log(response)
            if (response.data.code === "SUCCESS"){
                alert('更新成功')
                setNickname('')
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    let handle = () => {
        let el = document.getElementsByClassName('spda')[0]
        let elfile = document.getElementsByClassName('file')[0]
        if (elfile.style.display == 'block') {
            elfile.style.display = 'none'
        } else {
            elfile.style.display = 'block'
        }
    }
    //改头像
    let handleavatar = () =>{
        let formData = new FormData()
        formData.append('avatar',fileData)
        console.log(formData);
        if (fileData===''){
            alert('请选择图片')
        }
        axios({
            method:'post',
            url:'http://xueba.it266.com:8081/api/upload/avatar',
            params:{
                token:localStorage.getItem('token')
            },
            data: formData,
        }).then((response)=>{
            // console.log(response)
            if (response.data.code === "SUCCESS"){
                alert('上传成功')
                setFileData('')
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    return (
        <div className={'information'}>
            <div className={'infomationr'}>
                <div className={'usen'}>
                    <div>
                        <div className={'avater11'}>
                            <div className={'avater'}>
                                <span>头像</span>
                                <img src={avatar} alt=""/>
                            </div>
                            <span className={'spda'} onClick={handle}>＞</span>
                        </div>
                        <div className={'file'}>
                            <input type="file" accept={'image/*'} className={'inpfil'}  onChange={(e)=>{
                                setFileData(e.target.files[0])
                            }}/>
                            <input type="button" value={'上传'} className={'inpfile'} onClick={handleavatar}/>
                        </div>
                        <div className={'avater11'}>
                            <div className={'avater'}>
                                <span>用户名</span>
                                <span>{name}</span>
                            </div>
                        </div>
                        <div className={'avater11'}>
                            <div className={'avater'}>
                                <span>昵称</span>
                                <span>{nick}</span>
                            </div>
                            <span className={'spda'} onClick={()=>{
                                let spda1 = document.getElementsByClassName('spda')[1]
                                let file1 = document.getElementsByClassName('file')[1]
                                if(file1.style.display=='block'){
                                    file1.style.display = 'none'
                                } else {
                                    file1.style.display = 'block'
                                }
                            }}>＞</span>
                        </div>
                        <div className={'file'}>
                            <input type="text" placeholder={'请输入昵称'} value={nickname} className={'ncfile'} onChange={(e)=>{
                                nickname = e.target.value
                                setNickname(nickname)
                            }}/>
                            <input type="submit" className={'inpfile'} onClick={handlenick}/>
                        </div>
                        <div className={'avater11'}>
                            <div className={'avater'}>
                                <span>手机号</span>
                                <span>暂未绑定手机号</span>
                            </div>
                            <span className={'spda'} onClick={()=>{
                                let spda1 = document.getElementsByClassName('spda')[2]
                                let file2 = document.getElementsByClassName('file1')[0]
                                if(file2.style.display=='block'){
                                    file2.style.display = 'none'
                                } else {
                                    file2.style.display = 'block'
                                }
                            }}>＞</span>
                        </div>
                            <div className={'file1'}>
                                <div className={'iph'}>
                                    <input type="text" placeholder={'请输入您的手机号'} className={'ncfile'}/>
                                    <input type="submit" className={'inpfile'} value={'获取验证码'}/>
                                </div>
                                <div>
                                    <input type="text" placeholder={'请输入验证码'} className={'ncfile'}/>
                                    <input type="submit" className={'inpfile'}/>
                                </div>
                            </div>
                        <div className={'avater11'}>
                            <div className={'avater1'}>
                                <span>修改密码</span>
                            </div>
                            <span className={'spda'} onClick={()=>{
                                let spda3 = document.getElementsByClassName('spda')[3]
                                let file3 = document.getElementsByClassName('file')[2]
                                let ago = document.getElementsByClassName('ago')[0]
                                if (ago.style.display === 'block'){
                                    file3.style.display = 'none'
                                }else {
                                    if(file3.style.display=='block'){
                                        file3.style.display = 'none'
                                    } else {
                                        file3.style.display = 'block'
                                    }
                                }

                            }}>＞</span>
                        </div>
                        <div className={'file'}>
                            <input type="password" placeholder={'请输入原密码'} className={'ncfile'} onBlur={(e)=>{
                                setPwd(e.target.value)
                            }}/>
                            <input type="submit" className={'inpfile'} onClick={()=>{
                                if (pwd===''){
                                    alert('请输入原密码')
                                }
                                axios({
                                    method:'get',
                                    url:'http://xueba.it266.com:8081/api/user/pwd',
                                    params:{
                                        token:localStorage.getItem('token'),
                                        password:pwd,
                                    }
                                }).then((response)=>{
                                    console.log(response)
                                    if (response.data.code === 'SUCCESS'){
                                        alert('验证成功')
                                        document.getElementsByClassName('file')[2].style.display='none'
                                        document.getElementsByClassName('ago')[0].style.display='block'
                                    }else {
                                        alert(response.data.message)
                                        return
                                    }
                                }).catch((error)=>{
                                    alert(error)
                                })
                            }}/>
                        </div>
                        <div className={'ago'}>
                            <input type="password" placeholder={'请输入密码'} className={'ncfile'} onBlur={(e)=>{
                                setPwd2(e.target.value)
                            }}/>
                            <input type="password" placeholder={'请再次输入密码'} className={'ncfile'} onBlur={(e)=>{
                                setPwd3(e.target.value)
                            }}/>
                            <input type="button" value={'提交'} className={'inpfile'} onClick={()=>{
                                if (pwd2 === '' || pwd3 === ''){
                                    alert('请输入密码')
                                    return
                                }
                                if (pwd2 !== pwd3){
                                    alert('两次密码不一样')
                                    return;
                                }
                                axios({
                                    method:'post',
                                    url:'http://xueba.it266.com:8081/api/user/update',
                                    params:{
                                        token:localStorage.getItem('token')
                                    },
                                    data:qs.stringify({
                                        password:pwd3,
                                    })
                                }).then((response)=>{
                                    console.log(response)
                                    if (response.data.code === 'SUCCESS'){
                                        alert('密码更改成功')
                                        window.location.reload()
                                    }else {
                                        alert(response.data.message)
                                    }
                                })
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Name
