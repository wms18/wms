import {useEffect,useState} from 'react'
import {withRouter} from 'react-router-dom'
import qq1 from './img/qq1.svg';
import weibo1 from './img/weibo.svg'
import baidu from './img/baidu.svg'
import mao from  './img/mao.svg'
import axios from "axios";
import qs from 'qs'
function Login(props) {
    let [username,setUsername] = useState('')
    let [password,setPassword] = useState('')
    let handleClick = () =>{
        if(username === '' || password === ''){
            alert('请输入用户名或者密码')
            return
        }
        axios({
            method:'post',
            url:'http://xueba.it266.com:8081/api/token/create',
            data:qs.stringify({
                username:username,
                password:password,
            })
        }).then((response)=>{
            // console.log(response)
            if(response.data.code === "SUCCESS"){
                alert('登录成功')
                props.history.push('/')
                window.localStorage.setItem('username',username)
                window.localStorage.setItem('token',response.data.data.token)
            }else{
                alert(response.data.message)
            }
        }).catch((error)=>{
                alert(error)
            })
    }
    return (
        <div>
            <div className={'login'}>
                <div className={'login1'}>
                    <div className={'pwd'}>
                        <span className={'pwdlog'}>密码登录</span>
                        <span>邮箱登录</span>
                        <span>扫码登录</span>
                    </div>
                    <div className={'logname'}>
                        <input type="text" value={'用户名'} className={'logsp'} disabled/>
                        <input type="text" className={'loginp'} placeholder={'请输入您的用户名'} onChange={(e)=>{
                            setUsername(e.target.value)
                        }}/>
                        <span className={'iphone'}>使用第三方账号注册过的用户需先绑定手机/邮箱号</span>
                    </div>
                    <div className={'logname1'}>
                        <input type="text" value={'密码'} className={'logsp'} disabled/>
                        <input type="password" className={'loginp'} placeholder={'请输入6到16位的密码'} onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                        <span className={'iphone'}>如果您之前未设置过密码，请使用其他方式登陆后在账户中心设置密码</span>
                    </div>
                    <div className={'logbtn'}>
                        <button className={'btnlog'} onClick={handleClick}>提交</button>
                        <span>尚无账号？点击此处去注册</span>
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
    );
}

export default withRouter(Login)
