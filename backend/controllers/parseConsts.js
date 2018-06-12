exports.bracketsRegex = /(?=((\||^| - | \\ | \/ ).+?(\|| - | \/ | \\ )))/gi;
exports.firstLineRegex = /(^).*?(<p>)/g;
exports.jobTitleFilters = [/\bengineers?\b/i, /\bdevelopers?\b/i, /\bscientists?\b/i
        , /\binterns?\b/i, /\badministrators?\b/i, /\bmanagers?\b/i
        , /\bleads?\b/i, /\bdevops\b/i , /\bhi\b/i, /\bhello\b/i
        , /\b\d+?k\b/i, /\bsalary\b/i, /a href=/i];

//todo: update front end if new tags are added, or setup automatic hydrating of tags
exports.jobPositions = {
  intern: {
    tag: 'intern',
    regexes: [/\bintern(s|ship)?\b/i]
  },
  engineering: {
    tag: 'engineering',
    regexes: [/\bengineer(s|ing)?\b/i, /\bdevelopers?\b/i, /\bsoftware\b/i]
  },
  research: {
    tag: 'research',
    regexes: [/\bscientists?\b/i, /\bresearch\b/i]
  },
  data: {
    tag: 'data science',
    regexes: [/\b(data).{0,9}(analysts?|engineers?|engineering|science|scientists?)\b/i]
  },
  ai: {
    tag: 'AI/ML',
    regexes: [/\b(artificial|machine|deep).{0,9}(intelligence|learning)\b/i, /\bai|ml\b/i]
  },
  management: {
    tag: 'management',
    regexes: [/\bPM\b/, /\bdirector\b/i, /\b(product).{0,9}(manage(ment|rs?))\b/i, /\b(tech(nical)?|web|team)?.{0,9}(leads?)\b/i]
  },
  design: {
    tag: 'design',
    regexes: [/\bdesign(er)?s?\b/i]
  },
  sales: {
    tag: 'sales',
    regexes: [/\bmarketing\b/i, /\b(technical).{0,9}(sales)\b/i]
  },
  operations: {
    tag: 'operations',
    regexes: [/\bdevops\b/i, /\b(sys|systems?).{0,9}(admins?|administration)\b/i, /\bsre\b/i, /\b(site).{0,9}(reliability)\b/i]
  },
  systems: {
    tag: 'systems',
    regexes: [/\b(systems)\b/i, /\b(kernel)\b/i, /\binfrastructure\b/i]
  },
  security: {
    tag: 'security',
    regexes: [/security\b/i]
  },
  fullStack: {
    tag: 'full-stack',
    regexes: [/\b(full).{0,9}(stack)\b/i]
  },
  frontEnd: {
    tag: 'front-end',
    regexes: [/\b(front).{0,9}(end)\b/i]
  },
  backEnd: {
    tag: 'back-end',
    regexes: [/\b(back).{0,9}(end)\b/i]
  },
  web: {
    tag: 'web',
    regexes: [/\bweb.{0,9}developers?\b/i]
  },
  desktop: {
    tag: 'desktop',
    regexes: [/\bdesktop\b/i, /\b(windows)\b/i]
  },
  mobile: {
    tag: 'mobile',
    regexes: [/\b(mobile)\b/i, /\b(android)\b/i, /\b(ios)\b/i, /\b(windows).{0,9}(phone)\b/i, /\b(blackberry).{0,9}(os)\b/i]
  },
  embedded: {
    tag: 'embedded',
    regexes: [/\b(embedded)\b/i, /\b(kernel)\b/i]
  },
  hardware: {
    tag: 'hardware',
    regexes: [/\b(hardware)\b/i, /\b(electronics)\b/i]
  },
}

exports.salary = [/\b\d+k\b/gi, /\b\$/gi, /\b£/gi, /\b€/gi, /\bequity\b/gi, /\bstock options?\b/gi];

exports.remoteTags = {
  onsite: {
    tag: 'onsite',
    regexes: [/\b(on).{0,9}(site)\b/i, /\b(full).{0,9}(time)\b/i, /\b(part).{0,9}(time)\b/i]
  },
  remote: {
    tag: 'remote',
    regexes: [/\b(remote)\b/i]
  },
  fullTime: {
    tag: 'full-time',
    regexes: [/\b(full).{0,9}(time)\b/i]
  },
  partTime: {
    tag: 'part-time',
    regexes: [/\b(part).{0,9}(time)\b/i]
  },
  relocation: {
    tag: 'relocation',
    regexes: [/\brelocation\b/i]
  },
  visa: {
    tag: 'visa',
    regexes: [/\bvisa\b/, /\b(visa).{0,9}(offered|available)\b/i, /\b(work).{0,9}(permit)\b/gi]
  }
}

//unused for now
exports.states = {
  //us states
  Alabama: {
    tag: 'AL',
    regexes: [/\bAlabama\b/, /\bAL\b/]
  },
  Alaska: {
    tag: 'AK',
    regexes: [/\bAlaska\b/, /\bAK\b/]
  },
  Arizona: {
    tag: 'AZ',
    regexes: [/\bArizona\b/, /\bAZ\b/]
  },
  Arkansas: {
    tag: 'AR',
    regexes: [/\bArkansas\b/, /\bAR\b/]
  },
  California: {
    tag: 'CA',
    regexes: [/\bCalifornia\b/, /\bCA\b/]
  },
  Colorado: {
    tag: 'CO',
    regexes: [/\bColorado\b/, /\bCO\b/]
  },
  Connecticut: {
    tag: 'CT',
    regexes: [/\bConnecticut\b/, /\bCT\b/]
  },
  Delaware: {
    tag: 'DE',
    regexes: [/\bDelaware\b/, /\bDE\b/]
  },
  Florida: {
    tag: 'FL',
    regexes: [/\bFlorida\b/, /\bFL\b/]
  },
  Georgia: {
    tag: 'GA',
    regexes: [/\bGeorgia\b/, /\bGA\b/]
  },
  Hawaii: {
    tag: 'HI',
    regexes: [/\bHawaii\b/, /\bHI\b/]
  },
  Idaho: {
    tag: 'ID',
    regexes: [/\bIdaho\b/, /\bID\b/]
  },
  Illinois: {
    tag: 'IL',
    regexes: [/\bIllinois\b/, /\bIL\b/]
  },
  Indiana: {
    tag: 'IN',
    regexes: [/\bIndiana\b/, /\bIN\b/]
  },
  Iowa: {
    tag: 'IA',
    regexes: [/\bIowa\b/, /\bIA\b/]
  },
  Kansas: {
    tag: 'KS',
    regexes: [/\bKansas\b/, /\bKS\b/]
  },
  Kentucky: {
    tag: 'KY',
    regexes: [/\bKentucky\b/, /\bKY\b/]
  },
  Louisiana: {
    tag: 'LA',
    regexes: [/\bLouisiana\b/, /\bLA\b/]
  },
  Maine: {
    tag: 'ME',
    regexes: [/\bMaine\b/, /\bME\b/]
  },
  Maryland: {
    tag: 'MD',
    regexes: [/\bMaryland\b/, /\bMD\b/]
  },
  Massachusetts: {
    tag: 'MA',
    regexes: [/\bMassachusetts\b/, /\bMA\b/]
  },
  Michigan: {
    tag: 'MI',
    regexes: [/\bMichigan\b/, /\bMI\b/]
  },
  Minnesota: {
    tag: 'MN',
    regexes: [/\bMinnesota\b/, /\bMN\b/]
  },
  Mississippi: {
    tag: 'MS',
    regexes: [/\bMississippi\b/, /\bMS\b/]
  },
  Missouri: {
    tag: 'MO',
    regexes: [/\bMissouri\b/, /\bMO\b/]
  },
  Montana: {
    tag: 'MT',
    regexes: [/\bMontana\b/, /\bMT\b/]
  },
  Nebraska: {
    tag: 'NE',
    regexes: [/\bNebraska\b/, /\bNE\b/]
  },
  Nevada: {
    tag: 'NV',
    regexes: [/\bNevada\b/, /\bNV\b/]
  },
  NewHampshire: {
    tag: 'NH',
    regexes: [/\bNew Hampshire\b/, /\bNH\b/]
  },
  NewJersey: {
    tag: 'NJ',
    regexes: [/\bNew Jersey\b/, /\bNJ\b/]
  },
  NewMexico: {
    tag: 'NM',
    regexes: [/\bNew Mexico\b/, /\bNM\b/]
  },
  NewYork: {
    tag: 'NY',
    regexes: [/\bNew York\b/, /\bNY\b/]
  },
  NewYork: {
    tag: 'NY',
    regexes: [/\bNew York\b/, /\bNY\b/]
  },
  NorthCarolina: {
    tag: 'NC',
    regexes: [/\bNew Carolina\b/, /\bNC\b/]
  },
  NorthDakota: {
    tag: 'NC',
    regexes: [/\bNew Dakota\b/, /\bND\b/]
  },
  Ohio: {
    tag: 'OH',
    regexes: [/\bOhio\b/, /\bOH\b/]
  },
  Oklahoma: {
    tag: 'OK',
    regexes: [/\bOklahoma\b/, /\bOK\b/]
  },
  Oregon: {
    tag: 'OR',
    regexes: [/\bOregon\b/, /\bOR\b/]
  },
  Pennsylvania: {
    tag: 'PA',
    regexes: [/\bPennsylvania\b/, /\bPA\b/]
  },
  RhodeIsland: {
    tag: 'RI',
    regexes: [/\bRhode Island\b/, /\bRI\b/]
  },
  SouthCarolina: {
    tag: 'SC',
    regexes: [/\bSouth Carolina\b/, /\bSC\b/]
  },
  SouthDakota: {
    tag: 'SD',
    regexes: [/\bSouth Dakota\b/, /\bSD\b/]
  },
  Tennessee: {
    tag: 'TN',
    regexes: [/\bTennessee\b/, /\bTN\b/]
  },
  Texas: {
    tag: 'TX',
    regexes: [/\bTexas\b/, /\bTX\b/]
  },
  Utah: {
    tag: 'UT',
    regexes: [/\bUtah\b/, /\bUT\b/]
  },
  Vermont: {
    tag: 'VT',
    regexes: [/\bVermont\b/, /\bVT\b/]
  },
  Virginia: {
    tag: 'VA',
    regexes: [/\bVirginia\b/, /\bVA\b/]
  },
  Washington: {
    tag: 'WA',
    regexes: [/\bWashington\b/, /\bWA\b/]
  },
  WestVirginia: {
    tag: 'WV',
    regexes: [/\bWest Virginia\b/, /\bWV\b/]
  },
  Wisconsin: {
    tag: 'WI',
    regexes: [/\bWisconsin\b/, /\bWI\b/]
  },
  Wyoming: {
    tag: 'WY',
    regexes: [/\bWyoming\b/, /\bWY\b/]
  },
  //canadian
  Alberta: {
    tag: 'AB',
    regexes: [/\bAlberta\b/, /\bAB\b/]
  },
  BritishColumbia: {
    tag: 'BC',
    regexes: [/\bBritish Columbia\b/, /\bBC\b/]
  },
  Manitoba: {
    tag: 'MB',
    regexes: [/\bManitoba\b/, /\bMB\b/]
  },
  NewBrunswick: {
    tag: 'NB',
    regexes: [/\bNew Brunswick\b/, /\bNB\b/]
  },
  Newfoundland: {
    tag: 'NL',
    regexes: [/\bNewfoundland and Labrador\b/, /\bNL\b/]
  },
  NovaScotia: {
    tag: 'NS',
    regexes: [/\bNova Scotia\b/, /\bNS\b/]
  },
  NorthwestTerritories: {
    tag: 'NT',
    regexes: [/\bNorthwest Territories\b/, /\bNT\b/]
  },
  Nunavut: {
    tag: 'NU',
    regexes: [/\bNunavut\b/, /\bNU\b/]
  },
  Ontario: {
    tag: 'ON',
    regexes: [/\bOntario\b/, /\bON\b/]
  },
  PEI: {
    tag: 'PE',
    regexes: [/\bPrince Edward Islands?\b/, /\bPE\b/]
  },
  Quebec: {
    tag: 'QC',
    regexes: [/\bQuebec\b/, /\bQC\b/]
  },
  Saskatchewan: {
    tag: 'SK',
    regexes: [/\bSaskatchewan\b/, /\bSK\b/]
  },
  Yukon: {
    tag: 'YT',
    regexes: [/\bYukon\b/, /\bYT\b/]
  },
}