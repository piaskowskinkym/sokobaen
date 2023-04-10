import React, {useEffect, useReducer} from "react"

const LEVELS = [ // 0=playground, 1=wall, 2=box (playground bellow), 4=storage, 5=player (playground bellow), 8=outside world
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
