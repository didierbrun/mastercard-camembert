
class Camembert {

    static config = {
        padding: 10,
        revenusColor: '#f8ce5d',
        revenusLegendColor: '#f8b23d',
        chargesFixesColor: '#ea6e64',
        chargesCourantesColor: '#576eae',
        resteAVivreColor: '#000000',
        revenusThickness: 12,
        chargesThickness: 50,
        resteAVivreThickness: 10,
        chargesCourantesThickness: 16,
        chargesPadding: 20,
        paddingLabel: 30,
        legendLineThickness: 2,
        legendEpsilonAngle: 0.01,
        legendBulletRadius: 8

    }

    constructor(elementId, dimension, revenus, chargesFixes, chargesCourantes){
        this.dimension = dimension
        this.revenus = revenus
        this.chargesFixes = chargesFixes
        this.chargesCourantes = chargesCourantes
        this.divElement = document.getElementById(elementId)
        this.legends = this.divElement.getElementsByTagName('div')
        this.canvas = document.getElementById(elementId).getElementsByTagName('canvas')[0]
        this.setupProperties()
        this.setupCanvas()
    }

    update(dimension, revenus, chargesFixes, chargesCourantes){
        this.dimension = dimension
        this.revenus = revenus
        this.chargesFixes = chargesFixes
        this.chargesCourantes = chargesCourantes
        this.setupProperties()
        this.resizeCanvas()
        this.redraw()
        this.injectInlineCss()
    }

    setupCanvas(){
        this.resizeCanvas()
        this.context = this.canvas.getContext('2d')
        this.redraw()
        this.injectInlineCss()
    }

    injectInlineCss(){
        let legendWidth = (this.width - this.revenusRadius * 2.0 - Camembert.config.paddingLabel * 3.0) / 2.0

        this.divElement.style.position = "relative"
        this.divElement.style.widows = legendWidth + 'px'
        this.divElement.style.fontFamily = 'Raleway'
        this.divElement.style.fontSize = '22px'

        for (let legend of this.legends){
            legend.style.position = "absolute"
            legend.style.color = 'black'
            legend.style.display = 'block'
            legend.style.width = legendWidth + 'px'
            legend.style.transform = 'translate(0%, -50%)'
        }

        this.legends[0].style.textAlign = 'right'
        this.legends[0].style.paddingRight = Camembert.config.legendBulletRadius * 2.0 + 'px'
        this.legends[0].style.color = Camembert.config.revenusLegendColor
        this.legends[1].style.textAlign = 'right'
        this.legends[1].style.paddingRight = Camembert.config.legendBulletRadius * 2.0 + 'px'
        this.legends[1].style.color = Camembert.config.chargesFixesColor
        this.legends[2].style.textAlign = 'left'
        this.legends[2].style.paddingLeft = Camembert.config.legendBulletRadius * 2.0 + 'px'
        this.legends[2].style.color = Camembert.config.resteAVivreColor
        this.legends[3].style.textAlign = 'left'
        this.legends[3].style.paddingLeft = Camembert.config.legendBulletRadius * 2.0 + 'px'
        this.legends[3].style.color = Camembert.config.chargesCourantesColor

    }

    resizeCanvas(){
        this.canvas.width = this.dimension
        this.canvas.height = this.dimension / 2.0
    }

    redraw(){
        this.clear()
        this.drawRevenusCircle()
        this.drawChargesFixesArc()
        this.drawChargesCourantesArc()
        this.drawResteAVivreArc()

        // Charges courantes 
        this.drawLegendLine(this.chargesFixes + this.chargesCourantes, 1, 0.35, 2, 0.35, 0.75, Camembert.config.chargesCourantesColor, 0.25, this.valueInRange(this.chargesFixes / this.revenus, 0, 0.75), this.legends[3], 'left', 'top', false)

        // Charges fixes
        this.drawLegendLine(this.chargesFixes / 2.0, -1, 0.25 / 2.0, 1 / 2.0, 0.25, 0.5, Camembert.config.chargesFixesColor, 0.25, true, this.legends[1], 'right', 'top', true)

        // Revenus
        this.drawLegendFixedLine(Math.PI / 5.0, -1, Camembert.config.revenusColor, this.revenusRadius, this.legends[0], 'right', 'top', true)

        // Reste à vivre
        this.drawLegendFixedLine(Math.PI * 2.0 - Math.PI / 5.0, 1, Camembert.config.resteAVivreColor, this.chargesRadius + Camembert.config.chargesThickness / 2.0, this.legends[2], 'left', 'top', false)
    }

    valueInRange(value, minValue, maxValue){
        return value > minValue && value < maxValue
    }

    clear(){
        this.context.fillStyle = 'white'
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    setupProperties(){
        this.width = this.dimension
        this.height = this.dimension / 2.0
        this.center = {
            x: this.width / 2.0,
            y: this.height / 2.0
        }
        this.revenusRadius = this.height / 2.0 - Camembert.config.padding - Camembert.config.revenusThickness / 2.0 
        this.chargesRadius = this.revenusRadius - Camembert.config.revenusThickness / 2.0 - Camembert.config.chargesPadding - Camembert.config.chargesThickness / 2.0
    }

    drawRevenusCircle(){
        this.context.strokeStyle = Camembert.config.revenusColor
        this.context.lineWidth = Camembert.config.revenusThickness
        this.context.beginPath()
        this.arc(this.center.x, this.center.y, this.revenusRadius, 0, Math.PI * 2.0)
        this.context.stroke()
    }

    drawChargesFixesArc(){
        this.context.strokeStyle = Camembert.config.chargesFixesColor
        this.context.lineWidth = Camembert.config.chargesThickness
        this.context.beginPath()
        this.arc(this.center.x, this.center.y, this.chargesRadius, 0, this.scaleRadian(this.chargesFixes))
        this.context.stroke()
    }

    drawChargesCourantesArc(){
        this.context.strokeStyle = Camembert.config.chargesCourantesColor
        this.context.lineWidth = Camembert.config.chargesCourantesThickness
        this.context.beginPath()
        this.arc(this.center.x, this.center.y, this.chargesRadius, this.scaleRadian(this.chargesFixes), this.scaleRadian(this.chargesFixes + this.chargesCourantes))
        this.context.stroke()
    }

    drawResteAVivreArc(){
        let startAngle = this.reverseAngle(this.scaleRadian(this.chargesFixes))
        let endAngle = this.reverseAngle(Math.PI * 2.0)
        let innerRadius = this.chargesRadius - Camembert.config.chargesThickness / 2.0
        let outerRadius = this.chargesRadius + Camembert.config.chargesThickness / 2.0
        let outerRadiusCenter = outerRadius - Camembert.config.resteAVivreThickness / 2.0
        let innerRadiusCenter = innerRadius + Camembert.config.resteAVivreThickness / 2.0

        this.context.strokeStyle = Camembert.config.resteAVivreColor
        this.context.lineWidth = Camembert.config.resteAVivreThickness
        this.context.beginPath()
        this.context.moveTo(this.center.x + Math.cos(startAngle) * outerRadiusCenter, this.center.y + Math.sin(startAngle) * outerRadiusCenter)
        this.context.arc(this.center.x, this.center.y, outerRadiusCenter, startAngle, endAngle, true)
        this.context.stroke()

        this.context.beginPath()
        this.context.moveTo(this.center.x + Math.cos(startAngle) * innerRadiusCenter, this.center.y + Math.sin(startAngle) * innerRadiusCenter)
        this.context.arc(this.center.x, this.center.y, innerRadiusCenter, startAngle, endAngle, true)
        this.context.stroke()

        this.context.beginPath()
        this.context.moveTo(this.center.x + Math.cos(startAngle) * outerRadius, this.center.y + Math.sin(startAngle) * outerRadius)
        this.context.lineTo(this.center.x + Math.cos(startAngle) * innerRadius, this.center.y + Math.sin(startAngle) * innerRadius)
        this.context.stroke()

        this.context.beginPath()
        this.context.moveTo(this.center.x + Math.cos(endAngle) * outerRadius, this.center.y + Math.sin(endAngle) * outerRadius)
        this.context.lineTo(this.center.x + Math.cos(endAngle) * innerRadius, this.center.y + Math.sin(endAngle) * innerRadius)
        this.context.stroke()
    }

    drawLegendLine(value, direction, minRatio, maxRatio, clampRatioMin, clampRatioMax, color, defaultRatio, condition, node, cssx, cssy, reverse){
        let ratio = value / this.revenus
        let angle = this.reverseAngle(this.scaleRadian(value)) + Camembert.config.legendEpsilonAngle
        let radius = this.chargesRadius

        if (ratio > minRatio && ratio < maxRatio && condition){
            if (ratio > clampRatioMax){
                angle = this.reverseAngle(this.scaleRadian(this.revenus * clampRatioMax)) + Camembert.config.legendEpsilonAngle
            }
            if (ratio < clampRatioMin){
                angle = this.reverseAngle(this.scaleRadian(this.revenus * clampRatioMin)) + Camembert.config.legendEpsilonAngle
            }
         
            this.context.strokeStyle = color
            this.context.lineWidth = Camembert.config.legendLineThickness
            this.context.beginPath()
            this.context.moveTo(this.center.x + Math.cos(angle) * radius, this.center.y + Math.sin(angle) * radius)
            this.context.lineTo(this.center.x + (this.revenusRadius + Camembert.config.paddingLabel) * direction, this.center.y + Math.sin(angle) * radius)
            this.context.stroke()

            this.context.fillStyle = color
            this.context.beginPath()
            this.context.arc(this.center.x + (this.revenusRadius + Camembert.config.paddingLabel) * direction, this.center.y + Math.sin(angle) * radius, Camembert.config.legendBulletRadius, 0, Math.PI * 2.0)
            this.context.fill()

            if (reverse){
                node.style[cssx] = this.width - (this.center.x + (this.revenusRadius + Camembert.config.paddingLabel) * direction) + 'px'
            } else {
                node.style[cssx] = (this.center.x + (this.revenusRadius + Camembert.config.paddingLabel) * direction) + 'px'
            }
            node.style[cssy] = (this.center.y + Math.sin(angle) * radius) + 'px'

        } else {
            angle = this.reverseAngle(this.scaleRadian(this.revenus * defaultRatio)) + Camembert.config.legendEpsilonAngle
            this.context.fillStyle = color
            this.context.beginPath()
            this.context.arc(this.center.x + (this.revenusRadius + Camembert.config.paddingLabel) * direction, this.center.y + Math.sin(angle) * radius, Camembert.config.legendBulletRadius, 0, Math.PI * 2.0)
            this.context.fill()

            if (reverse){
                node.style[cssx] = this.width - (this.center.x + (this.revenusRadius + Camembert.config.paddingLabel) * direction) + 'px'
            } else {
                node.style[cssx] = (this.center.x + (this.revenusRadius + Camembert.config.paddingLabel) * direction) + 'px'
            }
            node.style[cssy] = (this.center.y + Math.sin(angle) * radius) + 'px'
        }


    }

    drawLegendFixedLine(angle, direction, color, radius, node, cssx, cssy, reverse){
        let revAngle = this.reverseAngle(angle)
        this.context.strokeStyle = color
        this.context.lineWidth = Camembert.config.legendLineThickness
        this.context.beginPath()
        this.context.moveTo(this.center.x + Math.cos(revAngle) * radius, this.center.y + Math.sin(revAngle) * radius);
        this.context.lineTo(this.center.x + direction * (this.revenusRadius + Camembert.config.paddingLabel), this.center.y + Math.sin(revAngle) * radius);
        this.context.stroke() 

        this.context.fillStyle = color
        this.context.beginPath()
        this.context.arc(this.center.x + direction * (this.revenusRadius + Camembert.config.paddingLabel), this.center.y + Math.sin(revAngle) * radius, Camembert.config.legendBulletRadius, 0, Math.PI * 2.0)
        this.context.fill()

        if (reverse){
            node.style[cssx] = this.width - (this.center.x + direction * (this.revenusRadius + Camembert.config.paddingLabel)) + 'px'
        } else {
            node.style[cssx] = (this.center.x + direction * (this.revenusRadius + Camembert.config.paddingLabel)) + 'px'
        }
        node.style[cssy] = (this.center.y + Math.sin(revAngle) * radius) + 'px'
    }

    reverseAngle(angle){
        return - angle - Math.PI / 2.0
    }

    scaleRadian(value){
        return (value / this.revenus) * Math.PI * 2.0
    }

    arc(x, y, radius, startAngle, endAngle){
        this.context.arc(x, y, radius, -startAngle - Math.PI / 2.0, -endAngle - Math.PI / 2.0, true)
    }
}

export default Camembert