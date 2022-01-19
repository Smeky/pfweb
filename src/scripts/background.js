import * as pixi from "pixi.js"
import { KawaseBlurFilter } from "pixi-filters"

pixi.utils.skipHello()

const LineShowRadius = 250
const MaxConnectionDistance = 150
const MaxPointSpeed = 30
const ParticlesPer100PxSqrd = 1
const FadeInSpeed = 1
const FadeOutSpeed = 2

const Vec2 = {
    distance: (a, b) => Math.hypot(b.x - a.x, b.y - a.y)
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
    return Math.floor((width * height) / (ParticlesPer100PxSqrd * 100 ** 2))
}

function createParticles(count, texture) {
    const particles = []

    for (let i = 0; i < count; i++) {
        const particle = new pixi.Sprite(texture)
        const scale = 0.1 + Math.random() * 0.9
        
        particle.index = i
        particle.alpha = 0.2 + Math.random() * 0.8
        particle.anchor.set(0.5, 0.5)
        particle.scale.x = scale
        particle.scale.y = scale
        particle.velocity = { x: 0, y: 0 }

        particles.push(particle)
    }

    return particles
}

function resetParticles(particles, stageWidth, stageHeight) {
    particles.forEach(({ position, velocity }) => {
        position.x = stageWidth  * Math.random()
        position.y = stageHeight * Math.random()
        velocity.x = MaxPointSpeed - Math.random() * (MaxPointSpeed * 2)
        velocity.y = MaxPointSpeed - Math.random() * (MaxPointSpeed * 2)
    })
}

function translateParticles(particles, delta, stageWidth, stageHeight) {
    particles.forEach(({ position, velocity }) => {
        position.x += velocity.x * delta
        position.y += velocity.y * delta

        // Bounce
        if (position.x < 0 || position.x > stageWidth) {
            velocity.x = -velocity.x
        }

        if (position.y < 0 || position.y > stageHeight) {
            velocity.y = -velocity.y
        }
    })
}

function getConnections(particles, mouseX, mouseY) {
    const connectables = particles.filter((particle) => {
        // First two lines should be a faster check (Todo: check if its true)
        return  Math.abs(particle.position.x - mouseX) < LineShowRadius &&
                Math.abs(particle.position.y - mouseY) < LineShowRadius &&
                Vec2.distance(particle.position, { x: mouseX, y: mouseY }) < LineShowRadius
    })

    return connectables.reduce((connections, particle, index) => {
        for (const other of connectables.slice(index + 1)) {
            const distance = Vec2.distance(particle.position, other.position)

            if (distance < MaxConnectionDistance && !connections.some(([from, to]) => to === particle.index && from === other.index)) {
                connections.push([particle.index, other.index])
            }
        }

        return connections
    }, [])
}

function updateLines(lines, particles, connections) {
    lines.clear()

    connections.forEach(([from, to]) => {
        const fromPos  = particles[from].position
        const toPos    = particles[to].position
        const distance = Vec2.distance(fromPos, toPos)
        const ratio    = 1 - distance / MaxConnectionDistance

        lines.lineStyle(0.3 + ratio * 0.7, 0xffffff, ratio)
        lines.moveTo(fromPos.x, fromPos.y)
        lines.lineTo(toPos.x, toPos.y)
    })

    lines.endFill()
}

export default class Background {
    States = {
        Loading: "loading",
        Stopped: "stopped",
        Running: "running",
        Stopping: "stopping",
        Resetting: "resetting",
    }

    constructor() {
        this.state = this.States.Loading
    
        this.state = this.States.Stopped
        this.setup()
    }

    setup() {
        this.app = new pixi.Application({
            backgroundAlpha: 0,
            view: document.getElementById("background"),
            width: window.innerWidth,
            height: window.innerHeight,
        })

        const { width, height } = getPageSize()
        this.stageWidth = width
        this.stageHeight = height
        
        this.particles = []
        this.lines = this.app.stage.addChild(new pixi.Graphics())

        this.ticker = new pixi.Ticker()
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
            const graphics = new pixi.Graphics()
            graphics.beginFill(0xffffff)
            graphics.drawCircle(0, 0, 2)
            graphics.endFill()
        
            this.particleTexture = this.app.renderer.generateTexture(graphics) 
        }
        
        this.reset()
    }

    setupMask() {
        const g = new pixi.Graphics()
        g.beginFill(0xffffff)
        g.drawCircle(0, 0, LineShowRadius * 0.7)
        g.endFill()
        g.filters = [new KawaseBlurFilter(20, 20)]
        
        const offset = 50
        const region = { ...g.getLocalBounds() }

        region.x -= offset
        region.y -= offset
        region.width += offset * 2
        region.height += offset * 2

        const texture = this.app.renderer.generateTexture(g, { region })

        this.lines.alpha = 0.6
        this.lines.mask = new pixi.Sprite(texture)
        this.lines.mask.anchor.set(0.5, 0.5)
        this.app.stage.addChild(this.lines.mask)
    }

    update = (time) => {
        if (this.state === this.States.Stopped) {
            return
        }

        const delta = time / 60

        translateParticles(this.particles, delta, this.stageWidth, this.stageHeight)
        
        const connections = getConnections(this.particles, this.mousePos.x, this.mousePos.y)
        updateLines(this.lines, this.particles, connections)

        if (this.fadeSpeed !== 0) {
            this.updateFade(delta)
        }
    }

    updateFade(delta) {
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

    updateParticleCount() {
        const currentCount = this.particles.length
        const targetCount = calcParticleCount(this.stageWidth, this.stageHeight)

        if (currentCount < targetCount) {
            const newParticles = createParticles(targetCount - currentCount, this.particleTexture)

            this.particles = this.particles.concat(newParticles)
            this.app.stage.addChild(...newParticles)
        }
        else if (currentCount > targetCount) {
            const removed = this.particles.splice(currentCount - (currentCount - targetCount))
            this.app.stage.removeChild(...removed)
        }
    }

    updateStageSize() {
        const { width, height } = getPageSize()
        this.stageWidth = width
        this.stageHeight = height
        
        this.app.renderer.resize(window.innerWidth, window.innerHeight)
    }

    startFadeIn() {
        this.fadeSpeed = FadeInSpeed
    }

    startFadeOut() {
        this.fadeSpeed = - FadeOutSpeed
    }

    run() {
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
        this.updateParticleCount()
        resetParticles(this.particles, this.stageWidth, this.stageHeight)
    }

    destroy() {
        this.app.destroy()
    }

    handleMouseMove = (event) => {
        const { x, y } = event.data.global
        this.mousePos.x = x - this.app.stage.position.x
        this.mousePos.y = y - this.app.stage.position.y

        this.lines.mask.position.copyFrom(this.mousePos)
    }

    handleWindowResize = () => {
        if (this.windowResizeTimeout) {
            clearTimeout(this.windowResizeTimeout)
        }
        else {
            this.startFadeOut()
            this.state = this.States.Resetting
        }

        this.windowResizeTimeout = setTimeout(() => {
            this.updateStageSize()
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

    setScroll(value) {
        this.app.stage.position.y = -value
    }
}
