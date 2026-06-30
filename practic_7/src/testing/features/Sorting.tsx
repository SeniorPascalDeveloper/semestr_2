import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tTasks } from '../quizData';
import { addList } from './quizSlice';
import SortableList from './SortableList';

interface ComponentProps {
  index: number;
  tasks: tTasks;
  resetKey: number;
}

function shuffle(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Sorting({ index, tasks, resetKey }: ComponentProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    // в списке — сами элементы (вопросы), их нужно упорядочить
    const items = shuffle(tasks.map((t) => t.question));
    dispatch(addList({ index, items }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <SortableList index={index} answers={[]} />
    </Box>
  );
}

export default Sorting;