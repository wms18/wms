import {withRouter} from 'react-router-dom'
import React,{useEffect} from 'react'
function First(props) {

    return (
        <div className={'information'}>
            <div className={'infomationr'}>
                <div className={'sg'}>
                    <span>施工中~~ 敬请期待~~</span>
                </div>
            </div>
        </div>
    )
}

export default withRouter(First)
