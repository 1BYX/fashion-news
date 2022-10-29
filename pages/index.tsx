import React, { Component } from 'react'
import getNewsArticles from '../utils/getNewsArticles'
import styles from '../styles/news.module.css'
import Button from '@mui/material/Button'
import { Dialog } from '@mui/material'
import Router from 'next/router'
import { withRouter } from 'next/router'

interface IProps {
  router: any
}

interface IState {
  newsArticles: Array<{
    title: string
    url: string
    imageUrl: string
    description: string
  }>
  offset: number
  isEnd: boolean
  openDialog: {
    id: number
    title: string
  }
}

const DEFAULT_IMAGE =
  'https://fashionunited.info/global-assets/img/default/fu-default_1200x630_black-favicon.jpg'

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
    this.state = {
      newsArticles: [],
      offset: 0,
      isEnd: false,
      openDialog: { id: 0, title: '' },
    }
  }

  async componentDidMount() {
    const variables = {
      keywords: ['hunkemoller'],
    }
    const result = await getNewsArticles(variables)
    this.setState({
      newsArticles: result.fashionunitedNlNewsArticles,
    })
  }

  async loadMore() {
    const variables = {
      keywords: ['hunkemoller'],
    }
    const result = await getNewsArticles(variables, this.state.offset + 12)
    this.setState({
      newsArticles: [
        ...this.state.newsArticles,
        ...result.fashionunitedNlNewsArticles,
      ],
      offset: this.state.offset + 12,
    })
    if (result.fashionunitedNlNewsArticles.length == 0) {
      this.setState({
        isEnd: true,
      })
    }
  }

  async loadNew(_id: number) {
    const variables = {
      keywords: ['hunkemoller'],
    }
    const result = await getNewsArticles(variables, _id, 1)
    this.setState({
      newsArticles: [
        ...this.state.newsArticles,
        ...result.fashionunitedNlNewsArticles,
      ],
    })
  }

  setDialog(_id: number, _title: string, close?: boolean) {
    this.setState({
      openDialog: {
        id: _id,
        title: _title,
      },
    })

    if (!close) {
      Router.push(
        {
          query: { id: _id, title: _title },
        },
        undefined,
        { shallow: true }
      )
    } else {
      Router.push(
        {
          query: {},
        },
        undefined,
        { shallow: true }
      )
    }
  }

  newsArticles() {
    const { query } = this.props.router

    return this.state.newsArticles.map((newsArticle, index) => (
      <>
        <div
          key={index}
          className={styles.news__card}
          onClick={() => this.setDialog(index, newsArticle.title)}>
          <div className={styles.news__card__image}>
            <img src={newsArticle.imageUrl || DEFAULT_IMAGE} />
          </div>
          <h2 className={styles.news__card__head}>{newsArticle.title}</h2>
          <div className={styles.news__card__actions}>
            <a href={newsArticle.url}>Read more</a>
          </div>
        </div>
        <Dialog
          open={index == query.id && newsArticle.title == query.title}
          onClose={() => this.setDialog(0, '', true)}>
          <img src={newsArticle.imageUrl || DEFAULT_IMAGE} />
          <h2 className={styles.news__card__head}>{newsArticle.title}</h2>
          <div className={styles.news__dialog__description}>
            {newsArticle.description}
          </div>
          <div className={styles.news__card__actions}>
            <a href={newsArticle.url}>Read more</a>
          </div>
        </Dialog>
      </>
    ))
  }

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.App__inner}>
          <h1 className={styles.App__title}>Fashion News</h1>
          <div className={styles.news__wrapper}>{this.newsArticles()}</div>
          {!this.state.isEnd && (
            <div className={styles.news__loadMore}>
              <Button variant='contained' onClick={this.loadMore}>
                load more
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default withRouter(App)
