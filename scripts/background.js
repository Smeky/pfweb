
const MaxParticleDistance = 300
const MaxPointSpeed = 100
const ParticleCount = 200

function distance(first, second) {
    return Math.hypot(second.x - first.x, second.y - first.y)
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
        
        particle.id = i + 1
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

function updateConnections(connections, particles, mousePos) {
    connections.clear()
    
    for (const particle of particles) {
        const distToMouse = distance(particle.position, mousePos)
        
        if (distToMouse < MaxParticleDistance) {
            connections.lineStyle(1 - distToMouse / MaxParticleDistance, 0xffffff, 1 - distToMouse / MaxParticleDistance)
            connections.moveTo(particle.position.x, particle.position.y)
            connections.lineTo(mousePos.x, mousePos.y)
        }
    }

    connections.endFill()
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

    const particleTex = createParticleTexture(pixi, app)
    const particles = createParticles(pixi, particleTex, ParticleCount, stageWidth, stageHeight)
    const connections = new pixi.Graphics()
    const ticker = pixi.Ticker.shared

    app.stage.addChild(...particles)
    app.stage.addChild(connections)

    let mousePos = { x: 0, y: 0 }
    app.stage.interactive = true
    app.stage.on("mousemove", (event) => {
        mousePos.x = event.data.global.x
        mousePos.y = event.data.global.y
    })

    ticker.add((time) => {
        const delta = time / 60

        updateParticles(delta, particles, stageWidth, stageHeight)
        updateConnections(connections, particles, mousePos)
    })

    ticker.start()
}

export default {
    async mounted() {
        runAnimation()
    }
}
