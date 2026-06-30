import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
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

// перемешать массив (Fisher–Yates)
function shuffle(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Matching({ index, tasks, resetKey }: ComponentProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const answers = shuffle(tasks.map((t) => t.answer));
    dispatch(addList({ index, items: answers }));
    // перемешиваем заново при каждом resetKey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, i) => (
            <ListItem key={i}>
              <ListItemButton
                sx={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  textAlign: 'right',
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid size={6}>
        <SortableList index={index} answers={[]} />
      </Grid>
    </Grid>
  );
}

export default Matching;