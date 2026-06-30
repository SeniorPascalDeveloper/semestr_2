import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';
import { tableData } from '../../tableData';

function DramasGrid() {
  const rows: GridRowsProp = tableData;

  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1 },
    { field: 'Жанр', flex: 0.5 },
    { field: 'Год', flex: 0.4 },
    { field: 'Рейтинг', flex: 0.4 },
    { field: 'Статус', flex: 0.5 },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '700px', mt: '20px' }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        showToolbar
      />
    </Container>
  );
}

export default DramasGrid;