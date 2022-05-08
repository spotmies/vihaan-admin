import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-ic/motorcycle";
import test from "@iconify/icons-ic/round-bike-scooter";
import plus from "@iconify/icons-eva/plus-circle-fill";
import feedback from "@iconify/icons-ic/comment";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "User",
    path: "/dashboard/user",
    icon: getIcon(peopleFill),
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: getIcon(fileTextFill),
  },
  {
    title: "Product",
    path: "/dashboard/products",
    icon: getIcon(shoppingBagFill),
  },
  // {
  //   title: "Vehicle booking",
  //   path: "/dashboard/vehicle-booking",
  //   icon: getIcon(lockFill),
  // },
  {
    title: "Test ride booking",
    path: "/dashboard/test-ride-booking",
    icon: getIcon(test),
  },
  // {
  //   title: "Add new product",
  //   path: "/dashboard/new-product",
  //   icon: getIcon(plus),
  // },
  {
    title: "Feedback & reviews",
    path: "/dashboard/feedback-review",
    icon: getIcon(feedback),
  },

  {
    title: "login",
    path: "/login",
    icon: getIcon(lockFill),
  },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
