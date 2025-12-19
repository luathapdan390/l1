
import { Question } from './types';

export const LISTENING_QUESTIONS: Question[] = [
  { id: 1, type: 'TEXT', label: 'Department', correctAnswer: 'computer science' },
  { id: 2, type: 'TEXT', label: 'Obstacles', correctAnswer: 'rocks' },
  { id: 3, type: 'TEXT', label: 'Technology', correctAnswer: 'video cameras' },
  { id: 4, type: 'CHOICE', label: 'Purpose', correctAnswer: 'C', options: [
    { value: 'A', label: 'Interest students in careers in industry.' },
    { value: 'B', label: 'Help provide finance for universities.' },
    { value: 'C', label: 'Find useful new design features.' }
  ]},
  { id: 5, type: 'CHOICE', label: 'Success factor', correctAnswer: 'A', options: [
    { value: 'A', label: 'The software design.' },
    { value: 'B', label: 'Good, solid construction.' },
    { value: 'C', label: 'Sophisticated mechanisms.' }
  ]},
  { id: 6, type: 'CHOICE', label: 'Competitor surprise', correctAnswer: 'B', options: [
    { value: 'A', label: 'Were so easy to design.' },
    { value: 'B', label: 'Were as successful as they were.' },
    { value: 'C', label: 'Took such a short time to construct.' }
  ]},
  { id: 7, type: 'TEXT', label: 'Introductory event', correctAnswer: 'seminar' },
  { id: 8, type: 'TEXT', label: 'Information type', correctAnswer: 'skills' },
  { id: 9, type: 'TEXT', label: 'Discussion topic', correctAnswer: 'ideas' },
  { id: 10, type: 'TEXT', label: 'Final selection', correctAnswer: 'team' }
];

export const READING_QUESTIONS: Question[] = [
  { id: 1, type: 'CHOICE', label: 'Q1', correctAnswer: 'K', options: [{value:'A', label:'form and function'}, {value:'B', label:'long yawns'}, {value:'C', label:'3 seconds'}, {value:'D', label:'fixed action pattern'}, {value:'E', label:'68 seconds'}, {value:'F', label:'short yawns'}, {value:'G', label:'reflex'}, {value:'H', label:'sneeze'}, {value:'I', label:'short duration'}, {value:'J', label:'6 seconds'}, {value:'K', label:'half-yawns'}] },
  { id: 2, type: 'CHOICE', label: 'Q2', correctAnswer: 'H', options: [{value:'A', label:'form and function'}, {value:'B', label:'long yawns'}, {value:'C', label:'3 seconds'}, {value:'D', label:'fixed action pattern'}, {value:'E', label:'68 seconds'}, {value:'F', label:'short yawns'}, {value:'G', label:'reflex'}, {value:'H', label:'sneeze'}, {value:'I', label:'short duration'}, {value:'J', label:'6 seconds'}, {value:'K', label:'half-yawns'}] },
  { id: 3, type: 'CHOICE', label: 'Q3', correctAnswer: 'D', options: [{value:'A', label:'form and function'}, {value:'B', label:'long yawns'}, {value:'C', label:'3 seconds'}, {value:'D', label:'fixed action pattern'}, {value:'E', label:'68 seconds'}, {value:'F', label:'short yawns'}, {value:'G', label:'reflex'}, {value:'H', label:'sneeze'}, {value:'I', label:'short duration'}, {value:'J', label:'6 seconds'}, {value:'K', label:'half-yawns'}] },
  { id: 4, type: 'CHOICE', label: 'Q4', correctAnswer: 'J', options: [{value:'A', label:'form and function'}, {value:'B', label:'long yawns'}, {value:'C', label:'3 seconds'}, {value:'D', label:'fixed action pattern'}, {value:'E', label:'68 seconds'}, {value:'F', label:'short yawns'}, {value:'G', label:'reflex'}, {value:'H', label:'sneeze'}, {value:'I', label:'short duration'}, {value:'J', label:'6 seconds'}, {value:'K', label:'half-yawns'}] },
  { id: 5, type: 'CHOICE', label: 'Q5', correctAnswer: 'E', options: [{value:'A', label:'form and function'}, {value:'B', label:'long yawns'}, {value:'C', label:'3 seconds'}, {value:'D', label:'fixed action pattern'}, {value:'E', label:'68 seconds'}, {value:'F', label:'short yawns'}, {value:'G', label:'reflex'}, {value:'H', label:'sneeze'}, {value:'I', label:'short duration'}, {value:'J', label:'6 seconds'}, {value:'K', label:'half-yawns'}] },
  { id: 6, type: 'CHOICE', label: 'Q6', correctAnswer: 'B', options: [{value:'A', label:'form and function'}, {value:'B', label:'long yawns'}, {value:'C', label:'3 seconds'}, {value:'D', label:'fixed action pattern'}, {value:'E', label:'68 seconds'}, {value:'F', label:'short yawns'}, {value:'G', label:'reflex'}, {value:'H', label:'sneeze'}, {value:'I', label:'short duration'}, {value:'J', label:'6 seconds'}, {value:'K', label:'half-yawns'}] },
  { id: 7, type: 'CHOICE', label: 'Experiment Conclusion', correctAnswer: 'B', options: [{value:'A', label:'Ending a yawn requires use of the nostrils.'}, {value:'B', label:'You can yawn without breathing through your nose'}, {value:'C', label:'Breathing through the nose produces a silent yawn.'}, {value:'D', label:'The role of the nose in yawning needs further investigation.'}] },
  { id: 8, type: 'CHOICE', label: 'Clenched Teeth Experiment', correctAnswer: 'C', options: [{value:'A', label:'yawning is unconnected with fatigue.'}, {value:'B', label:'a yawn is the equivalent of a deep intake of breath.'}, {value:'C', label:'you have to be able to open your mouth wide to yawn.'}, {value:'D', label:'breathing with the teeth together is as efficient as through the nose.'}] },
  { id: 9, type: 'CHOICE', label: 'Nose Yawn Purpose', correctAnswer: 'D', options: [{value:'A', label:'can be stopped after it has stated'}, {value:'B', label:'is the result of motor programing'}, {value:'C', label:'involves both inhalation and exhalation.'}, {value:'D', label:'can be accomplished only through the nose.'}] },
  { id: 10, type: 'CHOICE', label: 'Paralyzed People', correctAnswer: 'C', options: [{value:'A', label:'yawning may involve only one side of the face.'}, {value:'B', label:'the yawing response indicates that recovery is likely'}, {value:'C', label:'movement in paralysed arm is stimulated by yawming'}, {value:'D', label:'yawning can be used as an example to prevent muscle wasting.'}] },
  { id: 11, type: 'CHOICE', label: 'Last Paragraph Conclusion', correctAnswer: 'B', options: [{value:'A', label:'yawning is a sign of boredom.'}, {value:'B', label:'we yawn is spite of the development of our species'}, {value:'C', label:'yawning is a more passive activity than we Imagine'}, {value:'D', label:'we are stimulated to yawn when our brain activity is low.'}] },
  { id: 12, type: 'CHOICE', label: 'Research students reluctance', correctAnswer: 'YES', options: [{value:'YES', label:'YES'}, {value:'NO', label:'NO'}, {value:'NOT GIVEN', label:'NOT GIVEN'}] },
  { id: 13, type: 'CHOICE', label: 'Foetuses learning movement', correctAnswer: 'NOT GIVEN', options: [{value:'YES', label:'YES'}, {value:'NO', label:'NO'}, {value:'NOT GIVEN', label:'NOT GIVEN'}] },
  { id: 14, type: 'CHOICE', label: 'Single function inadequate', correctAnswer: 'YES', options: [{value:'YES', label:'YES'}, {value:'NO', label:'NO'}, {value:'NOT GIVEN', label:'NOT GIVEN'}] },
];

export const AUDIO_URL = "https://drive.google.com/uc?export=download&id=1VdQ-1WwV9kc6Xsweozzu5wflJKHXiZGJ";
export const VIEW_AUDIO_URL = "https://drive.google.com/file/d/1VdQ-1WwV9kc6Xsweozzu5wflJKHXiZGJ/view";

export const READING_PASSAGE = `
How and why we yawn still presents problems for researchers in an area which has only recently been opened up to study.
... (nội dung rút gọn để tiết kiệm không gian, thực tế sẽ đầy đủ trong file constants.ts)
`;

export const WRITING_TASK_2 = "Some experts suggest that all cyclists should have to pass a test before being allowed to ride a bike on public roads. Agree or Disagree?";
