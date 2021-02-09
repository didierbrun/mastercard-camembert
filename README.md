# Camembert - v1.0.0

## HTML

Code HTML à insérer dans la page :
```html
<div id="camembert">
    <canvas/>
    <div>Revenus<br/>2200€/mois</div>
    <div>Charges fixes<br/>2200€/mois</div>
    <div>Reste à vivre<br/>2200€/mois</div>
    <div>Charges courantes<br/>2200€/mois</div>
</div>
```
> 🔸 L'ordre des div est important, il faut le respecter

> 🔸 Utilisation de classes css possible, mais pas d'injection de css inline, risque de conflit

> 🔸 Le div doit avoir un ID unique 

## Javascript
Fichier source du camembert : 
```
src/lib/camembert.js
```

Usage
```javascript
import camembert from 'camembert'

//
// Création (elementId, dimension, revenus, chargesFixes, chargesCourantes)
//
let camembert = new Camembert('camambert', 960, 2200, 800, 400)

//
// Mise à jour (dimension, revenus, chargesFixes, chargesCourantes)
//
camembert.update(960, 2200, 800, 400)
```



