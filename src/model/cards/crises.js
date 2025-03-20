import { BLUE, GREEN, RED } from "../basics";

export const crises = [
  {
    name: 'Widespread Degeneracy',
    description: 'With no desires other than pleasure, society devolves to degeneracy.',
    type: BLUE, // defeat with green
    img: '',
    strength: 10
  },
  {
    name: 'Library of Alexandria Burned',
    description: 'Due to terrible accidents and human malevolence great amounts of knowledge is lost.',
    type: BLUE, // defeat with green
    img: '',
    strength: 15
  },
  {
    name: 'The Black Plague',
    description: 'Horrible disease spread by rats and by the lack of medicine knowledge.',
    type: RED, // defeat with blue
    img: '',
    strength: 20
  },
  {
    name: 'The Great War',
    description: 'Hubris of autocratic leaders brought down the bloodiest conflict in history till this day.',
    type: GREEN, // defeat with red
    img: '',
    strength: 22
  },
  {
    name: 'Cultural Revolution',
    description: 'Unstable governments around the world fall to militaristic leaders.',
    type: BLUE,
    img: '',
    strength: 25
  },
  {
    name: 'Lab Leak Virus',
    description: 'Scientifically engineered disease broken out of human lab.',
    type: RED, // defeat with blue
    img: '',
    strength: 35
  },
  {
    name: 'Global Warming',
    description: 'Inefficient industry leads to destruction of natural environment.',
    type: GREEN, // defeat with red
    img: '',
    strength: 40
  },
  {
    name: 'Machine Uprising',
    description: 'Uncontrolled proliferation of artificial intelligence lead to a great economic crisis.',
    type: GREEN, // defeat with red
    img: '',
    strength: 42
  },
  {
    name: 'Heat Death of the Universe',
    description: 'Seemingly unsurmountable limit to the concept of life.',
    type: RED, // should be random every round?
    img: '',
    strength: 99
  },
];