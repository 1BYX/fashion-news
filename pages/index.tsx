import React, { Component } from 'react'
import getNewsArticles from '../utils/getNewsArticles'
import styles from '../styles/news.module.css'

interface IProps {}

interface IState {
  newsArticles: Array<{
    title: string
    url: string
    imageUrl: string
    description: string
  }>
}

const DEFAULT_IMAGE =
  'https://fashionunited.info/global-assets/img/default/fu-default_1200x630_black-favicon.jpg'

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { newsArticles: [] }
  }

  async UNSAFE_componentWillMount() {
    const variables = {
      keywords: ['hunkemoller'],
    }
    const result = await getNewsArticles(variables)
    this.setState({
      newsArticles: result.fashionunitedNlNewsArticles,
    })
  }

  newsArticles() {
    return this.state.newsArticles.map((newsArticle, index) => (
      <div key={index} className={styles.news__card}>
        <div className={styles.news__card__image}>
          <img src={newsArticle.imageUrl || DEFAULT_IMAGE} />
        </div>
        <h2 className={styles.news__card__head}>{newsArticle.title}</h2>
        <div className={styles.news__card__actions}>
          {newsArticle.description} <a href={newsArticle.url}>Read more</a>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className={styles.App}>
        <h1 className={styles.App__title}>Fashion News</h1>
        <div className={styles.news__wrapper}>{this.newsArticles()}</div>
      </div>
    )
  }
}
export default App
