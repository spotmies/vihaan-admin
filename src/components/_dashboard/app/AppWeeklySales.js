import { Icon } from '@iconify/react';
import { useState } from 'react';
import androidFilled from '@iconify/icons-ant-design/slack-circle';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const OverCard = styled(Card)(({ theme }) => ({
  width: theme.spacing(8),
  borderRadius: '15%',
  padding: theme.spacing(2, 2),
  position: 'relative',
  right: 0,
  background: theme.palette.background.neutral,
  // zIndex: 999,
  opacity: 1
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppWeeklySales() {
  // const [card, setCard] = useState(false);
  return (
    <RootStyle onMouseOver={()=> {setCard(true)}} onMouseOut={()=>{setCard(false)}}>
      <IconWrapperStyle>
        {card ?
        <OverCard>Today:200 Weekly: 300 Monthly: 400</OverCard>
        :
        null}
        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Weekly Sales
      </Typography>
    </RootStyle>
  );
}
