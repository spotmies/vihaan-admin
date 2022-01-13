import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useObserver } from "mobx-react";

// material
import { Container, Stack, Typography } from "@mui/material";

// components
import Page from "../components/Page";
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
  AddNewProduct,
} from "../components/_dashboard/products";
//
// import PRODUCTS from '../_mocks_/products';
//
import { useStores } from "../state_management/store/index";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const { ProductStore } = useStores();

  const formik = useFormik({
    initialValues: {
      state: "",
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
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

  useEffect(() => {
    if (ProductStore.listProducts.length > 0) return;

    ProductStore.fetchProductFromDB();
  }, []);

  return useObserver(() => (
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
            {/* Add */}
            <AddNewProduct />
          </Stack>
        </Stack>

        {/* {
            ProductStore.showActiveProduct?(

              <ProductList products={ProductStore.activeProductsList} />
            ):( */}

        <ProductList products={ProductStore.listProducts} />
        {/* )
          } */}
      </Container>
    </Page>
  ));
}
