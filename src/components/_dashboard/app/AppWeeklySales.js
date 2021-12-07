import { Icon } from '@iconify/react';
import { useState } from 'react';
import androidFilled from '@iconify/icons-ant-design/slack-circle';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import Tooltip from '../../../theme/overrides/Tooltip';
import './status_cards.css'
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
  // backgroundColor: props.bc
}));

const OverCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: '15%',
  position: 'absolute',
  right: 0,
  background: theme.palette.background.neutral,
  color: theme.palette.chart.green,
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

const TOTAL = 70;

export default function AppWeeklySales(props) {
  const [card, setCard] = useState(false);
  console.log(props)
  return (


    
    <RootStyle onMouseOver={() => { setCard(true) }} onMouseLeave={() => { setCard(false) }} bc = {props.bc}>
  
      <IconWrapperStyle>

        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle>
      <div style={{height:"70px"}}>
      {!card ?
        <>
          <Typography variant="h3">{fShortenNumber(props.count)}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            {props.tagName}
          </Typography>
        </>
        :
        <div className="weekly-sales">
          <div>
            <p>{props.counts[0]}</p>
            <p>today</p>
          </div>

          <div>
            <p>{props.counts[1]}</p>
            <p>week</p>
          </div>

          <div>
            <p>{props.counts[2]}</p>
            <p>month</p>
          </div>
        </div>
      }
      </div>

    </RootStyle>
  );
}
