import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import { useObserver } from 'mobx-react';

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
// import PRODUCTS from '../_mocks_/products';
// 
import {useStores} from "../state_management/store/index";



// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const localProductList=[]
 

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

  const {ProductStore} =  useStores()
  console.log(ProductStore)
  useEffect(()=>{
    if(ProductStore.listProducts.length>0)
      return

    ProductStore.addAndFetchedProductFromAPI()
   
            
    },[])

    console.log("hello", ProductStore.listProducts)
    ProductStore.listProducts.map(
      data=>localProductList.push(
        {
          id : data._id,
          name : data?.basicDetails?.modelName,
          price : data?.basicDetails?.price,
          cover : data?.basicDetails?.media[0]?.mediaUrl,
          colors: [ data?.colorDetails?.primaryColor],
          isActive : data?.isActive
         
        }
      )
    )


  return useObserver (()=>(
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
        <ProductList products={localProductList} />

        {/* <ProductList products={PRODUCTS} /> */}
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  ));
}
