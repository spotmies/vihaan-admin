import { Icon } from '@iconify/react';
import { useState } from 'react';
import appleFilled from '@iconify/icons-ant-design/user';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import './status_cards.css';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1352831;

export default function AppNewUsers() {
  const [card, setCard] = useState(false);
  return (
    <RootStyle onMouseOver={() => { setCard(true) }} onMouseLeave={() => { setCard(false) }}>
      <IconWrapperStyle>
        <Icon icon={appleFilled} width={24} height={24} />
      </IconWrapperStyle>
      <div style={{height:"70px"}}>
      {!card ?
      <>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Weekly Sales
      </Typography>
    </>
    :
    <div className="weekly-sales">
      <div>
        <p>12</p>
        <p>today</p>
      </div>

      <div>
        <p>120</p>
        <p>week</p>
      </div>

      <div>
        <p>123</p>
        <p>month</p>
      </div>
    </div>
  }
  </div>

</RootStyle>
);
}

