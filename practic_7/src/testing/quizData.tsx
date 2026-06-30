export type tTasks = {
  question: string;
  answer: string;
}[];

export type tQuizzes = {
  id: number;
  type: 'M' | 'S' | 'C';
  title: string;
  multiple?: boolean;
  tasks: tTasks;
}[];

export const quiz: tQuizzes = [
  {
    id: 1,
    type: 'M',
    title: 'Сопоставьте дораму и её жанр.',
    tasks: [
      { question: 'Слава', answer: 'Драма' },
      { question: 'Король земли', answer: 'Романтика' },
      { question: 'Призрачный доктор', answer: 'Фэнтези' },
      { question: 'Следствие', answer: 'Детектив' },
    ],
  },
  {
    id: 2,
    type: 'M',
    title: 'Сопоставьте дораму и год её выхода.',
    tasks: [
      { question: 'Королева слёз', answer: '2024' },
      { question: 'Слава', answer: '2022' },
      { question: 'Город грёз', answer: '2021' },
      { question: 'Принц с горы', answer: '2019' },
    ],
  },
  {
    id: 3,
    type: 'S',
    title: 'Отсортируйте дорамы по убыванию рейтинга.',
    tasks: [
      { question: 'Игра престолов сердец', answer: '1' },
      { question: 'Стражи империи', answer: '2' },
      { question: 'Принц с горы', answer: '3' },
      { question: 'Холодное лето', answer: '4' },
      { question: 'Дочь врага', answer: '5' },
    ],
  },
  {
    id: 4,
    type: 'S',
    title: 'Расположите годы выхода дорам по возрастанию.',
    tasks: [
      { question: '2018', answer: '1' },
      { question: '2020', answer: '2' },
      { question: '2022', answer: '3' },
      { question: '2024', answer: '4' },
    ],
  },
  {
    id: 5,
    type: 'C',
    title: 'Какая актриса снялась в дораме «Слава»?',
    multiple: false,
    tasks: [
      { question: 'Ким Со Хён', answer: '1' },
      { question: 'Ким Тхэ Ри', answer: '0' },
      { question: 'Пак Бо Гом', answer: '0' },
      { question: 'Сон Джун-ги', answer: '0' },
    ],
  },
  {
    id: 6,
    type: 'C',
    title: 'Выберите все дорамы в жанре «Исторический».',
    multiple: true,
    tasks: [
      { question: 'Дочь врага', answer: '1' },
      { question: 'Стражи империи', answer: '1' },
      { question: 'Принц с горы', answer: '1' },
      { question: 'Королева слёз', answer: '0' },
      { question: 'Час пик', answer: '0' },
    ],
  },
];

export default quiz;