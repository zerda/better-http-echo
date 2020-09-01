const Koa = require('koa')
const app = new Koa()
const hostname = require('os').hostname()

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

app.use(async (ctx) => {
    const ms = parseInt(ctx.query['delay']) || 0
    if (ms > 0) {
        await delay(ms)
    }
    ctx.status = parseInt(ctx.query['status']) || 200
    const body = ctx.query['body']
    if (body) {
        ctx.body = body
    } else {
        ctx.body = {
            'method': ctx.method,
            'url': ctx.url,
            'status': ctx.status,
            'delay': ms,
            'content': ctx.query['content'] || 'DEFAULT CONTENT',
            'server': hostname
        }
    }
})

const port = parseInt(process.env.PORT) || 3000
app.listen(port, () => console.log(`Listening on ${port}`))
