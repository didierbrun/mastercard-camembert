import React, { useState } from 'react'
import styles from './Settings.module.css'
import Slider from 'react-slider-simple'

const Settings = ({ onUpdate, datas }) => {

    const rangeRevenus = [0, 5000]
    const rangeChargesFixes = [0, 2500]
    const rangeChargesCourantes = [0, 2500]
    const rangeDimension = [640, 1280]

    const [revenus, setRevenus] = useState(datas.revenus)
    const [chargesFixes, setChargesFixes] = useState(datas.chargesFixes)
    const [chargesCourantes, setChargesCourantes] = useState(datas.chargesCourantes)
    const [dimension, setDimension] = useState(datas.dimension)

    const onChange = (value, range, setter) => {
        setter((value / 100) * (range[1] - range[0]) + range[0])
        onUpdate({
            revenus,
            chargesFixes,
            chargesCourantes,
            dimension
        })
    }

    const renderBlock = (title, amount, range, setter) => {
        return (
            <div className={styles.block}>
                <h2>{title}</h2>
                <p className={styles.amount}>{Math.round(amount)}</p>
                <Slider value={((amount - range[0])/(range[1] - range[0])) * 100}
                    onChange={(e) => { onChange(e, range, setter) }}
                    onDone={(e) => { onChange(e, range, setter) }} />
            </div>
        )
    }

    return (
        <section className={styles.container}>
            {
                renderBlock('Revenus', revenus, rangeRevenus, setRevenus)
            }
            {
                renderBlock('Chages fixes', chargesFixes, rangeChargesFixes, setChargesFixes)
            }
            {
                renderBlock('Chages courantes', chargesCourantes, rangeChargesCourantes, setChargesCourantes)
            }
            {
                renderBlock('Dimension', dimension, rangeDimension, setDimension)
            }
        </section>
    )
}

export default Settings