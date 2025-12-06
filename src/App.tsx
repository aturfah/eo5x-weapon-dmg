import { useState } from 'react'
import './App.css'

function damage(pSTR: number, wAtk: number, eDef: number) {
  const atk = pSTR + wAtk;
  const cs = eDef / atk;
  let innerVal = 0;
  if (cs > 1) {
    console.log(cs > 1)
    innerVal = 1 - 0.7 * Math.pow(cs, 1/4)
  } else {
    console.log("cs < 1")
    innerVal = 0.3 + 1.7 * Math.pow(1 - cs, 3)
  }
  return 0.717 * innerVal * atk * 3 - eDef/5
}

function damageRat(pSTR: number, wAtkN: number, wAtkO: number, eName: string, strDmg: boolean) {
  const eDef = getEDef(eName, strDmg)
  let val = damage(pSTR, wAtkN, eDef) / damage(pSTR, wAtkO, eDef)
  return Math.round(val * 100) / 100
}

function getEDef(eName: string, strDmg: boolean) {
  const mappingStr = new Map();
  mappingStr.set("debug", 14)
  mappingStr.set("s1", 13)
  mappingStr.set("blossombeast", 13)

  const mappingInt = new Map();
  mappingInt.set("debug", 12)
  mappingInt.set("s1", 16)
  mappingInt.set("blossombeast", 16)

  if (strDmg) {
    return(mappingStr.get(eName))
  } else {
    return(mappingInt.get(eName))
  }
}

function App() {
  const [wAtkOrig, setWAtk1] = useState(10)
  const [wAtkNew, setWAtk2] = useState(16)
  const [eName, setEName] = useState('debug')
  const [pSTR, setPSTR] = useState(20)
  const [strDmg, setStrDmg] = useState(true)
  const [dmgRat, setDmgRat] = useState(damageRat(pSTR, wAtkNew, wAtkOrig, eName, strDmg))

  return (
    <>
      <h1>Etrian Odyssey V/Nexus Weapon Damage Calculator</h1>
      <div className="card">
        
        <ul>
          <li>Player STR/INT: {pSTR}</li>
          <li>Enemy DEF/MDF: {getEDef(eName, strDmg)}</li>
          <li>Original Weapon Attack: {wAtkOrig}</li>
          <li>New Weapon Attack: {wAtkNew}</li>
          <li>Damage Type: {strDmg ? "STR-based" : "INT-based"}</li>
        </ul>
        <button onClick={() => setDmgRat(damageRat(pSTR, wAtkNew, wAtkOrig, eName, strDmg))}>
          New weapon does {dmgRat}x damage
        </button>
      </div>
    </>
  )
}

export default App
