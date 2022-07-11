import * as puppeteer from 'puppeteer'

interface Returno {
  aleatorioArroba: string
  maisArroba: string
}

export class FindArrobasServices {
  public async execute(url: string): Promise<Returno> {
    async function loadMore(page: puppeteer.Page, selector: string) {
      const moreButton = await page.$(selector)
      if (moreButton) {
        console.log('seletor existe')
        await page.click(selector)
        await page.waitForSelector(selector, { timeout: 3000 })
        await loadMore(page, selector)
      } else console.log('seletor nao existe')
    }

    async function getComments(page: puppeteer.Page, selector: string) {
      const comments = await page.$$eval(selector, links =>
        links.map(link => link.innerHTML)
      )
      return comments
    }

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)
    await page.screenshot({ path: 'example.png' })
    await page.waitForSelector('input[name="username"]')
    await page.type('input[name="username"]', 'wellison.s.hatake@gmail.com')
    await page.type('input[name="password"]', 'Luciana01251307')
    await page.click('button[type="submit"]')
    await page.waitForSelector('.JErX0 button[type="button"]')
    await page.click('.JErX0 button[type="button"]')

    await loadMore(
      page,
      '._ab8w._ab94._ab99._ab9h._ab9m._ab9p._abcj button[type="button"'
    )
    const comments = await getComments(page, '._a9zr span a')
    console.log(comments)

    const arrobas = {
      aleatorioArroba: comments[Math.floor(Math.random() * comments.length)],
      maisArroba: comments[Math.floor(Math.random() * comments.length)]
    }

    return arrobas
  }
}
