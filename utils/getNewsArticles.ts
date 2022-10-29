import { request } from 'graphql-request'
const endpoint = 'https://fashionunited.info/graphql/'

let query = `
query NewsArticles($keywords: [String]) {
fashionunitedNlNewsArticles(keywords: $keywords, offset: 0, limit: 12) {
title
url
imageUrl
description
}

}
`
export default function getNewsArticles(variables = {}, _offset = 0) {
  updateQuery(_offset)
  return request(endpoint, query, variables)
}

function updateQuery(_offset: number) {
  query = `
    query NewsArticles($keywords: [String]) {
    fashionunitedNlNewsArticles(keywords: $keywords, offset: ${_offset}, limit: 12) {
    title
    url
    imageUrl
    description
    }
    
    }
    `
}
