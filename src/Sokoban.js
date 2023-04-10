import React, {useEffect, useReducer} from "react"

const POZIOMY = [ // 0 -> podłoga 1->ściana 2 -> box 4 -> miejsce boxa 5 -> gracz 8 -> przestrzeń
    [ // poziom 1
      [8,8,8,8,8,8,8,8,8,8],
      [8,8,8,8,8,1,1,1,1,8],  
      [8,8,1,1,1,1,0,0,1,8],  
      [8,8,1,4,1,1,2,0,1,8],  
      [8,8,1,0,0,0,0,0,1,8],  
      [8,8,1,0,4,2,0,0,1,8],  
      [8,1,1,0,1,0,2,1,1,8],  
      [8,1,4,0,0,0,5,1,8,8],  
      [8,1,1,1,1,1,1,1,8,8], 
      [8,8,8,8,8,8,8,8,8,8],      
       
    ],
    [ // poziom 2     
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,8,8,8,8,8,8,1,1,1,8,8,8,8],
      [8,8,8,8,8,8,8,1,4,1,1,1,1,8],
      [8,8,8,8,8,1,1,1,4,2,4,5,1,8],
      [8,8,8,1,1,1,0,2,0,0,1,1,1,8],
      [8,8,8,1,4,0,2,0,0,4,1,8,8,8],
      [8,1,1,1,1,0,4,2,0,4,1,1,1,8],
      [8,1,0,0,4,0,1,0,0,0,2,0,1,8],
      [8,1,0,2,0,0,2,0,2,0,0,0,1,8],
      [8,1,1,0,0,1,1,0,4,2,2,1,1,8],
      [8,8,1,1,1,1,1,4,0,0,0,1,8,8],
      [8,8,8,8,8,8,1,1,1,1,1,1,8,8],
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8],
    ] 
  ]
  const KOLOR = ["#ddd", "#777", "brown", null, "yellow", "#000", null, "green", "transparent"]
  
  const ELEMENT = {
    Gra:         0,
    Sciana:      1,
    Skrzynia:    2,
    Magazyn:     4,
    Gracz:       5,
    Przestrzen:  8 
  }
  const STAN_GRY = { 
    Dziala:          "DZIALA", 
    Koniec:             "KONIEC" 
  } 
  const AKCJA = {
    Ruch:             "RUCH", 
    RestartPoziomu:     "RESTART_POZIOM",
    KolejnyPoziom:    "KOLEJNY_POZIOM"
  }
  const KIERUNEK = { 
    Lewo:             37, 
    Prawo:            39, 
    Gora:             38, 
    Dol:              40 
  }
  function wezAktualnyStan(levelNo) {
    const POZIOM = POZIOMY[levelNo]
    let poziom = [], gracz = {x: null, y: null}, skrzynia = []
    // inicjalizacja poziomu
    for (let y=0; y<POZIOM.length; y++) {
      poziom[y] = []
      for (let x=0; x<POZIOM[y].length; x++) {
        if ( [ELEMENT.Skrzynia, ELEMENT.Gracz].includes(POZIOM[y][x])) 
          // wczytaj skrzynie gracza jako kafle
          poziom[y][x] = ELEMENT.Gra 
        else // inaczej pobierz typ z mapy poziomu
          poziom[y][x] = POZIOM[y][x] 
        if (POZIOM[y][x] === ELEMENT.Skrzynia)     skrzynia.push({x:x, y:y})    // zapełnij skrzyniami
        if (POZIOM[y][x] === ELEMENT.Gracz)  gracz = {x:x, y:y}     // poczatkowa pozycja gracza
      }
    }
    return {
      levelNo:  levelNo,
      status:   STAN_GRY.Running,
      poziom, gracz, skrzynia
    }
  }
  function procesGry(state, action) {
    switch (action.type) {
      case AKCJA.RestartLevel:
        return {...wezAktualnyStan(state.levelNo), status: STAN_GRY.Dziala}
      case AKCJA.PlayNextLevel:
        return {...wezAktualnyStan(state.levelNo+1), status: STAN_GRY.Dziala}
      case AKCJA.Move:
        let d = {x: 0, y: 0} 
        console.log(action.keyCode)
        if (KIERUNEK.Left === action.keyCode)  d.x-- 
        if (KIERUNEK.Right === action.keyCode) d.x++
        if (KIERUNEK.Up === action.keyCode)    d.y--
        if (KIERUNEK.Down === action.keyCode)  d.y++
        // check walls
        if ( state.poziom[state.gracz.y+d.y][state.gracz.x+d.x] === ELEMENT.Sciana) return {...state}
        // check if the player is trying to move the box
        if ( [...state.skrzynia].find(b => b.x===state.gracz.x+d.x && b.y===state.gracz.y+d.y) ) {
          // check whether it's possible to move the box
          if ( 
            [ELEMENT.Gra, ELEMENT.Magazyn].includes(state.poziom[state.gracz.y+2*d.y][state.gracz.x+2*d.x])  // check free space space behind box
            && ![...state.skrzynia].find(b => b.x === state.gracz.x+2*d.x && b.y === state.gracz.y+2*d.y)         // check box-free space behind box
          ) { // return new position with moved box
            let nowyStan = {...state, gracz: {x: state.gracz.x+d.x, y: state.gracz.y+d.y}, skrzynia: [...state.skrzynia].map(b => {
              // IF the player tries to move to the box's position
              if ( (b.x === state.gracz.x+d.x) && (b.y === state.gracz.y+d.y) ) 
                return {x: b.x+d.x, y: b.y+d.y}
              else
                return b
            } ) }
            // check level completed OR game finished
            let skrzynieNaMiejscu = 0
            nowyStan.box.forEach(b=>{ if (nowyStan.level[b.y][b.x] === ELEMENT.Magazyn) skrzynieNaMiejscu++ })
            if (skrzynieNaMiejscu === nowyStan.box.length) return {...nowyStan, status:STAN_GRY.Koniec}
            return nowyStan
          } else // cannot move the box, player must stay at the same position
            return {...state}
        }
        // standard movement without interaction with the boxes
        return {...state, gracz: {x: state.gracz.x+d.x, y: state.gracz.y+d.y}}
      default:  
    }
    return state
  }
  