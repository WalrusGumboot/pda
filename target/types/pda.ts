export type Pda = {
  "version": "0.1.0",
  "name": "pda",
  "instructions": [
    {
      "name": "maakBibliotheek",
      "accounts": [
        {
          "name": "bibliotheek",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gebruiker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "nieuwBoek",
      "accounts": [
        {
          "name": "bibliotheek",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "boek",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "titel",
          "type": "string"
        },
        {
          "name": "auteur",
          "type": "string"
        },
        {
          "name": "genre",
          "type": "string"
        },
        {
          "name": "isbn",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bibliotheek",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "eigenaar",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "aantalBoeken",
            "type": "u8"
          },
          {
            "name": "boeken",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "boek",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "titel",
            "type": "string"
          },
          {
            "name": "auteur",
            "type": "string"
          },
          {
            "name": "genre",
            "type": "string"
          },
          {
            "name": "isbn",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitelTeLang",
      "msg": "format"
    },
    {
      "code": 6001,
      "name": "AuteurTeLang",
      "msg": "format"
    },
    {
      "code": 6002,
      "name": "GenreTeLang",
      "msg": "format"
    },
    {
      "code": 6003,
      "name": "BoekenplankVol",
      "msg": "Het maximum aantal boeken is bereikt."
    }
  ]
};

export const IDL: Pda = {
  "version": "0.1.0",
  "name": "pda",
  "instructions": [
    {
      "name": "maakBibliotheek",
      "accounts": [
        {
          "name": "bibliotheek",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gebruiker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "nieuwBoek",
      "accounts": [
        {
          "name": "bibliotheek",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "boek",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "titel",
          "type": "string"
        },
        {
          "name": "auteur",
          "type": "string"
        },
        {
          "name": "genre",
          "type": "string"
        },
        {
          "name": "isbn",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bibliotheek",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "eigenaar",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "aantalBoeken",
            "type": "u8"
          },
          {
            "name": "boeken",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "boek",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "titel",
            "type": "string"
          },
          {
            "name": "auteur",
            "type": "string"
          },
          {
            "name": "genre",
            "type": "string"
          },
          {
            "name": "isbn",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitelTeLang",
      "msg": "format"
    },
    {
      "code": 6001,
      "name": "AuteurTeLang",
      "msg": "format"
    },
    {
      "code": 6002,
      "name": "GenreTeLang",
      "msg": "format"
    },
    {
      "code": 6003,
      "name": "BoekenplankVol",
      "msg": "Het maximum aantal boeken is bereikt."
    }
  ]
};
