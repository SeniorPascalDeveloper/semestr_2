import Box from '@mui/material/Box';
import Circles from './Circles';
import DramaCard from './DramaCard';
import { dramas } from '../../data';

const leftData = [dramas[1], dramas[2], dramas[3], dramas[4]];

function LeftColumn() {
  return (
    <Box>
      <Circles />
      {leftData.map((item, index) => (
        <DramaCard key={index} building={item} index={index} />
      ))}
    </Box>
  );
}

export default LeftColumn;