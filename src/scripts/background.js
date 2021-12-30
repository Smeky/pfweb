
const LineShowRadius = 300
const MaxConnectionDistance = 120
const MaxPointSpeed = 30
const ParticlesPer1000PxSqrd = 0.2
const DebugEnabled = false

const Vec2 = {
    add: (a, b) => ({ x: a.x + b.x, y: a.y + b.y }),
    subtract: (a, b) => ({ x: a.x - b.x, y: a.y - b.y }),
    distance: (a, b) => Math.hypot(b.x - a.x, b.y - a.y),
    dot: (a, b) => a.x * b.x + a.y * b.y,
    angle: (a, b) => Math.atan2(b.y - a.y, b.x - a.x),
}

let timedFn = null
let totalTime = 0
let callCount = 0

function timeIt(fn, ...args) {
    if (timedFn !== fn) {
        timedFn = fn
        callCount = 0
        totalTime = 0
    }

    const start = performance.now() 
    const res = fn(...args)
    const end = performance.now()
    
    totalTime += end - start
    callCount++

    // Estimate 60 calls per second
    if (callCount > 0 && callCount % 60 === 0) {
        console.log(`timeIt avg ${totalTime / callCount}`)
    }

    return res
}

function createMaskTexture(pixi, app, blurFilter) {
    const g = new pixi.Graphics()
    g.beginFill(0xffffff)
    g.drawCircle(0, 0, LineShowRadius * 0.7)
    g.endFill()
    g.filters = [blurFilter]
    
    const offset = 50
    const region = { ...g.getLocalBounds() }

    region.x -= offset
    region.y -= offset
    region.width += offset * 2
    region.height += offset * 2

    return app.renderer.generateTexture(g, { region })
}

function createParticleTexture(pixi, app) {
    const graphics = new pixi.Graphics()
    graphics.beginFill(0xffffff)
    graphics.drawCircle(0, 0, 2)
    graphics.endFill()

    return app.renderer.generateTexture(graphics)
}

function createParticles(pixi, texture, count, stageWidth, stageHeight) {
    const particles = []
    
    for (let i = 0; i < count; i++) {
        const scale = 0.1 + Math.random() * 0.9
        const particle = new pixi.Sprite(texture)
        
        particle.index = i
        particle.alpha = 0.2 + Math.random() * 0.8
        particle.anchor.set(0.5, 0.5)
        particle.scale.x = scale
        particle.scale.y = scale
        particle.position.x = stageWidth * Math.random()
        particle.position.y = stageHeight * Math.random()
        particle.velocity = { 
            x: MaxPointSpeed - Math.random() * (MaxPointSpeed * 2),
            y: MaxPointSpeed - Math.random() * (MaxPointSpeed * 2),
        }

        particles.push(particle)
    }

    return particles
}

function updateParticles(delta, particles, stageWidth, stageHeight) {
    for (const particle of particles) {
        const { position, velocity } = particle

        position.x += velocity.x * delta
        position.y += velocity.y * delta

        // Bounce
        if (position.x < 0 || position.x > stageWidth) {
            velocity.x = -velocity.x
        }

        if (position.y < 0 || position.y > stageHeight) {
            velocity.y = -velocity.y
        }
    }
}

function getConnections(particles) {
    return particles.reduce((connections, particle, index) => {
        for (const other of particles.slice(index + 1)) {
            const distance = Vec2.distance(particle.position, other.position)

            if (!(particle.index in connections)) {
                connections[particle.index] = []
            }

            connections[particle.index].push([other.index, distance])
        }

        return connections
    }, {})
}

function redrawLines(lines, particles, connections) {
    lines.clear()

    for (const [fromIndex, connectees] of Object.entries(connections)) {
        for (const [toIndex, distance] of connectees) {
            const fromPos = particles[fromIndex].position
            const toPos = particles[toIndex].position
            const ratio = 1 - distance / MaxConnectionDistance

            lines.lineStyle(0.3 + ratio * 0.7, 0xffffff, ratio)
            lines.moveTo(fromPos.x, fromPos.y)
            lines.lineTo(toPos.x, toPos.y)
        }
    }

    lines.endFill()
}

async function runAnimation() {
    const pixi = await import("pixi.js")
    const { KawaseBlurFilter } = await import ("@pixi/filter-kawase-blur")

    pixi.utils.skipHello()

    const stageWidth = window.innerWidth
    const stageHeight = Math.max(window.innerHeight, 600)
    const app = new pixi.Application({
        antialias: true,
        backgroundAlpha: 0,
        view: document.getElementById("background"),
        width: stageWidth,
        height: stageHeight
    })

    const particleCount = Math.floor((stageWidth * stageHeight) / 1000 * ParticlesPer1000PxSqrd)
    const particleTex = createParticleTexture(pixi, app)
    const particles = createParticles(pixi, particleTex, particleCount, stageWidth, stageHeight)
    const lines = new pixi.Graphics()
    const ticker = new pixi.Ticker()
    const mousePos = { x: 0, y: 0 }

    lines.mask = new pixi.Sprite(createMaskTexture(pixi, app, new KawaseBlurFilter(20, 20)))
    lines.mask.anchor.set(0.5, 0.5)

    // app.stage.mask = mask
    app.stage.addChild(lines.mask)
    app.stage.addChild(...particles)
    app.stage.addChild(lines)

    app.stage.interactive = true
    app.stage.on("mousemove", (event) => {
        const { x, y } = event.data.global
        mousePos.x = x
        mousePos.y = y
        lines.mask.position.copyFrom(mousePos)
    })
    
    ticker.add((time) => {
        const delta = time / 60

        updateParticles(delta, particles, stageWidth, stageHeight)

        const connectables = particles.filter((particle) => {
                                // First two lines should be a faster check (Todo: check if its true)
                                return  Math.abs(particle.position.x - mousePos.x) < LineShowRadius &&
                                        Math.abs(particle.position.y - mousePos.y) < LineShowRadius &&
                                        Vec2.distance(particle.position, mousePos) < LineShowRadius
                            })

        const connections = getConnections(connectables)
        redrawLines(lines, particles, connections)
    })

    if (DebugEnabled) {
        const g = app.stage.addChild(new pixi.Graphics())

        ticker.add(() => {
            const p = particles[0]

            g.clear()
            g.lineStyle(1, 0xff0000)
            g.moveTo(p.position.x, p.position.y)
            g.lineTo(p.position.x + MaxConnectionDistance, p.position.y)
            g.drawCircle(p.position.x, p.position.y, MaxConnectionDistance)
            g.drawCircle(mousePos.x, mousePos.y, LineShowRadius)
            g.endFill()
        })
    }

    ticker.start()
}

export default {
    async mounted() {
        runAnimation()
    }
}
