export const VEHICLE_CSV_TEMPLATE = `name,manufacturer,class,price,topSpeed,acceleration,handling,braking,drivetrain,seats,location,description,featured,tags,source,sourceUrl,status,verified,confidence,relatedSlugs,recommendedMissionSlugs
Banshee,Bravado,Sports,105000,117,80,75,70,RWD,2,Legendary Motorsport,"An iconic American sports car famous for street racing.",true,"sports,street-racing,iconic","Legacy GTA Data","https://www.rockstargames.com/","review",false,70,"buffalo,gauntlet","street-race-introduction"
Buffalo,Bravado,Sports,35000,112,75,72,68,RWD,4,Southern San Andreas Super Autos,"A practical four-door performance sedan.",false,"sports,sedan,bravado","Legacy GTA Data","","draft",false,60,"banshee",""
Elegy RH8,Annis,Sports,95000,118,82,81,74,AWD,2,Legendary Motorsport,"A legendary tuner car with exceptional grip and balance.",true,"sports,tuner,awd","Legacy GTA Data","","review",false,75,"jester,sultan-rs","tuner-race-introduction"`;


export const VEHICLE_JSON_TEMPLATE = `[
  {
    "name": "Banshee",
    "manufacturer": "Bravado",
    "class": "Sports",
    "price": 105000,
    "topSpeed": 117,
    "acceleration": 80,
    "handling": 75,
    "braking": 70,
    "drivetrain": "RWD",
    "seats": 2,
    "location": "Legendary Motorsport",
    "description": "An iconic American sports car famous for street racing.",
    "featured": true,
    "tags": [
      "sports",
      "street-racing",
      "iconic"
    ],
    "source": "Legacy GTA Data",
    "sourceUrl": "https://www.rockstargames.com/",
    "status": "review",
    "verified": false,
    "confidence": 70,
    "relatedSlugs": [
      "buffalo",
      "gauntlet"
    ],
    "recommendedMissionSlugs": [
      "street-race-introduction"
    ]
  },
  {
    "name": "Elegy RH8",
    "manufacturer": "Annis",
    "class": "Sports",
    "price": 95000,
    "topSpeed": 118,
    "acceleration": 82,
    "handling": 81,
    "braking": 74,
    "drivetrain": "AWD",
    "seats": 2,
    "location": "Legendary Motorsport",
    "description": "A legendary tuner car with exceptional grip and balance.",
    "featured": true,
    "tags": [
      "sports",
      "tuner",
      "awd"
    ],
    "source": "Legacy GTA Data",
    "status": "review",
    "verified": false,
    "confidence": 75,
    "relatedSlugs": [
      "jester",
      "sultan-rs"
    ],
    "recommendedMissionSlugs": [
      "tuner-race-introduction"
    ]
  }
]`;