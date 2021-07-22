import React, {useEffect, useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import search from './img/搜索.svg'
import wjx from './img/五角星 星型 .svg'
import eye from './img/眼睛.svg'
import information from './img/信息.svg'
import axios from "axios";
function Home(props) {
    let pages
    let [total, setTotal] = useState('')  //总信息数
    let [page, setPage] = useState(1)  //当前页
    let [message, setMessage] = useState([]) //信息
    let [limit, setLimit] = useState(5)    //每页信息数
    let [active, setActive] = useState(0)
    let [categoryid, setCategoryid] = useState(0)    //首页，其他，提问
    let [weekindex, setWeekindex] = useState(0)
    let [visitor, setVisitor] = useState([]) //访客
    let [hot, setHot] = useState([]) //热门话题
    let [sear, setSear] = useState('')
    let [favorite,setFavorite] = useState('') //收藏的帖子
    let week = ['综合', '|', '周榜', '|', '月榜', '|', '精华']
    let ulli = ['首页', '其他', '提问', '分享', '建议', '讨论', '公告', '动态']
    let register = () => {
        props.history.push('/register')
    }
    //当前页
    let showPage = () => {
        let num = []
        pages = Math.ceil(total / limit)  //总页数
        for (let i = 1; i <= pages; i++) {
            num.push(<span key={i} className={page === i ? 'sp11 sp1' : 'sp1'} onClick={() => {
                        setPage(i)
                    }}>{i}</span>)
        }
        if (page>4 && page<=pages-3){
            num = num.slice(page-4,page+3)
        }
        if(page>pages-3){
            num = num.slice(pages-7,pages)
        }
        return num.slice(0,7)
    }
    //月榜
    let getmonth = () => {
        axios({
            method: 'get',
            url: 'http://xueba.it266.com:8081/api/post/month',
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                setMessage(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //周榜
    let getweek = () => {
        axios({
            method: 'get',
            url: 'http://xueba.it266.com:8081/api/post/week',
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                setMessage(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    let getData = () => {
        axios({
            method: 'get',
            params: {
                token:localStorage.getItem('token'),
                page: page,
                limit: limit,
                categoryId: categoryid,
            },
            url: 'http://xueba.it266.com:8081/api/post/list',
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                setPage(response.data.data.postSearchDto.page)
                setTotal(response.data.data.postSearchDto.total)
                setMessage(response.data.data.postDtoList)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //最近访客
    let getvisitor = () => {
        axios({
            method: 'get',
            url: 'http://xueba.it266.com:8081/api/user/visitor',
        }).then((response) => {
            if (response.data.code === "SUCCESS") {
                setVisitor(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    //热门话题
    let gethot = () => {
        axios({
            method: 'get',
            url: 'http://xueba.it266.com:8081/api/post/getTagOrder?hotTagNumber=4',
        }).then((response) => {
            // console.log(response)
            if (response.data.code === "SUCCESS") {
                setHot(response.data.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }
    useEffect(() => {
        if (Number(page) === 1) {
            let sp12 = document.getElementsByClassName('sp12')[0]
            sp12.classList.add('sp13')
        } else {
            let sp12 = document.getElementsByClassName('sp12')[0]
            sp12.classList.remove('sp13')
        }
        getData()
        getvisitor()
        gethot()
    }, [categoryid, page, limit])
    return (
        <div>
            <div className={'head2'}>
                <div className='head21'>
                    <div className={'leftul'}>
                        <ul>
                            {ulli.map((item, index) => {
                                return <li key={index} className={active == index ? 'an' : ''} onClick={(e) => {
                                    setActive(index)
                                    setCategoryid(index)
                            }}>{item}</li>
                            })}
                        </ul>
                    </div>
                    <div className={'rightinp'}>
                        <div className={'rigbtn'}>
                            <button className={'btn'} onClick={() => {
                                if (!localStorage.getItem('token')) {
                                    alert(('请先登录'))
                                    props.history.push('/login')
                                } else {
                                    props.history.push('/create')
                                }
                            }}>发表新帖
                            </button>
                        </div>
                        <div className={'riginp'}>
                            <input type="text" className={'inp'} value={sear} placeholder={'搜索帖子'} onChange={(e) => {
                                setSear(e.target.value)
                            }}/>
                            <img className={'search'} src={search} alt="" onClick={(e) => {
                                if (document.getElementsByClassName('retu')[0].style.display == 'none') {
                                    if (sear === '') {
                                        alert('请输入内容')
                                    } else {
                                        setSear('')
                                        document.getElementsByClassName('retu')[0].style.display = 'block'
                                        document.getElementsByClassName('leftmid1')[0].innerHTML = `当前搜索：${sear}`
                                    }
                                } else {
                                    document.getElementsByClassName('retu')[0].style.display = 'none'
                                    document.getElementsByClassName('leftmid1')[0].innerHTML = `欢迎您的到来`
                                }
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'head3'}>
                <div className={'head3le'}>
                    <div className={'leftmid'}>
                        <div className={'leftmid1'}>欢迎您的到来</div>
                    </div>
                    <div className={'retu'}>
                        <span className={'retusp'} onClick={() => {
                            setSear('')
                            document.getElementsByClassName('retu')[0].style.display = 'none'
                            document.getElementsByClassName('leftmid1')[0].innerHTML = '欢迎您的到来'
                        }}>返回</span>
                    </div>
                    <div className={'leftbottom'}>
                        <div className={'leftbot'}>
                            {/*综合*/}
                            {week.map((item, index) => {
                                return (
                                    <div className={weekindex === index ? 'an zh' : 'zh'} key={index}
                                         onClick={(e) => {
                                             setWeekindex(index)
                                             if (item === '周榜') {
                                                 getweek()
                                                 document.getElementsByClassName('pagetotal')[0].style.display='none'
                                                 document.getElementsByClassName('pageweek')[0].style.display='block'
                                             }
                                             if (item === '综合') {
                                                 getData()
                                                 document.getElementsByClassName('pagetotal')[0].style.display='block'
                                                 document.getElementsByClassName('pageweek')[0].style.display='none'
                                             }
                                             if (item === '月榜') {
                                                 getmonth()
                                                 document.getElementsByClassName('pagetotal')[0].style.display='none'
                                                 document.getElementsByClassName('pageweek')[0].style.display='block'
                                             }
                                         }}>{item}</div>
                                )
                            })}
                        </div>
                        <div className={'rightbot'}>
                            <span className={'zx'}>抢沙发</span>
                            <div className={'zx'}>|</div>
                            <span className={'zx an'}>按最新</span>
                        </div>
                    </div>
                    {message.map((item) => {
                        // console.log(item)
                        return (
                            <div className={'leftart'} key={item.post.id}>
                                <div className={'leftava'}>
                                    <div className={'avatar'} style={{backgroundImage: `url(${item.avatar})`}}></div>
                                </div>
                                <div className={'rightava'}>
                                    <span
                                        className={item.post.category === null ? '' : 'cate'}>{item.post.category}</span>
                                    <Link to={'/edit/' + item.post.id}>
                                        <span className={'name'}>{item.post.title}</span>
                                    </Link>
                                    <div className={'infor'}>
                                        <div className={'infoleft'}>
                                            <span className={'infosp'}>{item.nickname}</span>
                                            <span className={'infosp'}>LV0</span>
                                            <span className={'infosp'}>{item.post.updatedAt}</span>
                                            <span className={'infosp infonum'}>
                                                {!item.favorite ?
                                                    <img className={'wjx'} src={wjx} alt=""/> :
                                                    <svg t="1621585513450" className="wjx icon " viewBox="0 0 1024 1024"
                                                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2384"
                                                         width="16" height="16">
                                                        <path
                                                            d="M511.872 0l168.64 321.728 343.168 69.312L784.768 659.2l43.392 364.544-316.288-156.032-316.352 156.032L238.784 659.2 0 391.104l343.168-69.312L511.872 0"
                                                            p-id="2385" fill="#d81e06"></path>
                                                    </svg>
                                                }
                                        {item.post.favoriteCount}
                                    </span>
                                        </div>
                                        <div className={'inforight'}>
                                    <span>
                                        <img className={'wjx'} src={eye} alt=""/>
                                    </span>
                                            <span>{item.post.viewCount}</span>
                                            <span>
                                        <img className={'wjx'} src={information} alt=""/>
                                    </span>
                                            <span>{item.post.replyCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={'page'}>
                        <div className={'pageweek'}>
                            <div>到底了</div>
                        </div>
                        <div className={'pagetotal'}>
                            <span>共{total}条</span>
                            <span className={'sp12'} onClick={() => {
                                if (page >= 2) {
                                    setPage(Number(page) - 1)
                                    if (page == 1) {
                                        document.getElementsByClassName('sp12')[0].style.color = '#ddd'
                                    }
                                }
                            }}> ＜ </span>
                            {showPage()}
                            <span className={'sp12'} onClick={() => {
                                if (page === pages) {
                                    document.getElementsByClassName('sp12')[1].style.color = '#ddd'
                                } else {
                                    setPage(Number(page) + 1)
                                    document.getElementsByClassName('sp12')[0].style.color = '#666'
                                }
                            }}>＞</span>
                            <select name="" id="" className={'sel'} onChange={(e) => {
                                setLimit(e.target.value)
                                setPage(1)
                            }}>
                                <option value="5">5条/页</option>
                                <option value="10">10条/页</option>
                                <option value="15">15条/页</option>
                            </select>
                            跳至
                            <input type="text" className={'sp3'} onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    setPage(e.target.value)
                                }
                            }}/>
                            页
                        </div>

                    </div>
                </div>
                <div className={'headright'}>
                    <div className={'hot'}>热门话题</div>
                    <div className={'hot1'}>
                        {hot.map((item, index) => {
                            return (
                                <span className={'title'} key={index}>{item.name}</span>
                            )
                        })}
                    </div>
                    <div className={'zj'}>最近访客</div>
                    <div className={'custom'}>
                        {/*访客*/}
                        {visitor.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className={'pic'}>
                                        <div>
                                            <img className={'wx'} src={item.avatar} alt=""/>
                                        </div>
                                        <div className={'visit'}>{item.username}</div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
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
                </div>
            </div>
        </div>
    );
}

export default withRouter(Home);