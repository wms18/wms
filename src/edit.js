import eye from "./img/眼睛.svg";
import information from "./img/信息.svg";
import './font-awesome-4.7.0/css/font-awesome.css'
import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import qs from 'qs'
function Edit(props) {
    let [avatar, setAvatar] = useState('') //获取头像
    let [title, setTitle] = useState('') //获取标题
    let [reply, setReply] = useState('') //获取评论数
    let [view, setView] = useState('') //获取观看数
    let [nickname, setNickname] = useState('') //昵称
    let [create, setCreate] = useState('') //时间
    let [content, setContent] = useState('') //内容
    let [good, setGood] = useState(0) //点赞
    let [tag,setTag] = useState([])
    let [goodstate, setGoodstate] = useState('') //点赞状态
    let id = props.match.params.id //获取id
    let [favorite, setFavorite] = useState(0) //收藏
    let [favoritestate, setFavoritestate] = useState('') //收藏状态
    let [replys, setReplys] = useState('')  //回复
    let [limit, setLimit] = useState(5) //每页条数
    let [page, setPage] = useState(1)  //当前页
    let [pagelist, setPagelist] = useState([]) //评论列表
    let [pagetotal, setPagetotal] = useState('')//评论总数
    let [active, setActive] = useState(1)
    let [titlecount, setTitlecount] = useState('') //评论点赞数
    let token = window.localStorage.getItem('token')
    let [username, setUsername] = useState('') //用户名
    let [user, setUser] = useState('') //评论用户名
    let [likecount, setLikecount] = useState('')
    let [edittitle, setEdittitle] = useState('') //相关标签
    let [detailtitle, setDetailidtitle] = useState('')  //回复帖子id
    let [detailview, setDetailview] = useState('')
    let [parentId,setParentId] = useState('')
    let [nameid,setNameid] = useState('')
    let pages
    //当前页
    let showpage = () => {
        let arrsp = []
        pages = Math.ceil(pagetotal / limit)
        for (let i = 1; i <= pages; i++) {
            arrsp.push(<span className={page === i ? 'sp11 sp1' : "sp1"} key={i} onClick={() => {
                setPage(i)
            }}>{i}</span>)
        }
        return arrsp
    }
    useEffect(() => {
        if (Number(page) === 1) {
            let sp12 = document.getElementsByClassName('sp12')[0]
            sp12.classList.add('sp13')
        } else {
            let sp12 = document.getElementsByClassName('sp12')[0]
            sp12.classList.remove('sp13')
        }
        if (Number(page) === pages) {
            let sp12 = document.getElementsByClassName('sp12')[1]
            sp12.classList.add('sp13')
        } else {
            let sp12 = document.getElementsByClassName('sp12')[1]
            sp12.classList.remove('sp13')
        }
        handledetail()
        handlelist()
    }, [id])
    useEffect(()=>{
        handlelist()
        if (parentId == 0){
            document.getElementsByClassName('detail')[0].style.display = 'none'
            document.getElementsByClassName('detailc')[0].style.display = 'inline-block'
            document.getElementsByClassName('sign')[0].style.display = 'inline-block'
            if (pagelist.length !==0){
                document.getElementsByClassName('edit_info')[0].style.display = 'inline-block'
                document.getElementsByClassName('edit_reply')[0].style.display = 'inline-block'
            }
        }else {
            if(pagelist.length !==0){
                document.getElementsByClassName('edit_info')[0].style.display = 'none'
                document.getElementsByClassName('edit_reply')[0].style.display = 'none'
            }
        }
    },[page,limit, pagetotal, likecount,parentId,reply])
    let handledetail = () => {
        axios({
            method: 'get',
            url: 'http://xueba.it266.com:8081/api/post/view',
            params: {
                token:token,
                id: id,
               limit:limit,
                page:page,
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                setAvatar(response.data.data.postDto.avatar)
                title = response.data.data.postDto.post.title
                setTitle(title)
                setView(response.data.data.postDto.post.viewCount)
                setReply(response.data.data.postDto.post.replyCount)
                setNickname(response.data.data.postDto.nickname)
                username = response.data.data.postDto.username
                setUsername(username)
                setCreate(response.data.data.postDto.post.createdAt)
                setContent(response.data.data.postDto.post.content)
                setGood(response.data.data.postDto.post.likeCount)
                setGoodstate(response.data.data.like)
                setFavorite(response.data.data.postDto.post.favoriteCount)
                setFavoritestate(response.data.data.favorite)
                parentId=response.data.data.postDto.post.parentId
                setParentId(parentId)
                // console.log(parentId)
                if (response.data.data.tagList.length !== 0) {
                    tag = response.data.data.tagList
                    setTag(tag)
                }
                if (response.data.data.like === true) {
                    document.getElementsByClassName('likebool')[0].style.color = 'blue'
                } else {
                    document.getElementsByClassName('likebool')[0].style.color = ''
                }
                if (response.data.data.favorite === true) {
                    document.getElementsByClassName('favorite')[0].style.color = 'red'
                } else {
                    document.getElementsByClassName('favorite')[0].style.color = ''
                }
                if (username === localStorage.getItem('username')) {
                    document.getElementsByClassName('delete')[0].style.display = 'block'
                }
                if (title === '') {
                    document.getElementsByClassName('detail')[0].style.display = 'block'
                    document.getElementsByClassName('detailc')[0].style.display = 'none'
                    document.getElementsByClassName('sign')[0].style.display = 'none'
                }
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //获取赞数
    let handle = () => {
        axios({
            method: 'post',
            url: 'http://xueba.it266.com:8081/api/post/like',
            params: {
                token: token,
            },
            data: qs.stringify({
                id: id,
                username: localStorage.getItem('username')
            })
        }).then((response) => {
            // console.log(response.data.data)
            if (response.data.code === "SUCCESS") {
                good = response.data.data.likeCount
                setGood(good)
                setGoodstate(response.data.data.likeBool)
                if (response.data.data.likeBool === false) {
                    document.getElementsByClassName('likebool')[0].style.color = ''
                } else {
                    document.getElementsByClassName('likebool')[0].style.color = '#1296DB'
                }
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //收藏
    let handlefavorite = () => {
        if (!window.localStorage.getItem('token')) {
            alert('请先登录')
            return
        }
        axios({
            method: 'post',
            url: 'http://xueba.it266.com:8081/api/post/favorite',
            params: {
                token: token
            },
            data: qs.stringify({
                id: id,
                username: localStorage.getItem('username')
            })
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                setFavorite(response.data.data.favoriteCount)
                setFavoritestate(response.data.data.favoriteBool)
                if (response.data.data.favoriteBool === false) {
                    document.getElementsByClassName('favorite')[0].style.color = ''
                } else {
                    document.getElementsByClassName('favorite')[0].style.color = 'red'
                }
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //点赞
    let handleGood = () => {
        if (!window.localStorage.getItem('token')) {
            alert('请先登录')
            return
        }
        handle()
    }
    //评论列表
    let handlelist = () => {
        axios({
            method: 'get',
            url: 'http://xueba.it266.com:8081/api/post/replyList',
            params: {
                page: page,
                limit: limit,
                id: id,
                token: token,
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                pagelist = response.data.data.replyList
                setPagelist(pagelist)
                pagetotal = response.data.data.pagination.total
                setPagetotal(pagetotal)
                setLimit(response.data.data.pagination.limit)
                setPage(response.data.data.pagination.page)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //回复
    let handlereply = () => {
        if (!window.localStorage.getItem('token')) {
            alert('请先登录')
            return
        }
        if (replys === '') {
            alert('请输入内容')
            return;
        }
        axios({
            method: 'post',
            url: 'http://xueba.it266.com:8081/api/post/reply',
            params: {
                token: token
            },
            data: qs.stringify({
                content: replys,
                id: id,
                username: localStorage.getItem('username')
            }),
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                alert('回帖成功')
                setReplys('')
                handlelist()
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //评论点赞
    let handleup = (item, index) => {
        if (!window.localStorage.getItem('token')) {
            alert('请先登录')
            return
        }
        axios({
            method: 'post',
            url: 'http://xueba.it266.com:8081/api/post/like',
            params: {
                token: token
            },
            data: qs.stringify({
                id: item.post.id,
            })
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                setLikecount(response.data.data.likeCount)
            }
        }).catch((error) => {
            alert(error)
        })
        handlelist()
    }
    //删除评论
    let handledel = (item) => {
        if (!window.localStorage.getItem('token')) {
            alert('请先登录')
            return
        }
        if (window.confirm('确定删除吗？')) {
            axios({
                method: 'post',
                url: 'http://xueba.it266.com:8081/api/post/delete',
                params: {
                    token: localStorage.getItem('token')
                },
                data: qs.stringify({
                    id: item.post.id
                })
            }).then((response) => {
                // console.log(response)
                if (response.data.code !== "SUCCESS") {
                    alert('删除失败')
                    return;
                }
                alert('删除成功')
                handlelist()
            }).catch((error) => {
                alert(error)
            })
        } else {
            alert('您已经取消删除')
        }
    }
    //删除帖子
    let handledelete = () => {
        if (!window.localStorage.getItem('token')) {
            alert('请先登录')
            return
        }
        if (window.confirm('确定删除吗？')) {
            axios({
                method: 'post',
                url: 'http://xueba.it266.com:8081/api/post/delete',
                params: {
                    token: localStorage.getItem('token')
                },
                data: qs.stringify({
                    id: id
                })
            }).then((response) => {
                if (response.data.code === "SUCCESS") {
                    alert('删除成功')
                    props.history.push('/')
                }
            }).catch((error) => {
                alert(error)
            })
        } else {
            alert('您已经取消删除')
        }
    }
    //回复评论
    let editid = (item) => {
        nameid = item.post.parentId
        setNameid(nameid)
        axios({
            method: 'get',
            url: 'http://xueba.it266.com:8081/api/post/view',
            params: {
                id: nameid,
                token: token,
            }
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                detailtitle = response.data.data.postDto.post.title
                setDetailidtitle(detailtitle)
                localStorage.setItem('title',detailtitle)
            }
        }).catch((error) => {
            alert(error)
        })
        document.getElementsByClassName('detail')[0].style.display = 'block'
        document.getElementsByClassName('detailc')[0].style.display = 'none'
        document.getElementsByClassName('sign')[0].style.display = 'none'
        document.getElementsByClassName('tag')[0].style.display = 'none'
        document.getElementsByClassName('edit_info')[0].style.display = 'none'
        document.getElementsByClassName('edit_reply')[0].style.display = 'none'
    }
    return (
        <div>
            <div className={'head3'}>
                <div className={'edit'}>
                    <div className={'editName'}>
                        <span><span className={'detail'}>回复自：{localStorage.getItem('title')}</span>{title}</span>
                    </div>
                    <div className={'editInfo'}>
                        <svg t="162150868118299" className="delete icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="3307" width="30" height="30"
                             onClick={handledelete}>
                            <path
                                d="M886.892319 247.50093 771.542174 247.50093 648.877437 247.50093l0-57.151651c0-25.666566-20.652366-46.548152-46.037523-46.548152L421.160085 143.801127c-25.385157 0-46.037523 20.881586-46.037523 46.548152l0 57.151651L252.456802 247.50093 137.107681 247.50093c-11.094686 0-20.083407 8.995885-20.083407 20.083407 0 11.087523 8.988722 20.083407 20.083407 20.083407l95.265714 0 0 513.659803c0 43.488467 34.884508 78.869279 77.757968 78.869279l403.730111 0c42.880623 0 77.765131-35.381835 77.765131-78.869279L791.626605 287.668769l95.265714 0c11.094686 0 20.083407-8.995885 20.083407-20.083407C906.975726 256.496815 897.985982 247.50093 886.892319 247.50093zM415.289378 190.349279c0-3.464915 2.687202-6.380314 5.870708-6.380314l181.679829 0c3.183506 0 5.870708 2.915399 5.870708 6.380314l0 57.151651L415.289378 247.50093 415.289378 190.349279zM751.458767 801.327548c0 21.339004-16.867156 38.702464-37.598316 38.702464L310.131363 840.030012c-20.73116 0-37.591153-17.36346-37.591153-38.702464L272.54021 287.668769l122.664737 0 233.588059 0L751.458767 287.668769 751.458767 801.327548z"
                                p-id="3308" fill="#bfbfbf"></path>
                            <path
                                d="M405.659043 357.058139c-7.394411 0-13.388938 5.988388-13.388938 13.388938l0 386.803603c0 7.40055 5.994528 13.388938 13.388938 13.388938s13.388938-5.988388 13.388938-13.388938L419.047981 370.4481C419.047981 363.046526 413.053454 357.058139 405.659043 357.058139z"
                                p-id="3309" fill="#bfbfbf"></path>
                            <path
                                d="M517.222955 357.058139c-7.394411 0-13.388938 5.988388-13.388938 13.388938l0 386.803603c0 7.40055 5.994528 13.388938 13.388938 13.388938 7.394411 0 13.388938-5.988388 13.388938-13.388938L530.611893 370.4481C530.611893 363.046526 524.617365 357.058139 517.222955 357.058139z"
                                p-id="3310" fill="#bfbfbf"></path>
                            <path
                                d="M615.405091 370.4481l0 386.803603c0 7.40055 5.994528 13.388938 13.388938 13.388938 7.394411 0 13.388938-5.988388 13.388938-13.388938L642.182968 370.4481c0-7.40055-5.994528-13.388938-13.388938-13.388938C621.399619 357.058139 615.405091 363.046526 615.405091 370.4481z"
                                p-id="3311" fill="#bfbfbf"></path>
                        </svg>
                        <img src={information} alt=""/>
                        <span className={'detail'}></span>
                        <span>{reply}</span>
                        <img src={eye} alt=""/>
                        <span className={'detail'}></span>
                        <span>{view}</span>
                    </div>
                    <div className={'editMess'}>
                        <img src={avatar} alt=""/>
                        <div className={'editsp'}>
                            <div>
                                <span className={'edithead'}>{nickname}</span>
                                <span>LV0</span>
                                <span>{create} </span>
                                <span>发表</span>
                            </div>
                            <div className={'editspan'}>
                                <span>点击群号免费加入社区交流群：</span>12345
                            </div>
                        </div>
                    </div>
                    <div className={'editbox'}>{content}</div>
                    <div className={'editgood'}>
                        <div className={'editg'} onClick={handleGood}>
                            <i className="likebool fa fa-thumbs-up" aria-hidden="true"></i>
                            <span>点赞</span>
                            <span>({good})</span>
                        </div>
                        <div className={'editc detailc'} onClick={handlefavorite}>
                            <i className="favorite fa fa-star" aria-hidden="true"></i>
                            <span>收藏</span>
                            <span>({favorite})</span>
                        </div>
                        <div className={'edits'}>
                            <i className="fa fa-share-alt" aria-hidden="true"></i>
                            <span>分享</span>
                        </div>
                    </div>
                    <div className={'sign'}>相关标签:</div>
                    {
                        tag.map((item)=>{
                            return(
                            <span className={'tag'} key={item.id}>{item.name}</span>
                            )
                        })
                    }
                    <textarea name="" id="" value={replys} className={'text'} onChange={(e) => {
                        replys = e.target.value
                        setReplys(replys)
                    }}></textarea>
                    <div className={'editbut'}>
                        <button className={'editbtn'} onClick={handlereply}>回复</button>
                    </div>
                    <div className={'editmid'}></div>
                    <div className={'editfin'}>
                        <div className={'editsolid'}>
                            <div></div>
                            <span>{pagetotal}个回复</span>
                        </div>
                        {pagelist.map((item, index) => {
                            // console.log(item)
                            return (
                                <div className={'editcompiete'} key={index}>
                                    <div className={'editMess'}>
                                        <img src={item.avatar} alt=""/>
                                        <div className={'editsp'}>
                                            <div>
                                                <span className={'edithead'}>{item.nickname}</span>
                                                <span>LV0</span>
                                                {item.username === localStorage.getItem('username')?
                                                <span>(作者)</span>:
                                                <span>(楼主)</span>
                                                }
                                            </div>
                                            <div className={'editspan1'}>
                                                <span>{item.post.createdAt} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'editreply'}>{item.post.content}</div>
                                    <div className={'editbot'}>
                                        <div>
                                            <i className={item.like === true ? "titleid fa fa-thumbs-up" : 'fa fa-thumbs-up'}
                                               onClick={() => {
                                                   handleup(item, index)
                                               }}></i>
                                            <span>{item.post.likeCount}</span>
                                        </div>
                                        <div>
                                            <Link to={'/edit/' + item.post.id}  onClick={() => {
                                                editid(item)
                                            }}>
                                                <img src={information} className={'edit_info'} alt=""/>
                                                <span className={'edit_reply'}>{item.post.replyCount}</span>
                                            </Link>

                                        </div>
                                        <svg t="1621503804680"
                                             className={item.username === localStorage.getItem('username') ? "editdelete1 icon" : 'editdelete icon'}
                                             viewBox="0 0 1024 1024"
                                             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3017"
                                             width="20" height="20" onClick={() => {
                                            handledel(item)
                                        }}>
                                            <path
                                                d="M886.892319 247.50093 771.542174 247.50093 648.877437 247.50093l0-57.151651c0-25.666566-20.652366-46.548152-46.037523-46.548152L421.160085 143.801127c-25.385157 0-46.037523 20.881586-46.037523 46.548152l0 57.151651L252.456802 247.50093 137.107681 247.50093c-11.094686 0-20.083407 8.995885-20.083407 20.083407 0 11.087523 8.988722 20.083407 20.083407 20.083407l95.265714 0 0 513.659803c0 43.488467 34.884508 78.869279 77.757968 78.869279l403.730111 0c42.880623 0 77.765131-35.381835 77.765131-78.869279L791.626605 287.668769l95.265714 0c11.094686 0 20.083407-8.995885 20.083407-20.083407C906.975726 256.496815 897.985982 247.50093 886.892319 247.50093zM415.289378 190.349279c0-3.464915 2.687202-6.380314 5.870708-6.380314l181.679829 0c3.183506 0 5.870708 2.915399 5.870708 6.380314l0 57.151651L415.289378 247.50093 415.289378 190.349279zM751.458767 801.327548c0 21.339004-16.867156 38.702464-37.598316 38.702464L310.131363 840.030012c-20.73116 0-37.591153-17.36346-37.591153-38.702464L272.54021 287.668769l122.664737 0 233.588059 0L751.458767 287.668769 751.458767 801.327548z"
                                                p-id="3018" fill="#8a8a8a"></path>
                                            <path
                                                d="M405.659043 357.058139c-7.394411 0-13.388938 5.988388-13.388938 13.388938l0 386.803603c0 7.40055 5.994528 13.388938 13.388938 13.388938s13.388938-5.988388 13.388938-13.388938L419.047981 370.4481C419.047981 363.046526 413.053454 357.058139 405.659043 357.058139z"
                                                p-id="3019" fill="#8a8a8a"></path>
                                            <path
                                                d="M517.222955 357.058139c-7.394411 0-13.388938 5.988388-13.388938 13.388938l0 386.803603c0 7.40055 5.994528 13.388938 13.388938 13.388938 7.394411 0 13.388938-5.988388 13.388938-13.388938L530.611893 370.4481C530.611893 363.046526 524.617365 357.058139 517.222955 357.058139z"
                                                p-id="3020" fill="#8a8a8a"></path>
                                            <path
                                                d="M615.405091 370.4481l0 386.803603c0 7.40055 5.994528 13.388938 13.388938 13.388938 7.394411 0 13.388938-5.988388 13.388938-13.388938L642.182968 370.4481c0-7.40055-5.994528-13.388938-13.388938-13.388938C621.399619 357.058139 615.405091 363.046526 615.405091 370.4481z"
                                                p-id="3021" fill="#8a8a8a"></path>
                                        </svg>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={'editpage'}>
                            <span>共{pagetotal}条</span>
                            <span className={'sp12'} onClick={() => {
                                setPage(Number(page) - 1)
                            }}>＜</span>
                            {showpage()}
                            <span className={'sp12'} onClick={() => {
                                if (page < pages) {
                                    setPage(Number(page) + 1)
                                }
                            }}>＞</span>
                            <select name="" id="" className={'sel'} onClick={(e) => {
                                setLimit(e.target.value)
                                setPage(1)
                            }}>
                                <option value="5">每页5条</option>
                                <option value="10">每页10条</option>
                                <option value="15">每页15条</option>
                            </select>
                            跳至
                            <input type="text" className={'sp3'} onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    setPage(e.target.value)
                                }
                            }}/>页
                        </div>
                    </div>
                </div>
                <div className={'headright'}>
                    <div className={'hot'}>相关帖子</div>
                    <div className={'zj'}>广告招募哦~</div>
                    <div className={'advertise'}>
                        <span className={'code'}>代码库</span>
                    </div>
                    <div className={'zj'}>点击图片或者QQ扫码加社区官方交流群~</div>
                    <div className={'erweima'}>
                        <svg t="1620899625549" className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="7154" width="200" height="200">
                            <path
                                d="M810.77943309 25.18418232c-2.97743822 0.38836149-6.08432986 0.12945385-9.06176795 0.12945381-49.19245428 0-98.38490851-0.12945385-147.57736293 0.12945389-14.23992099 0-28.35038816 1.81235359-41.94304001 6.60214515-24.07841181 8.41449869-38.57724052 25.24349631-44.53211638 49.71026968-2.20071505 9.0617679-3.10689191 18.25298965-3.10689197 27.57366517 0 86.99297199-0.12945385 173.85648988 0.12945382 260.84946173 0 17.86462815 1.16508447 35.7292565 8.02613725 52.81716163 8.93231409 22.13660447 25.5024039 35.21144105 48.28627767 41.03686303 8.15559116 2.07126125 16.57008986 2.84798419 24.98458856 2.84798414h282.20934326c10.74466771 0 21.4893354-0.90617681 32.10454911-2.97743796 31.58673375-5.82542224 52.29934617-26.79694223 58.12476836-58.25422226 0.51781534-2.84798419-0.51781534-6.731599 3.75416085-8.02613719v-300.33287909c-0.51781534-0.51781534-0.64726916-1.16508447-0.64726898-1.94180735-1.94180742-6.21378372-2.20071505-12.68647504-4.27197635-19.02971259-9.19122175-27.18530378-28.09148045-43.23757828-55.40623803-50.22808496-8.28504494-2.07126125-16.57008986-3.10689191-25.2434962-2.7185304-1.68289974 0.12945385-3.88361486 1.29453828-5.04869941-1.16508444h-115.21390613c-0.51781534 3.3657995-3.49525337 2.71853023-5.56651454 2.97743801z m127.77092753 52.68770759c5.17815323 0 10.48576004 1.16508447 15.40500532 2.71853049 8.93231409 2.84798419 13.85155957 9.83849072 13.85155956 19.54752774 0 96.83146274 0.12945385 193.6629255-0.12945389 290.49438825 0 14.49882863-11.13302909 23.30168889-27.3147575 23.43114281-49.45136197 0.38836149-98.77327011 0.12945385-148.22463197 0.12945375h-146.28282488c-5.82542224 0-11.13302909-1.68289974-16.44063619-3.49525337-11.00357535-4.01306879-12.42756741-13.59265184-12.55702113-23.17223505-0.25890753-48.54518527-0.12945385-97.09037035-0.12945379-145.63555556V105.31610138c0-8.41449869 1.94180742-16.18172838 8.93231412-22.00715058 5.9548761-4.91924543 13.33374417-5.56651471 20.19479699-5.56651468 97.60818566-0.12945385 195.21637142 0 292.69510336 0.12945392z"
                                p-id="7155" fill="#1296db"></path>
                            <path
                                d="M809.74380241 23.24237485c-51.13426177 0.12945385-102.26852338 0.12945385-153.27333134 0.1294539-12.16865969 0-24.07841181 1.29453828-35.85871008 4.01306846-15.01664411 3.49525337-28.60929578 9.96794478-38.83614814 21.61878936-13.72210571 15.66391312-19.15916646 34.82307948-19.15916644 55.14733026-0.25890753 90.09986374-0.25890753 180.32918125 0 270.42904504 0 11.78029828 0.90617681 23.69005042 3.62470719 35.21144099 3.62470721 15.14609779 9.83849072 29.12711127 21.61878914 39.4834173 15.14609779 13.33374417 33.52854131 19.41807412 53.72333807 19.4180742 95.92528589 0.12945385 191.98002567 0.12945385 287.90531173 0 12.03920599 0 24.20786555-0.64726916 35.85871031-3.88361489 24.59622711-6.99050668 43.49648598-20.58315858 51.78153075-46.34447025 2.20071505-6.86105286 2.33016897-14.11046709 4.91924542-20.84206614-4.14252252 1.29453828-3.23634571 5.17815323-3.75416087 8.02613725-5.82542224 31.58673375-26.5380345 52.42880002-58.12476853 58.25422226-10.61521385 1.94180742-21.35988146 2.97743822-32.1045492 2.97743796h-282.20934316c-8.41449869 0-16.82899758-0.77672279-24.98458863-2.84798414-22.65441982-5.82542224-39.3539635-18.90025878-48.28627752-41.03686303-6.86105286-16.95845154-8.02613723-34.95253334-8.02613726-52.81716163-0.25890753-86.99297199-0.12945385-173.85648988-0.12945383-260.84946173 0-9.32067557 0.90617681-18.51189729 3.10689185-27.57366517 5.9548761-24.46677334 20.45370474-41.29577081 44.53211654-49.71026968 13.59265184-4.78979152 27.70311884-6.4726913 41.94304-6.60214515 49.19245428-0.25890753 98.38490851-0.12945385 147.57736297-0.12945389 2.97743822 0 6.08432986 0.25890753 9.06176792-0.12945368 2.20071505-0.25890753 5.04869923 0.25890753 5.43706068-3.10689198-1.55344589 2.71853023-4.14252252 1.16508447-6.34323757 1.16508438zM5.31772077 399.04683517c2.58907652 16.18172838 7.11996047 31.58673375 18.51189704 44.01430111 14.88718999 16.44063619 34.30526401 23.30168889 55.66514551 23.43114287 97.21982425 0.38836149 194.43964844 0.38836149 291.78892662 0 12.16865969 0 24.46677334-1.29453828 36.3765254-5.0486993 31.71618767-9.96794478 50.61644656-35.34089475 50.61644645-68.7399822 0-95.79583201 0-191.46221035 0.12945377-287.25804245 0-8.28504494-1.03563059-16.31118227-3.10689185-24.3373196-7.50832192-28.99765737-31.71618767-50.61644656-61.49056794-54.75896865-5.30760677-0.77672279-10.61521385-1.42399214-16.05227454-1.42399227-2.58907652 0-5.82542224 0.77672279-6.73159895-3.10689197h-115.21390631c-1.68289974 2.71853023-4.27197626 1.16508447-6.34323741 1.1650847-53.205523 0.12945385-106.41104599-0.25890753-159.61656897 0.25890744-19.15916646 0.12945385-37.80051753 3.3657995-54.62951512 13.85155954-16.18172838 10.09739852-25.63185759 24.725681-30.6805569 42.71976315-1.03563059 3.49525337-0.25890753 7.37886811-2.4596228 10.61521373v301.62741721c3.75416086 1.16508447 2.84798419 4.53088377 3.23634571 6.99050669z m51.13426146-299.03834078c0-10.48576004 8.02613723-18.90025878 18.77080515-21.10097381 5.69596839-1.16508447 11.39193675-1.29453828 17.08790493-1.29453829h283.50388154c5.56651471 0 10.87412145 1.03563059 16.05227456 2.58907657 9.70903702 3.10689191 13.98101332 8.93231409 13.98101333 18.90025885v291.91838016c0 10.61521385-4.91924543 17.21735905-15.01664412 20.58315837-5.17815323 1.68289974-10.48576004 2.71853023-16.05227441 2.58907673-48.15682372-0.12945385-96.18419351-0.12945385-144.34101723-0.12945377-48.80409291 0-97.47873191 0.12945385-146.28282476-0.12945389-8.15559116 0-16.31118227-1.16508447-22.39551195-7.8966835-3.49525337-3.88361486-5.30760677-8.15559116-5.30760704-13.07483633-0.12945385-97.47873191-0.12945385-195.21637142 0-292.95401109z"
                                p-id="7156" fill="#1296db"></path>
                            <path
                                d="M3.24645922 395.42212801c0.12945385 11.5213906 3.3657995 22.39551211 8.2850449 32.49291056 13.46319809 27.70311884 37.41215609 40.13068635 66.7981749 40.38959401 96.44310115 0.77672279 192.88620233 0.25890753 289.19984979 0.25890784 12.03920599 0 24.07841181-1.03563059 35.8587102-3.88361491 35.0819871-8.67340641 56.44186868-34.17581045 56.70077625-70.42288195 0.64726916-95.53692428 0.25890753-191.07384887 0.25890772-286.61077328 0-6.34323748 0-12.68647504-1.16508446-19.02971261-3.88361486-20.97152003-13.85155957-38.05942527-31.32782616-50.48699259-14.23992099-10.09739852-30.42164942-14.23992099-47.76846206-14.75773633-2.97743822-0.12945385-6.34323748 1.55344589-8.93231419-1.16508446 0.90617681 3.88361486 4.27197626 3.10689191 6.73159892 3.10689184 5.43706076 0 10.74466771 0.77672279 16.05227462 1.4239922 29.77438022 4.14252252 53.98224598 25.76131164 61.49056795 54.75896883 2.07126125 8.02613723 3.10689191 16.05227461 3.10689183 24.33731945-0.12945385 95.79583201 0 191.46221035-0.12945387 287.2580425 0 33.26963355-18.90025878 58.64258371-50.61644648 68.73998223-11.90975228 3.75416086-24.20786555 5.04869923-36.37652541 5.04869921-97.21982425 0.25890753-194.43964844 0.38836149-291.78892641 0-21.35988146-0.12945385-40.64850174-6.99050668-55.66514572-23.43114263-11.39193675-12.55702125-15.9228207-27.83257282-18.51189724-44.0143015-0.38836149-2.45962274 0.51781534-5.9548761-3.36579953-6.73159877 1.68289974 0.12945385 1.16508447 1.68289974 1.16508445 2.71853036zM97.48884543 1010.5867147c2.71853023-0.38836149 5.56651471-0.12945385 8.4144988-0.12945382h266.67488399c10.87412145 0 21.4893354-1.29453828 31.97509532-4.01306863 33.01072598-8.54395255 53.59388444-34.82307948 53.72333812-68.8694361 0.12945385-32.75181799 0-65.63309038 0-98.38490863v-191.59166412c0-41.81358608-27.70311884-72.75305081-69.38725131-77.28393484-14.75773631-1.55344589-29.64492628-2.20071505-44.53211676-2.58907664-44.66157041-0.90617681-89.32314068 0.64726916-133.85525709 1.68289974-42.71976292 1.03563059-85.43952596 0.25890753-128.02983506 0.9061769-14.88718999 0.25890753-29.25656495 3.49525337-42.33140138 10.48575987-17.60572048 9.32067557-28.35038816 23.94895798-33.26963366 43.23757825-0.90617681 3.62470721-0.12945385 8.41449869-4.78979163 10.35630626v302.92195542c2.58907652 7.11996047 2.84798419 14.75773631 5.04869934 22.13660457 7.63777588 26.79694223 25.11404235 43.10812458 51.52262304 50.35753883 8.41449869 2.33016897 17.08790514 2.97743822 25.76131171 2.71853033 1.81235359 0 4.27197626-1.42399214 5.69596839 1.16508437h2.58907655c0.25890753-2.97743822 2.71853023-2.84798419 4.78979163-3.10689185z m-14.75773632-52.55825381c-15.79336691 0-26.79694223-8.54395255-26.66748844-26.53803462 0.51781534-94.88965529 0.25890753-189.77931061 0.12945383-284.7984197 0-15.27555163 9.0617679-23.43114273 23.69005045-23.94895806 96.57255505-3.10689191 193.01565633-0.64726916 289.58821142-1.03563064 8.28504494 0 17.34681292-0.51781534 25.37295 3.88361499 6.99050668 3.88361486 11.00357535 9.32067557 11.00357532 17.73517417-0.12945385 48.54518527 0 97.09037035 0 145.6355556 0 48.15682372-0.25890753 96.18419351 0.12945383 144.34101729 0.12945385 15.66391312-10.09739852 22.78387356-24.20786569 24.98458862-11.13302909 1.68289974-22.00715062 0-33.01072597-0.12945391-88.67587162-0.25890753-177.35174309-0.12945385-266.02761475-0.12945374z"
                                p-id="7157" fill="#1296db"></path>
                            <path
                                d="M99.68956051 1012.52852209c87.76969486-0.12945385 175.66884339-0.12945385 263.43853826 0 12.16865969 0 24.20786555-0.25890753 36.24707161-2.71853033 16.18172838-3.23634571 30.81001086-10.09739852 42.07249369-22.13660442 12.55702125-13.46319809 18.77080514-30.29219559 18.77080509-48.6746392 0.25890753-96.18419351 0.12945385-192.49784099 0.12945382-288.6820346 0-8.15559116-0.51781534-16.05227461-2.58907654-23.94895788-6.86105286-25.76131164-22.39551211-43.62593973-47.50955461-53.4644306-17.21735905-6.731599-35.34089475-6.4726913-53.07606912-6.86105289-29.90383383-0.64726916-59.80766815-1.16508447-89.7115022 0.64726921-24.59622711 1.55344589-49.45136197 0.38836149-74.17704293 1.29453833-35.7292565 1.16508447-71.58796644 0.38836149-107.44667661 0.25890755-8.28504494 0-16.44063619 0.77672279-24.59622709 2.5890765-23.81950417 5.43706076-42.07249385 17.86462815-52.55825402 40.519048-3.3657995 7.37886811-3.62470721 15.53445924-6.73159888 22.91332734 4.78979152-1.94180742 3.88361486-6.731599 4.78979162-10.35630619 4.91924543-19.2886202 15.79336691-33.91690271 33.2696336-43.23757826 13.20429052-6.99050668 27.44421134-10.22685236 42.33140143-10.48575997 42.71976292-0.64726916 85.31007205 0.12945385 128.02983507-0.90617684 44.66157041-1.03563059 89.19368701-2.58907652 133.85525747-1.68289972 14.88718999 0.25890753 29.77438022 0.90617681 44.53211656 2.58907656 41.68413229 4.53088377 69.25779756 35.47034864 69.38725111 77.28393483v191.59166413c0 32.75181799 0.12945385 65.63309038 0 98.38490872-0.25890753 34.17581045-20.71261239 60.32548347-53.72333818 68.86943591-10.48576004 2.71853023-21.10097385 4.01306879-31.9750953 4.0130688h-266.67488412c-2.84798419 0-5.56651471-0.12945385-8.41449871 0.12945381-2.07126125 0.25890753-4.53088377 0-4.78979148 3.10689187 1.94180742-2.45962274 4.78979152-1.03563059 7.11996046-1.03563066z"
                                p-id="7158" fill="#1296db"></path>
                            <path
                                d="M35.0921006 37.35284207c16.82899758-10.35630615 35.47034864-13.72210571 54.62951526-13.85155935 53.205523-0.51781534 106.41104599-0.12945385 159.61656881-0.25890777 2.07126125 0 4.66033777 1.55344589 6.34323757-1.16508448-2.20071505 1.29453828-4.66033777 0.64726916-6.9905067 0.64726914-57.99531459 0.38836149-115.99062911-1.03563059-173.98594367 0.77672311-24.46677334 0.77672279-45.1793857 10.48576004-60.19602967 30.55110314-8.15559116 10.87412145-11.78029828 23.30168889-12.55702122 36.63543295 2.33016897-3.10689191 1.55344589-6.99050668 2.45962271-10.61521379 5.17815323-17.9940821 14.49882863-32.62236441 30.68055723-42.71976289zM936.60855307 23.24237485c8.54395255-0.38836149 16.95845154 0.64726916 25.24349634 2.71853042 27.18530378 6.99050668 46.21501629 23.04278123 55.40623799 50.22808504 2.07126125 6.21378372 2.33016897 12.81592902 4.27197635 19.02971255v-0.51781533c0.51781534-36.37652545-31.58673375-68.86943604-68.22216694-71.5879664-7.24941434-0.51781534-14.49882863 0.64726916-21.74824305-1.16508448 1.03563059 2.71853023 3.3657995 1.42399214 5.04869941 1.2945382zM84.28455493 1012.52852209c-8.67340641 0.25890753-17.34681292-0.38836149-25.76131147-2.71853033-26.40858075-7.24941434-43.88484746-23.56059653-51.52262326-50.35753864-2.07126125-7.37886811-2.33016897-15.01664411-5.04869922-22.13660455 1.42399214 6.86105286 1.03563059 13.98101332 2.7185305 20.84206606 7.11996047 29.51547243 33.01072598 52.55825385 62.91455989 54.37060746 7.50832192 0.51781534 15.01664411-0.77672279 22.39551195 1.03563066-1.42399214-2.45962274-3.88361486-1.16508447-5.69596839-1.03563066z"
                                p-id="7159" fill="#1296db"></path>
                            <path
                                d="M636.79348919 731.61371718c-15.9228207 0.25890753-26.40858075 10.74466771-26.40858051 25.89076534V979.90615773c0 15.9228207 11.00357535 26.02021942 26.92639602 25.76131133 16.69954371-0.25890753 27.18530378-8.93231409 27.31475768-25.50240378 0.25890753-74.3064968 0.12945385-148.74244737 0-223.04894412 0-15.53445924-10.87412145-25.76131164-27.83257297-25.50240397zM964.31167207 731.87262479c-12.81592902-2.33016897-30.16274163 6.34323748-30.16274183 23.56059653-0.25890753 37.80051753 0 75.47158125 1.7e-7 113.27209884v112.62482964c0 2.07126125-0.12945385 4.40143017 0.51781518 6.34323754 4.27197626 12.16865969 18.64135116 20.97152003 30.42164952 18.12353571 14.75773631-3.49525337 23.17223504-9.32067557 23.30168869-27.70311904 0.25890753-71.84687407 0.12945385-143.69374819 0.12945396-215.54062224-0.12945385-18.64135116-5.9548761-27.31475756-24.20786569-30.68055672zM844.30797427 809.4154672c-3.3657995-12.16865969-16.82899758-21.74824297-28.6092958-19.5475279-16.05227461 3.10689191-25.11404235 8.54395255-25.24349627 27.05584991-0.38836149 53.205523-0.12945385 106.54049979-0.12945378 159.74602274 0 17.86462815 7.37886811 25.89076541 22.65441974 28.73874963 14.36937486 2.71853023 31.58673375-5.82542224 31.71618767-24.72568089v-82.20318039-83.49771853c0-1.68289974 0-3.75416086-0.38836156-5.56651457zM808.44926422 573.16223274c-11.26248298 2.45962274-18.12353582 13.20429052-18.1235358 25.63185778V713.23127374c0 16.95845154 5.17815323 27.18530378 23.43114263 30.68055704 13.33374417 2.45962274 31.06891869-6.731599 30.93946478-23.94895813-0.12945385-20.45370474 0-40.90740946 0-61.49056787 0-19.80643549-0.25890753-39.61287114 0-59.54876055 0.38836149-24.59622711-18.90025878-29.51547243-36.24707161-25.76131149zM654.39920988 576.52803223c-6.34323748-4.40143017-13.07483655-4.27197626-19.93588944-4.27197632-13.59265184 0-23.94895798 10.22685236-23.94895791 23.69005034v33.65799513c0 11.65084445-0.12945385 23.30168889 0 34.95253325 0.12945385 5.9548761 1.68289974 11.26248298 6.34323741 15.92282077 6.731599 6.731599 14.49882863 8.67340641 23.56059644 8.41449877 12.81592902-0.38836149 24.33731947-11.5213906 24.33731965-24.20786566 0.12945385-22.91332745 0.25890753-45.69720095-0.12945386-68.61052847 0-7.89668349-3.10689191-14.62828234-10.22685235-19.54752758zM986.18936896 587.53160787c-2.84798419-8.02613723-12.68647504-15.27555163-23.17223508-15.5344595-18.51189729-0.64726916-30.5511032 10.22685236-29.12711132 29.51547252 0.64726916 9.0617679 0.12945385 18.12353582 0.12945412 27.18530376v32.36345672c0 1.94180742 0 3.88361486 0.51781521 5.69596851 4.14252252 13.33374417 16.69954371 20.06534315 30.93946461 18.12353566 14.23992099-2.07126125 22.52496592-10.87412145 22.78387355-25.50240388 0.38836149-20.45370474 0.12945385-41.03686327 0.12945375-61.49056798 0-3.75416086-1.03563059-7.11996047-2.20071484-10.35630625zM304.87387648 201.62974879c-2.45962274-9.45012946-10.22685236-16.44063619-19.93588947-17.73517436-1.68289974-0.25890753-3.49525337-0.51781534-5.17815293-0.51781526-0.77672279 0-1.94180742 0.25890753-2.20071501-1.03563071h-37.28270226c-0.51781534 0.90617681-1.42399214 0.38836149-2.07126125 0.38836139-17.21735905 0-34.43471804-0.12945385-51.65207723 0.12945393-6.21378372 0-12.29811359 1.16508447-17.735174 4.530884-5.30760677 3.23634571-8.28504494 8.02613723-9.96794492 13.85155948-0.25890753 1.16508447 0 2.45962274-0.77672289 3.36579945v97.73763957c1.29453828 0.25890753 0.90617681 1.42399214 1.03563077 2.20071501 0.90617681 5.30760677 2.33016897 10.22685236 5.95487591 14.23992092 4.78979152 5.30760677 11.13302909 7.50832192 17.99408187 7.63777592 31.45728003 0.12945385 63.04401394 0.12945385 94.501294 0 4.01306879 0 7.89668349-0.38836149 11.78029821-1.68289974 10.22685236-3.23634571 16.44063619-11.5213906 16.44063602-22.26605809v-93.07730194c0.12945385-2.58907652-0.25890753-5.17815323-0.90617682-7.76722957zM866.05621727 191.66180409c-2.45962274-9.45012946-10.22685236-16.44063619-19.93588955-17.7351742-1.68289974-0.25890753-3.49525337-0.51781534-5.17815279-0.51781557-0.77672279 0-1.94180742 0.25890753-2.20071526-1.03563047h-37.28270219c-0.51781534 0.90617681-1.42399214 0.38836149-2.07126117 0.38836152-17.21735905 0-34.43471804-0.12945385-51.65207707 0.1294539-6.21378372 0-12.29811359 1.16508447-17.7351743 4.5308839-5.30760677 3.23634571-8.28504494 8.02613723-9.96794476 13.8515593-0.25890753 1.16508447 0 2.45962274-0.77672294 3.36579965v97.73763947c1.29453828 0.25890753 0.90617681 1.42399214 1.0356306 2.20071517 0.90617681 5.30760677 2.33016897 10.22685236 5.95487606 14.23992089 4.78979152 5.30760677 11.13302909 7.50832192 17.99408202 7.6377759 31.45728003 0.12945385 63.04401394 0.12945385 94.50129375 0 4.01306879 0 7.89668349-0.38836149 11.78029842-1.6829 10.22685236-3.23634571 16.44063619-11.5213906 16.44063612-22.2660581v-93.07730192c0.25890753-2.58907652-0.25890753-5.30760677-0.90617694-7.76722944zM304.09715359 743.78237691c-2.45962274-9.45012946-10.22685236-16.44063619-19.93588953-17.73517429-1.68289974-0.25890753-3.49525337-0.51781534-5.17815292-0.51781536-0.77672279 0-1.94180742 0.25890753-2.20071507-1.03563061h-37.28270216c-0.51781534 0.90617681-1.42399214 0.38836149-2.07126133 0.38836154-17.21735905 0-34.43471804-0.12945385-51.65207699 0.12945377-6.21378372 0-12.29811359 1.16508447-17.73517433 4.53088391-5.30760677 3.23634571-8.28504494 8.02613723-9.96794474 13.85155955-0.25890753 1.16508447 0 2.45962274-0.77672298 3.36579949v97.73763944c1.29453828 0.25890753 0.90617681 1.42399214 1.03563068 2.20071507 0.90617681 5.30760677 2.33016897 10.22685236 5.95487594 14.23992111 4.78979152 5.30760677 11.13302909 7.50832192 17.99408205 7.63777571 31.45728003 0.12945385 63.04401394 0.12945385 94.50129386 0 4.01306879 0 7.89668349-0.38836149 11.78029824-1.68289964 10.22685236-3.23634571 16.44063619-11.5213906 16.44063605-22.26605841v-93.07730168c0.12945385-2.58907652-0.25890753-5.17815323-0.90617677-7.7672296z"
                                p-id="7160" fill="#1296db"></path>
                        </svg>
                        <div>
                            <span className={'auth'}>扫码添加作者微信</span>
                        </div>
                    </div>
                    <div className={'zj'}>友情链接~</div>
                    <div className={'editcode'}>
                        <span>代码酷</span>
                        <span>官方Q群</span>
                        <span>申请链接</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Edit
