import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/money-collect';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useObserver } from "mobx-react";
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { useCommonStore } from '../../../state_management/common_context';
import {useCommonStore2} from "../../../state_management/common_context2";


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
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
  color: theme.palette.error.light,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------



export default function TodayRevenue() {
  const store = useCommonStore();
  const store2 = useCommonStore2();
  return useObserver(() => (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={bugFilled} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h3" onClick={() => store.fetchAllProductsFromDB()}>{store.value}</Typography>
      <Typography variant="h3" onClick={() => store2.increment()}>{store2.value2}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Today Revenue
      </Typography>
    </RootStyle>
  ));

}
