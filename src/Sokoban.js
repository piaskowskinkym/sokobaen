import React, {useEffect, useReducer} from "react"

const POZIOMY = [ // 0 -> podłoga 1->ściana 2 -> box 4 -> miejsce boxa 5 -> gracz 8 -> przestrzeń
    [ // level 1  
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
    [ // level 2      
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
  
  const PRZEDMIOT = {
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