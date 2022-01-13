
const LineShowRadius = 250
const MaxConnectionDistance = 150
const MaxPointSpeed = 30
const ParticlesPer1000PxSqrd = 0.1
const FadeInSpeed = 1
const FadeOutSpeed = 2

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

function getPageSize() {
    const html = document.documentElement
    const body = document.body

    return {
        width: window.innerWidth,
        height: Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight,
        )
    }
}

function calcParticleCount(width, height) {
    return Math.floor((width * height) / 1000 * ParticlesPer1000PxSqrd)
}

export default class Background {
    States = {
        Loading: "loading",
        Stopped: "stopped",
        Running: "running",
        Stopping: "stopping",
        Resetting: "resetting",
    }

    get stageWidth() { return this.app.renderer.width }
    get stageHeight() { return this.app.renderer.height }

    constructor() {
        this.state = this.States.Loading
        this.autoRun = false
    
        this.load()
            .then(() => {
                this.state = this.States.Stopped
                this.setup()

                if (this.autoRun) {
                    this.run()
                }
            })
    }

    async load() {
        this.pixi = await import("pixi.js")
        this.pixi.utils.skipHello()

        const { KawaseBlurFilter } = await import ("@pixi/filter-kawase-blur")
        this.blurFilter = new KawaseBlurFilter(20, 20)
    }

    setup() {
        const { width, height } = getPageSize()

        this.app = new this.pixi.Application({
            antialias: true,
            backgroundAlpha: 0,
            view: document.getElementById("background"),
            width,
            height,
        })
        
        this.particles = []
        this.lines = this.app.stage.addChild(new this.pixi.Graphics())
        this.ticker = new this.pixi.Ticker()
        this.mousePos = { x: 0, y: 0 }
        this.fadeSpeed = 0
        this.windowResizeTimeout = null

        this.setupParticles()
        this.setupMask()

        this.ticker.add(this.update)

        this.app.stage.alpha = 0
        this.app.stage.interactive = true
        this.app.stage.on("mousemove", this.handleMouseMove)
        window.addEventListener("resize", this.handleWindowResize)
    }

    setupParticles() {
        {   // Create particle texture
            const graphics = new this.pixi.Graphics()
            graphics.beginFill(0xffffff)
            graphics.drawCircle(0, 0, 2)
            graphics.endFill()
        
            this.particleTexture = this.app.renderer.generateTexture(graphics) 
        }
        
        this.updateParticleCount()
        this.resetAllParticles()
    }

    setupMask() {
        const g = new this.pixi.Graphics()
        g.beginFill(0xffffff)
        g.drawCircle(0, 0, LineShowRadius * 0.7)
        g.endFill()
        g.filters = [this.blurFilter]
        
        const offset = 50
        const region = { ...g.getLocalBounds() }

        region.x -= offset
        region.y -= offset
        region.width += offset * 2
        region.height += offset * 2

        const texture = this.app.renderer.generateTexture(g, { region })

        this.lines.alpha = 0.6
        this.lines.mask = new this.pixi.Sprite(texture)
        this.lines.mask.anchor.set(0.5, 0.5)
        this.app.stage.addChild(this.lines.mask)
    }

    update = (time) => {
        if (this.state === this.States.Stopped) {
            return
        }

        const delta = time / 60

        this.updateParticles(delta)
        this.updateConnections()
        this.updateFade(delta)

        this.redrawLines()
    }

    updateParticles(delta) {
        for (const { position, velocity } of this.particles) {
            position.x += velocity.x * delta
            position.y += velocity.y * delta
    
            // Bounce
            if (position.x < 0 || position.x > this.stageWidth) {
                velocity.x = -velocity.x
            }
    
            if (position.y < 0 || position.y > this.stageHeight) {
                velocity.y = -velocity.y
            }
        }
    }

    updateConnections() {
        const connectables = this.particles.filter((particle) => {
            // First two lines should be a faster check (Todo: check if its true)
            return  Math.abs(particle.position.x - this.mousePos.x) < LineShowRadius &&
                    Math.abs(particle.position.y - this.mousePos.y) < LineShowRadius &&
                    Vec2.distance(particle.position, this.mousePos) < LineShowRadius
        })

        this.connections = connectables.reduce((connections, particle, index) => {
            for (const other of connectables.slice(index + 1)) {
                const distance = Vec2.distance(particle.position, other.position)
    
                if (!(particle.index in connections)) {
                    connections[particle.index] = []
                }
    
                connections[particle.index].push([other.index, distance])
            }
    
            return connections
        }, {})
    }

    updateFade(delta) {
        if (this.fadeSpeed !== 0) {
            const { stage } = this.app

            stage.alpha += this.fadeSpeed * delta

            if (stage.alpha < 0) {
                stage.alpha = 0
                this.fadeSpeed = 0
                
                this.onFadeOut()
            }
            else if (stage.alpha > 1) {
                stage.alpha = 1
                this.fadeSpeed = 0

                this.onFadeIn()
            }
        }
    }

    updateParticleCount() {
        const currentCount = this.particles.length
        const targetCount = calcParticleCount(this.stageWidth, this.stageHeight)

        if (currentCount < targetCount) {
            for (let i = currentCount; i < targetCount; i++) {
                const scale = 0.1 + Math.random() * 0.9
                const particle = new this.pixi.Sprite(this.particleTexture)
                
                particle.index = i
                particle.alpha = 0.2 + Math.random() * 0.8
                particle.anchor.set(0.5, 0.5)
                particle.scale.x = scale
                particle.scale.y = scale
        
                this.particles.push(particle)
                this.app.stage.addChild(particle)
            }
        }
        else if (currentCount > targetCount) {
            const removed = this.particles.splice(currentCount - (currentCount - targetCount))
            this.app.stage.removeChild(...removed)
        }
    }

    resetAllParticles() {
        for (const particle of this.particles) {
            particle.position.x = this.stageWidth * Math.random()
            particle.position.y = this.stageHeight * Math.random()
            particle.velocity = { 
                x: MaxPointSpeed - Math.random() * (MaxPointSpeed * 2),
                y: MaxPointSpeed - Math.random() * (MaxPointSpeed * 2),
            }
        }
    }

    redrawLines() {
        this.lines.clear()

        for (const [fromIndex, connectees] of Object.entries(this.connections)) {
            for (const [toIndex, distance] of connectees) {
                const fromPos = this.particles[fromIndex].position
                const toPos   = this.particles[toIndex].position
                const ratio = 1 - distance / MaxConnectionDistance

                this.lines.lineStyle(0.3 + ratio * 0.7, 0xffffff, ratio)
                this.lines.moveTo(fromPos.x, fromPos.y)
                this.lines.lineTo(toPos.x, toPos.y)
            }
        }

        this.lines.endFill()
    }

    startFadeIn() {
        this.fadeSpeed = FadeInSpeed
    }

    startFadeOut() {
        this.fadeSpeed = - FadeOutSpeed
    }

    run() {
        if (this.state === this.States.Loading) {
            this.autoRun = true
            return
        }

        this.state = this.States.Running
        this.startFadeIn()
        
        if (!this.ticker.started) {
            this.ticker.start()
        }
    }
    
    stop() {
        this.state = this.States.Stopping
        this.startFadeOut()
    }

    reset() {
        const { width, height } = getPageSize()
        this.app.renderer.resize(width, height)

        this.updateParticleCount()
        this.resetAllParticles()
    }

    handleMouseMove = (event) => {
        const { x, y } = event.data.global
        this.mousePos.x = x
        this.mousePos.y = y
        
        this.lines.mask.position.copyFrom(this.mousePos)
    }

    handleWindowResize = (event) => {
        if (this.windowResizeTimeout) {
            clearTimeout(this.windowResizeTimeout)
        }
        else {
            this.startFadeOut()
            this.state = this.States.Resetting
        }

        this.windowResizeTimeout = setTimeout(() => {
            this.reset()
            this.run()

            this.windowResizeTimeout = null
        }, 700)
    }

    onFadeIn() {

    }

    onFadeOut() {
        if (this.state === this.States.Stopping) {
            this.state = this.States.Stopped
        }
    }
}
