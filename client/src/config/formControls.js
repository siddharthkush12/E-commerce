export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    componentType: "input",
    type: "password",
  },
];

export const registerFormControls = [
  {
    name: "username",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter your Product titile",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    placeholder: "Enter your Product Description",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levis", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    name: "size",
    label: "Size",
    componentType: "checkbox",
    options: [
      {id: "xs",label: "XS"},
      {id: "s",label: "S"},
      {id: "m",label: "M"},
      {id: "l",label: "L"},
      {id: "xl",label: "XL"},
      {id: "xll",label: "XLL"},
      
    ],
  },
  {
    name: "price",
    label: "Price",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product price",
  },
  {
    name: "saleprice",
    label: "Sale Price",
    componentType: "input",
    type: "number",
    placeholder: "Enter Sale price (Optional)",
  },
  {
    name: "stock",
    label: "Stock",
    componentType: "input",
    type: "number",
    placeholder: "Enter Total Stock",
  },
  {
    name: "seller",
    label: "Seller",
    componentType: "input",
    type: "text",
    placeholder: "Enter Seller Details",
  },
];

export const shopViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
];

export const filterOptions = [
  {
    id: "category",
    label: "Category",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levis", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
];

export const sortOption = [
  {
    id: "price_lowtohigh",
    label: "Price: Low to High",
  },
  {
    id: "price_hightolow",
    label: "Price: High to Low",
  },
  {
    id: "title_atoz",
    label: "Title: A to Z",
  },
  {
    id: "title_ztoa",
    label: "Title: Z to A",
  },
];

export const sizeItemsList = [
  {
    id: "xs",
    label: "XS",
  },
  {
    id: "s",
    label: "S",
  },
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "L",
  },
  {
    id: "xl",
    label: "XL",
  },
  {
    id: "xll",
    label: "XLL",
  },
];
