import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
function Tiezi() {
    let [limit, setLimit] = useState(9)
    let [page, setPage] = useState(1)
    let [list, setList] = useState([])
    let [total, setTotal] = useState('')
    let [limit1, setLimit1] = useState(9)
    let [page1, setPage1] = useState(1)
    let [list1, setList1] = useState([])
    let [total1, setTotal1] = useState('')
    let [active, setActive] = useState('')
    let [active1, setActive1] = useState('')
    let pages
    let pages1
    let show = () => {
        pages = Math.ceil(total / limit)
        let num = []
        for (let i = 1; i <= pages; i++) {
            num.push(
                <span className={page === i ? 'sp11 sp1' : 'sp1'} key={i} onClick={() => {
                    setActive(i)
                    setPage(i)
                    console.log(i)
                }}>{i}</span>
            )
        }
        return num
    }
    let show1 = () => {
        pages1 = Math.ceil(total1 / limit1)
        let num1 = []
        for (let i = 1; i <= pages1; i++) {
            num1.push(
                <span className={page1 === i ? 'sp11 sp1' : 'sp1'} key={i} onClick={() => {
                    setActive1(i)
                    setPage1(i)
                }}>{i}</span>
            )
        }
        return num1
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
        axios({
            method: "get",
            url: 'http://xueba.it266.com:8081/api/post/my',
            params: {
                token: window.localStorage.getItem('token'),
                limit: limit,
                page: page,
            },
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                list = response.data.data.postDtoList
                setList(list)
                setTotal(response.data.data.postSearchDto.total)
                setPage(response.data.data.postSearchDto.page)
            }
        }).catch((error) => {
            alert(error)
        })
        if (Number(page1) === 1) {
            let sp12 = document.getElementsByClassName('sp12')[2]
            sp12.classList.add('sp13')
        } else {
            let sp12 = document.getElementsByClassName('sp12')[2]
            sp12.classList.remove('sp13')
        }
        if (Number(page1) === pages1) {
            let sp12 = document.getElementsByClassName('sp12')[3]
            sp12.classList.add('sp13')
        } else {
            let sp12 = document.getElementsByClassName('sp12')[3]
            sp12.classList.remove('sp13')
        }
        axios({
            method: 'get',
            url: 'http://xueba.it266.com:8081/api/post/myFavorite',
            params: {
                token: localStorage.getItem('token'),
                limit: limit1,
                page: page1,
            }
        }).then((response) => {
            console.log(response)
            if (response.data.code === "SUCCESS") {
                list1 = response.data.data.postDtoList
                setList1(list1)
                setTotal1(response.data.data.postSearchDto.total)
                setPage1(response.data.data.postSearchDto.page)
            }
        }).catch((error) => {
            alert(error)
        })
    }, [page, page1])
    let handlefavorite = () => {
        setPage1(1)
        document.getElementsByClassName('listmap')[0].style.display = 'none'
        document.getElementsByClassName('listmap1')[0].style.display = 'block'
        document.getElementsByClassName('sptie')[0].classList.remove('sptie1')
        document.getElementsByClassName('sptiec')[0].classList.add('sptie1')
    }
    return (
        <div className={'information'}>
            <div className={'infomationr'}>
                <div className={'set'}>
                    <div className={'set1'}>
                        <span className={'sptie sptie1'} onClick={() => {
                            document.getElementsByClassName('listmap')[0].style.display = 'block'
                            document.getElementsByClassName('listmap1')[0].style.display = 'none'
                            document.getElementsByClassName('sptie')[0].classList.add('sptie1')
                            document.getElementsByClassName('sptiec')[0].classList.remove('sptie1')
                        }}>我发的帖</span>
                        <span className={'sptiec'} onClick={handlefavorite}>收藏的贴</span>
                    </div>
                    <div className={'listmap'}>
                        {list.map((item, index) => {
                            // console.log(item.post.title)
                            return (
                                <div key={index} className={'tie'}>
                                    <div>
                                        <Link to={'/edit/' + item.post.id}>
                                            <span className={'tiesp'}>{item.post.title}</span>
                                        </Link>
                                        <span>{item.post.createdAt}</span>
                                    </div>
                                    <div className={'tie1'}>
                                        <span>{item.post.replyCount}个回复</span>
                                        <span>{item.post.viewCount}此浏览</span>
                                        <span>{item.post.favoriteCount}人收藏</span>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={'setsp'}>
                            共{total}条
                            <span className={'sp12'}> ＜ </span>
                            {show()}
                            <span className={'sp12'}> ＞</span>
                            跳至
                            <input type="text" className={'setinp'} onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    setPage(e.target.value)
                                }
                            }}/>页
                        </div>
                    </div>
                    {/*收藏帖子*/}
                    <div className={'listmap1'}>
                        {list1.map((item, index) => {
                            // console.log(item)
                            return (
                                <div key={index} className={'tie'}>
                                    <div>
                                        <Link to={'/edit/' + item.post.id}>
                                            <span className={'tiesp'}>{item.post.title}</span>
                                        </Link>
                                        <span>{item.post.createdAt}</span>
                                    </div>
                                    <div className={'tie1'}>
                                        <span>{item.post.replyCount}个回复</span>
                                        <span>{item.post.viewCount}此浏览</span>
                                        <span>{item.post.favoriteCount}人收藏</span>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={'setsp'}>
                            共{total1}条
                            <span className={'sp12'}> ＜ </span>
                            {show1()}
                            <span className={'sp12'}> ＞</span>
                            跳至
                            <input type="text" className={'setinp'} onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    setPage1(e.target.value)
                                }
                            }}/>页
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tiezi
