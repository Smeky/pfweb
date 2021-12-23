function distance(first, second) {
    return Math.hypot(second.x - first.x, second.y - first.y)
    
    // return Math.sqrt((first.x - second.x) ** 2 + (first.y - second.y) ** 2)
}

function setupParticle(particle, stageWidth, stageHeight) {
    const maxPointSpeed = 100

    particle.position.x = stageWidth * Math.random()
    particle.position.y = stageHeight * Math.random()
    particle.velocity = { 
        x: maxPointSpeed - Math.random() * (maxPointSpeed * 2),
        y: maxPointSpeed - Math.random() * (maxPointSpeed * 2),
    }
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

    const particles = []

    for ( let i = 0; i < 100; i++ ) {
        const particle = new pixi.Graphics()
        particle.beginFill(0xffffff, 0.2 + Math.random() * 0.8)
        particle.drawCircle(0, 0, 0.5 + Math.random() * 1.5)
        particle.endFill()

        setupParticle(particle, stageWidth, stageHeight)

        app.stage.addChild(particle)
        particles.push(particle)
    }

    let mousePos = { x: 0, y: 0 }
    app.stage.interactive = true
    app.stage.on("mousemove", (event) => {
        mousePos.x = event.data.global.x
        mousePos.y = event.data.global.y
    })

    const ticker = pixi.Ticker.shared
    ticker.add((time) => {
        const delta = time / 60

        for(const p of particles) {
            p.position.x += p.velocity.x * delta
            p.position.y += p.velocity.y * delta

            // Bounce
            if (p.position.x < 0 || p.position.x > stageWidth) {
                p.velocity.x = -p.velocity.x
            }

            if (p.position.y < 0 || p.position.y > stageHeight) {
                p.velocity.y = -p.velocity.y
            }

            const distToMouse = distance(p.position, mousePos)
            const maxDistance = 300
            
            if (distToMouse < maxDistance) {
                if (!p.connection) {
                    p.connection = new pixi.Graphics()
                    app.stage.addChild(p.connection)
                }

                p.connection.clear()
                p.connection.lineStyle(1 - distToMouse / maxDistance, 0xffffff, 1 - distToMouse / maxDistance)
                p.connection.moveTo(p.position.x, p.position.y)
                p.connection.lineTo(mousePos.x, mousePos.y)
                p.connection.endFill()
            }
            else if (p.connection) {
                app.stage.removeChild(p.connection)
                p.connection = null
            }
        }
    })

    ticker.start()
}

export default {
    async mounted() {
        runAnimation()
    }
}
