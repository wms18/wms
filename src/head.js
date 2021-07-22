import weibo from "./img/weibo.png";
import qq from "./img/QQ.svg";
import tx from "./img/头像.svg";
import './font-awesome-4.7.0/css/font-awesome.css'
import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom'
import axios from "axios";
import {Link} from "react-router-dom";

function Head(props) {
    let [username, setUsername] = useState('')
    useEffect(() => {
        let el = document.getElementsByClassName('out_div')[0]
        let el1 = document.getElementsByClassName('out_div')[1]
        let el2 = document.getElementsByClassName('out_login')[0]
        if (window.localStorage.getItem('token')) {
            el.style.display = 'none'
            el1.style.display = 'none'
            el2.style.display = 'block'
            setUsername(window.localStorage.getItem('username'))
        } else {
            el.style.display = 'block'
            el1.style.display = 'block'
            el2.style.display = 'none'
        }
    })
    return (
        <div>
            <div className={'head'}>
                <div className={'head1'}>
                    <div className={'left'}>
                        <div className={'leftimg'}>
                            <div>
                                <img
                                    src="data:image/png;base64,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"
                                    alt=""/>
                            </div>
                            <div onClick={()=>{
                                props.history.push('/')
                            }}>学坝</div>

                        </div>
                        <div className={'leftimg1'}>
                            <div>
                                <img
                                    src="data:image/png;base64,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"
                                    alt=""/>
                            </div>
                            <div onClick={() => {
                                props.history.push("/")
                            }}>主页
                            </div>
                        </div>
                        <div className={'leftimg2'}>
                            <div>
                                <img
                                    src="data:image/png;base64,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"
                                    alt=""/>
                            </div>
                            <div>文档</div>
                        </div>
                    </div>
                    <div className={'right'}>
                        <div className={'logo'}>
                            <i className="head_qq fa fa-qq" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className={'out'}>
                        <div>
                            <Link to={'/index'}>
                                <div className={'out_login'} >{username}</div>
                            </Link>
                            <div className={'out_div'} onClick={() => {
                                props.history.push('/register')
                            }}>注册
                            </div>
                            <div className={'out_div'} onClick={() => {
                                props.history.push('/login')
                            }}>登录
                            </div>
                        </div>
                        <i className="head_ava fa fa-user-o" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Head)
