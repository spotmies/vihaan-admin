import { useFormik } from 'formik';
import { useState,useEffect } from 'react';

// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
// 
import constants from "../resources/api_calls/api_urls";
import {apiGet} from "../resources/api_calls/api_methods";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [getFetchedData, setGetFetchedData] = useState([]);
  const fetchedProductData =[]

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  
  useEffect(()=>{
    apiGet(constants.fetchAllProducts).then(res=>res.body)
    .then(
      datas=>setGetFetchedData(datas)
      )
            
    },[])

    getFetchedData.map(
      data=>fetchedProductData.push(
        {
          id : data._id,
          name : data?.basicDetails?.modelName,
          price : data?.basicDetails?.price,
          cover : data?.basicDetails?.media[0]?.mediaUrl,
          colors: [data?.colorDetails?.primaryColor]
        }
      )
      )
    
    console.log('fetchedProductData',fetchedProductData)

  

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
          {/* Displaying Fetched Data */}
        <ProductList products={fetchedProductData} />

        <ProductList products={PRODUCTS} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
