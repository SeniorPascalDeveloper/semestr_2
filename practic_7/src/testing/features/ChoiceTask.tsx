import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@mui/material';
import { tTasks } from '../quizData';
import { setChoice } from './quizSlice';
import { RootState } from '../../store';

interface ComponentProps {
  index: number;
  tasks: tTasks;
  multiple: boolean;
  resetKey: number;
}

function ChoiceTask({ index, tasks, multiple, resetKey }: ComponentProps) {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.lists.choices[index]) || [];

  // сброс выбора при «Начать снова»
  useEffect(() => {
    dispatch(setChoice({ index, items: [] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  // несколько вариантов (Checkbox)
  const handleCheckbox = (question: string, checked: boolean) => {
    let next = [...selected];
    if (checked) {
      next.push(question);
    } else {
      next = next.filter((q) => q !== question);
    }
    dispatch(setChoice({ index, items: next }));
  };

  // один вариант (Radio)
  const handleRadio = (question: string) => {
    dispatch(setChoice({ index, items: [question] }));
  };

  if (multiple) {
    return (
      <FormControl component="fieldset" sx={{ ml: 2 }}>
        <FormGroup>
          {tasks.map((t, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={selected.includes(t.question)}
                  onChange={(e) => handleCheckbox(t.question, e.target.checked)}
                />
              }
              label={t.question}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }

  return (
    <FormControl component="fieldset" sx={{ ml: 2 }}>
      <RadioGroup
        value={selected[0] || ''}
        onChange={(e) => handleRadio(e.target.value)}
      >
        {tasks.map((t, i) => (
          <FormControlLabel key={i} value={t.question} control={<Radio />} label={t.question} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default ChoiceTask;