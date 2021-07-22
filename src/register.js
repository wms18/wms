import {useState} from 'react'
import qq1 from "./img/qq1.svg";
import weibo1 from "./img/weibo.svg";
import baidu from './img/baidu.svg'
import mao from "./img/mao.svg";
import {withRouter} from 'react-router-dom'
import axios from "axios";
import qs from 'qs'
function Register(props) {
    let [username,setUsername] = useState('')
    let [password,setPassword] = useState('')
    let [nc,setNc] = useState('')
    let [pwd,setPwd] = useState('')
    let btn = () =>{
        if(username === ''  || nc === '' ){
            alert('请输入用户名或昵称')
            return
        }
        if(password === '' || pwd === ''){
            alert('请重新输入密码')
            return
        }else{
            if(password !== pwd){
                alert('两次密码不一致')
                return;
            }
        }
        axios({
            method:'post',
            url: 'http://xueba.it266.com:8081/api/user/create',
            data:qs.stringify({
                nickname:nc,
                username:username,
                password:password,
            }),
        }).then((response)=>{
            // console.log(response.data)
            if(response.data.code === "SUCCESS"){
                alert('注册成功')
                let token = response.data.data.token
                window.localStorage.setItem('token',token)
                props.history.push('/login')
            }else {
                alert(response.data.message)
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    return(
        <div>
            <div className={'login'}>
                <div className={'login1'}>
                    <div className={'pwd'}>
                        <span className={'pwdlog'}>用户名注册</span>
                    </div>
                    <div className={'logname'}>
                        <input type="text" value={'用户名'} className={'logsp'} disabled/>
                        <input type="text" className={'loginp'} placeholder={'请输入您的用户名'} onChange={(e)=>{
                            setUsername(e.target.value)
                        }}/>
                    </div>
                    <div className={'logname1'}>
                        <input type="text" value={'昵称'} className={'logsp'} disabled/>
                        <input type="text" className={'loginp'} placeholder={'请输入您的昵称'} onChange={(e)=>{
                            setNc(e.target.value)
                        }}/>
                    </div>
                    <div className={'logname1'}>
                        <input type="text" value={'设置密码'} className={'logsp'} disabled/>
                        <input type="password" className={'loginp'} placeholder={'请输入6到16个字符'} onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                    </div>
                    <div className={'logname1'}>
                        <input type="text" value={'确认密码'} className={'logsp'} disabled/>
                        <input type="password" className={'loginp'} placeholder={'请再次输入您的密码'} onChange={(e)=>{
                            setPwd(e.target.value)
                        }}/>
                    </div>
                    <div className={'logbtn'}>
                        <button className={'btnlog'} onClick={btn}>提交</button>
                        <span className={'spnamelog'} onClick={()=>{
                            props.history.push('/login')
                        }}>已有账号？点击此处去登陆</span>
                    </div>
                    <div className={'sj'}>
                        <span>或者使用社交账号注册</span>
                        <img src={qq1} alt=""/>
                        <img src={weibo1} alt=""/>
                        <img src={baidu} alt=""/>
                        <img src={mao} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Register)
