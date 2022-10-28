import React, { Component } from 'react'
import getNewsArticles from '../utils/getNewsArticles'

const DEFAULT_IMAGE =
  'https://fashionunited.info/global-assets/img/default/fu-default_1200x630_black-favicon.jpg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { newsArticles: [] }
  }

  async componentWillMount() {
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
      <div key={index}>
        <h2>{newsArticle.title}</h2>
        <img src={newsArticle.imageUrl || DEFAULT_IMAGE} />
        <div>
          {newsArticle.description} <a href={newsArticle.url}>Read more</a>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className='App'>
        <h1>Fashion News</h1>
        <div>{this.newsArticles()}</div>
      </div>
    )
  }
}
export default App
