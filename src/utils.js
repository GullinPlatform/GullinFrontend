import Web3 from 'web3'
import { ETH_NODE } from './config'

export const web3 = new Web3(ETH_NODE)

export function SHA256(s) {
  const chrsz = 8
  const hexcase = 0

  function SafeAdd(x, y) {
    const lsw = (x & 0xFFFF) + (y & 0xFFFF)
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }

  function S(X, n) {
    return (X >>> n) | (X << (32 - n))
  }

  function R(X, n) {
    return (X >>> n)
  }

  function Ch(x, y, z) {
    return ((x & y) ^ ((~x) & z))
  }

  function Maj(x, y, z) {
    return ((x & y) ^ (x & z) ^ (y & z))
  }

  function Sigma0256(x) {
    return (S(x, 2) ^ S(x, 13) ^ S(x, 22))
  }

  function Sigma1256(x) {
    return (S(x, 6) ^ S(x, 11) ^ S(x, 25))
  }

  function Gamma0256(x) {
    return (S(x, 7) ^ S(x, 18) ^ R(x, 3))
  }

  function Gamma1256(x) {
    return (S(x, 17) ^ S(x, 19) ^ R(x, 10))
  }

  function CoreSHA256(m, l) {
    const K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2]
    const HASH = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19]
    const W = new Array(64)
    let a, b, c, d, e, f, g, h
    let T1, T2
    m[l >> 5] |= 0x80 << (24 - (l % 32))
    m[((l + 64 >> 9) << 4) + 15] = l
    for (let i = 0; i < m.length; i += 16) {
      a = HASH[0]
      b = HASH[1]
      c = HASH[2]
      d = HASH[3]
      e = HASH[4]
      f = HASH[5]
      g = HASH[6]
      h = HASH[7]
      for (let j = 0; j < 64; j += 1) {
        if (j < 16) W[j] = m[j + i]
        else W[j] = SafeAdd(SafeAdd(SafeAdd(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16])
        T1 = SafeAdd(SafeAdd(SafeAdd(SafeAdd(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j])
        T2 = SafeAdd(Sigma0256(a), Maj(a, b, c))
        h = g
        g = f
        f = e
        e = SafeAdd(d, T1)
        d = c
        c = b
        b = a
        a = SafeAdd(T1, T2)
      }
      HASH[0] = SafeAdd(a, HASH[0])
      HASH[1] = SafeAdd(b, HASH[1])
      HASH[2] = SafeAdd(c, HASH[2])
      HASH[3] = SafeAdd(d, HASH[3])
      HASH[4] = SafeAdd(e, HASH[4])
      HASH[5] = SafeAdd(f, HASH[5])
      HASH[6] = SafeAdd(g, HASH[6])
      HASH[7] = SafeAdd(h, HASH[7])
    }
    return HASH
  }

  function Str2Binb(str) {
    const bin = []
    const mask = (1 << chrsz) - 1
    for (let i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - (i % 32))
    }
    return bin
  }

  function Utf8Encode(string) {
    string = string.toString().replace(/\r\n/g, '\n')
    let utftext = ''
    for (let n = 0; n < string.length; n += 1) {
      const c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  }

  function Binb2Hex(binarray) {
    const hexTab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef'
    let str = ''
    for (let i = 0; i < binarray.length * 4; i += 1) {
      str += hexTab.charAt((binarray[i >> 2] >> (((3 - (i % 4)) * 8) + 4)) & 0xF) +
        hexTab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xF)
    }
    return str
  }

  s = Utf8Encode(s)
  return Binb2Hex(CoreSHA256(Str2Binb(s), s.length * chrsz))
}

export const erc20_contract_abi = [
  {
    'constant': true,
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_spender',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_from',
        'type': 'address'
      },
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'decimals',
    'outputs': [
      {
        'name': '',
        'type': 'uint8'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'version',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'name': 'balance',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_spender',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      },
      {
        'name': '_extraData',
        'type': 'bytes'
      }
    ],
    'name': 'approveAndCall',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address'
      },
      {
        'name': '_spender',
        'type': 'address'
      }
    ],
    'name': 'allowance',
    'outputs': [
      {
        'name': 'remaining',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'inputs': [
      {
        'name': '_initialAmount',
        'type': 'uint256'
      },
      {
        'name': '_tokenName',
        'type': 'string'
      },
      {
        'name': '_decimalUnits',
        'type': 'uint8'
      },
      {
        'name': '_tokenSymbol',
        'type': 'string'
      }
    ],
    'type': 'constructor'
  },
  {
    'payable': false,
    'type': 'fallback'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': '_from',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': '_to',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': '_owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': '_spender',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event'
  },
]

