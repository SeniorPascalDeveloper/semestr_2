import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { quiz } from '../quizData';
import { RootState } from '../../store';
import Matching from './Matching';
import Sorting from './Sorting';
import ChoiceTask from './ChoiceTask';

function Quiz() {
  const [resetKey, setResetKey] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const lists = useSelector((state: RootState) => state.lists.lists);
  const choices = useSelector((state: RootState) => state.lists.choices);

  const handleCheck = () => setShowResults(true);

  const handleReset = () => {
    setShowResults(false);
    setResetKey((k) => k + 1); // триггерит перемешивание во всех заданиях
  };

  // подсчёт результата одного задания
  const getResult = (item: typeof quiz[number], index: number): string => {
    if (item.type === 'M') {
      // правильный порядок ответов = answer каждого вопроса по порядку
      const correct = item.tasks.map((t) => t.answer);
      const user = lists[index] || [];
      let count = 0;
      correct.forEach((ans, i) => {
        if (user[i] === ans) count++;
      });
      return count === correct.length
        ? 'Все ответы верные.'
        : `Верных ответов: ${count} из ${correct.length}.`;
    }

    if (item.type === 'S') {
      // правильный порядок = вопросы, отсортированные по answer (1,2,3...)
      const correct = [...item.tasks]
        .sort((a, b) => Number(a.answer) - Number(b.answer))
        .map((t) => t.question);
      const user = lists[index] || [];
      let count = 0;
      correct.forEach((q, i) => {
        if (user[i] === q) count++;
      });
      return count === correct.length
        ? 'Порядок верный.'
        : `Верных позиций: ${count} из ${correct.length}.`;
    }

    // type === 'C'
    const correctSet = item.tasks.filter((t) => t.answer === '1').map((t) => t.question);
    const user = choices[index] || [];
    const allCorrect =
      correctSet.length === user.length &&
      correctSet.every((q) => user.includes(q));
    return allCorrect ? 'Ответ верный.' : 'Ответ неверный.';
  };

  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" gutterBottom align="center">
            {index + 1}. {item.title}
          </Typography>

          {item.type === 'M' && (
            <Matching index={index} tasks={item.tasks} resetKey={resetKey} />
          )}
          {item.type === 'S' && (
            <Sorting index={index} tasks={item.tasks} resetKey={resetKey} />
          )}
          {item.type === 'C' && (
            <ChoiceTask
              index={index}
              tasks={item.tasks}
              multiple={item.multiple || false}
              resetKey={resetKey}
            />
          )}
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        <Button variant="contained" onClick={handleCheck}>
          Проверить
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Начать снова
        </Button>
      </Box>

      {showResults && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Результаты теста
          </Typography>
          {quiz.map((item, index) => (
            <Typography key={item.id} variant="body1">
              Задание {index + 1}. {getResult(item, index)}
            </Typography>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Quiz;