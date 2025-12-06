import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function damage(atk: number, eDef: number) {
  // Taken from: https://pastebin.com/jFnMqDET
  eDef = 2 * eDef; // Monsters use 2x Defense as base defense
  const cs = eDef / atk;
  let innerVal = 0;
  if (cs > 1) {
    // console.log("cs > 1")
    innerVal = 1 - 0.7 * Math.pow(cs, 1/4)
  } else {
    // console.log("cs < 1")
    innerVal = 0.3 + 1.7 * Math.pow(1 - cs, 3)
  }
  let finalVal = 0.717 * innerVal * atk * 3 - eDef/5
  if (finalVal < 0) finalVal = 0;
  console.log("Player ATK", atk)
  console.log("CS", cs)
  console.log("Stat Value", innerVal)
  console.log("Final Value", finalVal)
  return finalVal
}

function damageRat(atkN: number, atkO: number, eName: string, strDmg: boolean) {
  const eDef = getEDef(eName, strDmg)
  const val = damage(atkN, eDef) / damage(atkO, eDef)
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
  const [atkOrig, setWAtkO] = useState(34)
  const [atkNew, setWAtkN] = useState(38)
  const [eName, setEName] = useState('debug')
  const [strDmg, setStrDmg] = useState(true)
  const dmgRat = damageRat(atkNew, atkOrig, eName, strDmg)

  return (
    <>
    <div className='row headerRow'>
      <h1>Etrian Odyssey Nexus Weapon Damage Comparison</h1>
      <h5><i>For deciding when to upgrade your weapon.</i></h5>
      <p>Check out the <a href="https://github.com/aturfah/eo5x-weapon-dmg/blob/master/README.md">project README</a> for more information</p>
    </div>
    <div className='row'>
      <div className='col-sm-2'></div>
      <div className='col-sm-4'>
        <ul>
          <li><b>Original ATK Value</b>: <input type="text" value={atkOrig} size={4} onChange={(val) => setWAtkO(Number(val.target.value))}/></li>
          <li><b>New ATK Value</b>: <input type="text" value={atkNew} size={4} onChange={(val) => setWAtkN(Number(val.target.value))}/></li>
          <li><b>Damage Type</b>: {strDmg ? "STR-based" : "INT-based"}</li>
          <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group"> &nbsp;<br/>
            <input type="checkbox" className="btn-check" checked={strDmg} id="btncheck1" onChange={() => setStrDmg(true)} />
            <label className="btn btn-outline-primary" htmlFor="btncheck1">STR-based</label>

            <input type="checkbox" className="btn-check" checked={!strDmg} id="btncheck3" onChange={() => setStrDmg(false)} />
            <label className="btn btn-outline-primary" htmlFor="btncheck3">Int-based</label>
          </div>
        </ul>
      </div>
      <div className='col-sm-4'>
        <ul>
          <li><b>Enemy ID</b>:&nbsp;
            <select name="pets" value={eName} onChange={(val) => setEName(val.target.value)} id="pet-select">
              <option value="debug">Rabid Koala</option>
              <option value="blossombeast">Blossombeast</option>
              <option value="berserkerking">Berserker King</option>
              <option value="cernunnos">Cernunnos</option>
              <option value="wyvern">Wyvern</option>
              <option value="wickedsilirus">Wicked Silirus</option>
              <option value="shellbeast">Shellbeast</option>
              <option value="harpuia">Harpuia</option>
              <option value="chimaera">Chimaera</option>
              <option value="ketos">Ketos</option>
              <option value="bugbeast">Bugbeast</option>
              <option value="salamander">Salamander</option>
              <option value="boilinglizard">Boiling Lizard</option>
              <option value="basilisk">Basilisk</option>
              <option value="iwaoropenelep">Iwaoropenelep</option>
              <option value="blot">Blot</option>
              <option value="jormungandr_weak">Jormungandr (Main Story)</option>
              <option value="golem">Golem</option>
              <option value="fenrir">Fenrir</option>
              <option value="chameleonking">Chameleon King</option>
              <option value="alraune">Alraune</option>
              <option value="hippogryph">Hippogryph</option>
              <option value="queenant">Queen Ant</option>
              <option value="lamia">Lamia</option>
              <option value="scylla">Scylla</option>
              <option value="juggernaut">Juggernaut</option>
              <option value="stormemperor">Storm Emperor</option>
              <option value="greatdragon">Great Dragon</option>
              <option value="blizzardking">Blizzard King</option>
              <option value="abyssalprincess">Abyssal Princess</option>
              <option value="jormungandr_full">Jormungandr (Postgame)</option>
            </select>
          </li>
          <li><b>Enemy {strDmg ? "DEF" : "MDEF"}</b>: {getEDef(eName, strDmg)}</li>
        </ul>
      </div>
      <div className='row'>
        <h4>{isNaN(dmgRat) || !isFinite(dmgRat) ? "One of these results in 0 damage so..." : "New weapon does ~" + dmgRat + "x damage"}</h4>
      </div>
    </div>
    </>
  )
}

export default App
