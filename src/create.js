import React,{useState,useEffect} from 'react'
import axios from "axios";
import  qs from 'qs'
function Create(props) {
    let [title,setTitle] = useState('')
    let [cont,setCont] = useState('')
    let [tag,setTag] = useState('')
    let [id,setId] = useState('')
    let handle = () =>{
        if (title === ''){
            alert('请输入标题')
            return
        }
        if (cont === ''){
            alert('请输入内容')
            return
        }
        axios({
            method:'post',
            url:'http://xueba.it266.com:8081/api/post/create',
            params:{
                token:localStorage.getItem('token')
            },
            data:qs.stringify({
                categoryId:id,
                title:title,
                tag:tag,
                content:cont,
                status:1
            })
        }).then((response)=>{
            console.log(response)
            if (response.status === 200){
                alert('发表成功')
                props.history.push('/')
                setId('')
                setTag('')
                setTitle('')
                setCont('')
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    useEffect(()=>{
        axios({
            method:'get',
            url:'http://xueba.it266.com:8081/api/post/categories?status=1',
        }).then((response)=>{
            // console.log(response.data.data)

        }).catch((error)=>{
            alert(error)
        })
    })
    return(
        <div className={'create'}>
            <div className={'creart'}>
                <span>发表新帖</span>
            </div>
            <div className={'creinp'}>
                <span className={'cresp'}>标题</span>
                <input type="text" className={'creinpt'} placeholder={'请输入标题'} value={title} onChange={(e)=>{
                  title= e.target.value
                    setTitle(title)
                }}/>
            </div>
            <div className={'cretext'}>
                <textarea  value={cont} onChange={(e)=>{
                    cont=e.target.value
                    setCont(cont)
                }} >{cont}</textarea>
            </div>
            <div className={'creinp'}>
                <span className={'cresp'}>标签</span>
                <input type="text" className={'creinpt'} placeholder={'输入标签，以英文逗号,分割'} onChange={(e)=>{
                    tag = e.target.value
                    setTag(tag)
                }}/>
            </div>
            <div className={'creinp'}>
                <span className={'cresp'}>所在专栏</span>
                <select name="" id="" onChange={(e)=>{
                    console.log(e.target.value)
                    id = e.target.value
                    setId(id)
                }}>
                    <option value="">请选择</option>
                    <option value="1">其他</option>
                    <option value="2">提问</option>
                    <option value="3">分享</option>
                    <option value="4">建议</option>
                    <option value="5">讨论</option>
                    <option value="6">公告</option>
                    <option value="7">动态</option>
                </select>
            </div>
            <div className={'creinp'}>
                <span className={'cresp'}>阅读权限</span>
                <select name="" id="">
                    <option value="">默认,所有用户可见</option>
                    <option value="">隐藏,仅个人空间中可见</option>
                </select>
                <span className={'creimp'}>除非有重要信息，不然建议设置所有用户可见，这样不会影响您帖子的人气，点击查看用户权限</span>
            </div>
                <button className={'crebtn'} onClick={handle}>立即发布</button>
        </div>
    )
}
export default Create
