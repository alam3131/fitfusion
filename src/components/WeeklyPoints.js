import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, styled } from '@mui/material';

const StyledTableContainer = styled(TableContainer)({
  marginTop: '20px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '2px solid rgba(0, 0, 0, 0.1)', // Adding border-bottom to all cells
}));

const StyledHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderTop: '2px solid rgba(0, 0, 0, 0.1)', // Adding border-top to header cells
}));

const WeeklyPointsGrid = ({ pointsData }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell align="center" style={{ borderRight: '2px solid rgba(0, 0, 0, 0.7)' }}><Typography variant="h6">Day</Typography></StyledHeaderCell>
            {daysOfWeek.map((day) => (
              <StyledHeaderCell key={day} align="center"><Typography variant="h6">{day}</Typography></StyledHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell align="center" style={{ borderRight: '2px solid rgba(0, 0, 0, 0.7)' }}><Typography variant="body1">Points</Typography></StyledTableCell>
            {pointsData.map((points, index) => (
              <StyledTableCell key={index} align="center"><Typography variant="body1">{points} Points</Typography></StyledTableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default WeeklyPointsGrid;
