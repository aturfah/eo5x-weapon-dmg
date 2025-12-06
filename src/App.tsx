import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function damage(atk: number, eDef: number) {
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

function damageRat(atkN: number, atkO: number, eName: string, strDmg: boolean) {
  const eDef = getEDef(eName, strDmg)
  let val = damage(atkN, eDef) / damage(atkO, eDef)
  return Math.round(val * 100) / 100
}

function getEDef(eName: string, strDmg: boolean) {
  const mappingStr = new Map();
  mappingStr.set("debug", 14)
  mappingStr.set("blossombeast", 13)
  mappingStr.set("berserkerking", 17)
  mappingStr.set("cernunnos", 15)
  mappingStr.set("wyvern", 24)
  mappingStr.set("wickedsilirus", 24)
  mappingStr.set("shellbeast", 27)
  mappingStr.set("harpuia", 33)
  mappingStr.set("chimaera", 36)
  mappingStr.set("ketos", 45)
  mappingStr.set("bugbeast", 54)
  mappingStr.set("salamander", 54)
  mappingStr.set("boilinglizard", 68)
  mappingStr.set("basilisk", 52)
  mappingStr.set("iwaoropenelep", 65)
  mappingStr.set("blot", 69)
  mappingStr.set("jormungandr_weak", 100)
  mappingStr.set("abyssalprincess", 204)
  mappingStr.set("jormungandr_full", 255)
  mappingStr.set("golem", 25)
  mappingStr.set("fenrir", 26)
  mappingStr.set("chameleonking", 34)
  mappingStr.set("alraune", 64)
  mappingStr.set("hippogryph", 64)
  mappingStr.set("queenant", 62)
  mappingStr.set("lamia", 74)
  mappingStr.set("scylla", 117)
  mappingStr.set("juggernaut", 109)
  mappingStr.set("stormemperor", 118)
  mappingStr.set("greatdragon", 100)
  mappingStr.set("blizzardking", 94)


  const mappingInt = new Map();
  mappingInt.set("debug", 12)
  mappingInt.set("blossombeast", 16)
  mappingInt.set("berserkerking", 13)
  mappingInt.set("cernunnos", 12)
  mappingInt.set("wyvern", 23)
  mappingInt.set("wickedsilirus", 24)
  mappingInt.set("shellbeast", 27)
  mappingInt.set("harpuia", 36)
  mappingInt.set("chimaera", 41)
  mappingInt.set("ketos", 48)
  mappingInt.set("bugbeast", 42)
  mappingInt.set("salamander", 58)
  mappingInt.set("boilinglizard", 71)
  mappingInt.set("basilisk", 58)
  mappingInt.set("iwaoropenelep", 61)
  mappingInt.set("blot", 64)
  mappingInt.set("jormungandr_weak", 105)
  mappingInt.set("abyssalprincess", 189)
  mappingInt.set("jormungandr_full", 255)
  mappingInt.set("golem", 28)
  mappingInt.set("fenrir", 38)
  mappingInt.set("chameleonking", 32)
  mappingInt.set("alraune", 66)
  mappingInt.set("hippogryph", 70)
  mappingInt.set("queenant", 78)
  mappingInt.set("lamia", 80)
  mappingInt.set("scylla", 128)
  mappingInt.set("juggernaut", 128)
  mappingInt.set("stormemperor", 109)
  mappingInt.set("greatdragon", 106)
  mappingInt.set("blizzardking", 100)

  if (strDmg) {
    return(mappingStr.get(eName))
  } else {
    return(mappingInt.get(eName))
  }
}

function App() {
  const [atkOrig, setWAtkO] = useState(10)
  const [atkNew, setWAtkN] = useState(16)
  const [eName, setEName] = useState('debug')
  const [strDmg, setStrDmg] = useState(true)
  const [dmgRat, setDmgRat] = useState(damageRat(atkNew, atkOrig, eName, strDmg))

  return (
    <>
    <div className='row'>
      <h1>Etrian Odyssey V/Nexus Weapon Damage Calculator</h1>
      <div className='col-sm-2'></div>
      <div className='col-sm-8'>
        <ul>
          <li>Original ATK Value: <input type="text" value={atkOrig} onChange={(val) => setWAtkO(Number(val.target.value))}/></li>
          <li>New ATK Value: <input type="text" value={atkNew} onChange={(val) => setWAtkN(Number(val.target.value))}/></li>
          <li>Damage Type: {strDmg ? "STR-based" : "INT-based"} <input type="radio" /> </li>
          <li>Enemy ID: {eName}</li>
          <li>Enemy {strDmg ? "DEF" : "MDF"}: {getEDef(eName, strDmg)}</li>
        </ul>
        <button onClick={() => setDmgRat(damageRat(atkNew, atkOrig, eName, strDmg))}>
          Calculate!
        </button>
        <h4>New weapon does {dmgRat}x damage</h4>
      </div>
    </div>
    </>
  )
}

export default App
