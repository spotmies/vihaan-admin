module.exports = Object.freeze({
  baseUrl: "https://vihaanserver.herokuapp.com/api",
  localUrl: "http://localhost:4000/api",
  isLocalServer: false,
  fetchAllProducts: "/product/all-products",
  fetchInactiveProducts: "/product/all-products?isActive=false",
  listUsers: "/user/all-users",
  testRides: "/test-ride/all-test-rides",
  listProducts: "/product/all-products",
});
