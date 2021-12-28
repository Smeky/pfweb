
const MaxConnectionDistance = 120
const MaxPointSpeed = 30
const ParticlesPer1000PxSqrd = 0.2
const DebugEnabled = false

const Vec2 = {
    distance: (a, b) => Math.hypot(b.x - a.x, b.y - a.y)
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
    fn(...args)
    const end = performance.now()
    
    totalTime += end - start
    callCount++

    // Estimate 60 calls per second
    if (callCount > 0 && callCount % 60 === 0) {
        console.log(`timeIt avg ${totalTime / callCount}`)
    }
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
        particle.connections = []
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

function updateConnections(particles) {
    particles.forEach((particle) => {
        particle.connections = particles
            // Start searching from this particle's index (all previous are already checked)
            .slice(particle.index + 1)
            // Faster way to filter out all connections that are too distant (rectangle, not a precise radius circle)
            .filter((other) => {
                return particle.position.x - other.position.x < MaxConnectionDistance &&
                       particle.position.y - other.position.y < MaxConnectionDistance
            })
            .filter((other) => {
                return !particle.connections.some((connectee) => connectee === other.index)
            })
            .reduce((connections, other) => {
                if (MaxConnectionDistance >= Vec2.distance(particle.position, other.position)) {
                    connections.push(other.index)
                }1

                return connections
            }, particle.connections)
    })
}

function redrawLines(lines, particles) {
    lines.clear()

    for (const particle of particles) {
        particle.connections.forEach((connectee, index) => {
            const otherPos = particles[connectee].position
            const distance = Vec2.distance(particle.position, otherPos)

            if (distance > MaxConnectionDistance) {
                particle.connections.splice(index, 1)
            }
            else {
                const ratio = 1 - distance / MaxConnectionDistance

                lines.lineStyle(0.3 + ratio * 0.7, 0xffffff, ratio)
                lines.moveTo(particle.position.x, particle.position.y)
                lines.lineTo(otherPos.x, otherPos.y)
            }
        })
    }

    lines.endFill()
}

async function runAnimation() {
    const pixi = await import("pixi.js")
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

    app.stage.addChild(...particles)
    app.stage.addChild(lines)

    ticker.add((time) => {
        const delta = time / 60

        updateParticles(delta, particles, stageWidth, stageHeight)
        updateConnections(particles)
        
        redrawLines(lines, particles)
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
