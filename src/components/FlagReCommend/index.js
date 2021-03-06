import React, { Component } from 'react'
import { Timeline, Icon, Skeleton } from 'antd'
import { connect } from 'react-redux'
import { setArticles } from '../../redux/actions/discuss'
import BookMark from '../common/BookMark/index'
import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
import './index.less'

class FlagReCommend extends Component {

    componentDidMount() {
        this.getArticle() 
    }
    handleClickItem = (id,e) => {
        this.props.history.push(`/detail/${id}`)
    }
    getArticle = async () => {
        const res = await ajax('/getArticles')
        const { code, data } = parseData(res)
        if (code === 0) {
            this.props.handleSetArticles(data)
        }
    }
    render() {
        const { articles } = this.props
        return (
            <div className='recommend'>
                <BookMark
                    content="文章推荐"
                    width="120px"
                    color="rgb(47, 223, 7)"
                    top='30px'
                />
                {
                     articles.length === 0? <Skeleton active /> : null
                }
                <Timeline>

                    {
                        articles && articles.map(item => {
                            return (
                                <Timeline.Item 
                                    dot={<Icon type="clock-circle-o" />} 
                                    className='timeline'
                                    key={item.id}
                                >

                                    <div className='times'>{item.date}</div>
                                    <div className='recommend-item'>
                                        <div className='recommend-item-img'  onClick={this.handleClickItem.bind(this,item.id)}>
                                            <img src={item.image} alt=""/>
                                        </div>
                                        <div className='recommend-item-content'>
                                            <h3  onClick={this.handleClickItem.bind(this,item.id)}>{item.title}</h3>
                                            <p >{item.content}</p>
                                        </div>
                                    </div>
                                </Timeline.Item>
                            )
                        })
                    }

                </Timeline>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    articles: state.discuss.articles
})

const mapDispatchToProps = dispatch => ({
    handleSetArticles(data) {
        dispatch(setArticles(data))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FlagReCommend)