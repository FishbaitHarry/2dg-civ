import { getRandomCiv } from "./randomCiv.js";

const list = [
  'mesopotamian',
  'egyptian',
  // the two above are starting
  'harappan',
  'minoan',
  'mycenaean',
  'chinese',
  'hittite',
  'phoenician',
  'hebrew',
  'persian',
  'greek',
  'roman',
  // ancient ends here
  'mayan',
  'byzantine',
  'islamic',
  'medieval europe',
  'mongolian',
  'renaissance europe',
  'enlightnement europe',
  // a bit over the top start here
  'oversea colonizers',
  'overxtended british empire',
  'wakanda',
  // more modern and random
  'Fascist Totalitarian State (randomly replace State with a country name)',
  'Socialist Revolutionary State',
  'Neoliberal Capitalist Empire',
  'Overpopulated Rising Economy',
  // political fiction information age
  'United States of Post-Colonial Commonwealth Members',
  'Post-European Assimilation Union',
  'Globalist Secret Deep State',
  'Independant Internet Troll Conglomerate',
  // bonkers space age
  'Galactic Old Republic',
  'Reapers',
  'Covenant',
  'Intergalactic Federation',
  'God-Emperors Imperium of Man',
  'Anti-Spirals',
  'Uncaring Vastness of the Universe',
];

const opponentQueue = list.map( (civName,index) => {
  const civ = getRandomCiv(index * 6)
  civ.displayName = civName;
  civ.minimumTurn = index * 6; // means new civ every 6 turns?
  return civ;
});

export function getNewCivs(state) {
  const { turnNumber, civilizations } = state;
  // should there be a civilization queue waiting in the state? probably yes
  if (opponentQueue.length < 3 && civilizations.length > 1) {
    // final boss fight starts only if all are defeated
    return [];
  }
  if (civilizations.length < 3) return [opponentQueue.shift()];
  if (opponentQueue[0].minimumTurn <= turnNumber ) return [opponentQueue.shift()];
  return [];
}
