import React, { useEffect } from 'react'
import styles from './Preview.module.css'
import Camembert from '../../lib/camembert'

let camembert = null

const Preview = ({ revenus, chargesFixes, chargesCourantes, dimension }) => {

    useEffect(() => {
        if (camembert === null){
            camembert = new Camembert("camembert", dimension, revenus, chargesFixes, chargesCourantes)
        } else {
            camembert.update(dimension, revenus, chargesFixes, chargesCourantes)
        }

    }, [revenus, chargesFixes, chargesCourantes, dimension])

    return (
        <section className={styles.container}>
            <div className={styles.window} style={{width: Math.round(dimension + 20), height: Math.round(dimension/2.0 + 20)}}>
                <div id="camembert">
                    <canvas/>
                    <div>Revenus<br/>2200€/mois</div>
                    <div>Charges fixes<br/>2200€/mois</div>
                    <div>Reste à vivre<br/>2200€/mois</div>
                    <div>Charges courantes<br/>2200€/mois</div>
                </div>
            </div>
        </section>
    )
}

export default Preview