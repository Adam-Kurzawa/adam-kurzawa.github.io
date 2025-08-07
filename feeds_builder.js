import fs from 'fs'
import { Feed } from 'feed'

const ASSETS_DIR = '/Users/user/IntelliJ IDEA/personal_website/adam-kurzawa.github.io/src/assets'
const STORIES_INDEX_FILE = ASSETS_DIR + '/stories_idx.json'
const ARTICLES_INDEX_FILE = ASSETS_DIR + '/articles_idx.json'

const storiesIndexFile = JSON.parse(fs.readFileSync(STORIES_INDEX_FILE, { encoding: 'utf8' }))
const articlesIndexFile = JSON.parse(fs.readFileSync(ARTICLES_INDEX_FILE, { encoding: 'utf8' }))

const siteUrl = 'https://adamkurzawa.pl'
const year = new Date().getFullYear()

const feedCommons = {
    title: 'Alternata',
    id: siteUrl,
    link: siteUrl,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${year} Adam Kurzawa`,
    author: {
        name: 'Adam Kurzawa',
        email: 'the.alternata@gmail.com',
        link: siteUrl
    }
}

const feed_PL = new Feed({
    ...feedCommons,
    description: 'Autorski blog sci-fi Adama Kurzawy',
    language: 'pl',
    feedLinks: {
        rss: `${siteUrl}/pl/rss.xml`,
        atom: `${siteUrl}/pl/atom.xml`,
        json: `${siteUrl}/pl/feed.json`
    }
})

const feed_EN = new Feed({
    ...feedCommons,
    description: 'Adam Kurzawa – Original Science Fiction Blog',
    language: 'en',
    feedLinks: {
        rss: `${siteUrl}/en/rss.xml`,
        atom: `${siteUrl}/en/atom.xml`,
        json: `${siteUrl}/en/feed.json`
    }
})

const buildFeeds = (feed, lang, stories, articles) => {
    stories.forEach(story => {
        feed.addItem({
            title: story.title,
            id: story.key,
            link: `${siteUrl}/${lang}/${story.key}`,
            description: story.series,
            date: new Date(story.year, 3)
        })
    })

    fs.writeFileSync(`./public/${lang}/rss.xml`, feed.rss2())
    fs.writeFileSync(`./public/${lang}/atom.xml`, feed.atom1())
    fs.writeFileSync(`./public/${lang}/feed.json`, feed.json1())
}

buildFeeds(feed_PL, 'pl', storiesIndexFile.pl, articlesIndexFile)
buildFeeds(feed_EN, 'en', storiesIndexFile.en, articlesIndexFile)
