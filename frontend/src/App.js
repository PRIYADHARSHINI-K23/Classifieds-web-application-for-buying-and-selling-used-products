import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import { loadSeller } from './actions/sellerAction';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderStatus from './components/Cart/OrderStatus';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import OrderTable from './components/Admin/OrderTable';
import UpdateOrder from './components/Admin/UpdateOrder';
import ProductTable from './components/Admin/ProductTable';
import UserTable from './components/Admin/UserTable';
import UpdateUser from './components/Admin/UpdateUser';
import AddUser from './components/Admin/AddUser';
import ReviewsTable from './components/Admin/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/NotFound';
import Categories from './components/Admin/Categories';
import SubCategories from './components/Admin/SubCategories';
import Roles from './components/Admin/Roles';
// import About from './components/Pages/About';

import Contact from './components/Pages/Contact';
import ContactTable from './components/Admin/ContactTable';
import FloatingCartBar from './components/Layouts/FloatingCartBar';
import { About } from "./components/Pages/About"; // ✅
import SellerProtectedRoute from './Routes/SellerProtectedRoute';
import SellerDashboard from './components/Seller/SellerDashboard';
import SellerHome from './components/Seller/SellerHome';
import SellerProducts from './components/Seller/SellerProducts';
import NewProduct from './components/Seller/NewProduct';
import SellerOrders from './components/Seller/SellerOrders';
import SellerAccount from './components/Seller/SellerAccount';


// import SellerDashboard from './components/Pages/Seller/SellerDashboard';


function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated: isSellerAuth } = useSelector((state) => state.seller);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Outfit:300,400,500,600,700,800,900", "Plus Jakarta Sans:300,400,500,600,700,800"]
      },
    });
  }, []);

  const theme = useMemo(() => createTheme({
    typography: {
      fontFamily: [
        'Outfit',
        'Plus Jakarta Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Outfit, Plus Jakarta Sans, sans-serif',
          },
        },
      },
    },
  }), []);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [ dispatch ]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  // disable right click
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // window.addEventListener("keydown", (e) => {
  //   if (e.keyCode == 123) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  // });

  // Check if current route is an admin or seller route
  const isAdminRoute = pathname.startsWith('/admin');
  const isSellerRoute = pathname.startsWith('/seller');

  // Public routes that everyone (including sellers) can access
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/cart',
    '/products',
    '/shipping',
    '/order/confirm',
    '/process/payment',
    '/orders/success',
    '/orders/failed',
    '/password/forgot',
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/product/') ||
    pathname.startsWith('/products/') ||
    pathname.startsWith('/order/') ||
    pathname.startsWith('/password/reset/');

  useEffect(() => {
    // If seller is logged in, redirect from user-only routes to seller dashboard.
    // But allow sellers to browse public pages like product details.
    if (isSellerAuth && !isAdminRoute && !isSellerRoute && !isPublicRoute) {
      navigate('/seller/dashboard', { replace: true });
    }
  }, [isSellerAuth, isAdminRoute, isSellerRoute, isPublicRoute, pathname, navigate]);

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAdminRoute && !isSellerRoute && <Header />}
      {!isAdminRoute && !isSellerRoute && <FloatingCartBar />}
      <Routes>
        {/* ... existing routes ... */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Seller Routes */}
        <Route path="/seller/dashboard" element={
          <SellerProtectedRoute>
            <SellerDashboard activeTab={0}>
              <SellerHome />
            </SellerDashboard>
          </SellerProtectedRoute>
        } />

        <Route path="/seller/account" element={
          <SellerProtectedRoute>
            <SellerAccount />
          </SellerProtectedRoute>
        } />

        <Route path="/seller/products" element={
          <SellerProtectedRoute>
            <SellerDashboard activeTab={1}>
              <SellerProducts />
            </SellerDashboard>
          </SellerProtectedRoute>
        } />

        <Route path="/seller/product/new" element={
          <SellerProtectedRoute>
            <SellerDashboard activeTab={2}>
              <NewProduct />
            </SellerDashboard>
          </SellerProtectedRoute>
        } />

        <Route path="/seller/orders" element={
          <SellerProtectedRoute>
            <SellerDashboard activeTab={3}>
              <SellerOrders />
            </SellerDashboard>
          </SellerProtectedRoute>
        } />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />


        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart />} />

        {/* order process */}
        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } ></Route>

        <Route path="/order/confirm" element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        } ></Route>

        <Route path="/process/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders/success" element={<OrderSuccess success={true} />} />
        <Route path="/orders/failed" element={<OrderSuccess success={false} />} />
        {/* order process */}

        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        } ></Route>

        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }></Route>

        <Route path="/order_details/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }></Route>

        <Route path="/account/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } ></Route>

        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } ></Route>



        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/account" element={<Account />} />

        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } ></Route>

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/categories" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <Categories />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        {/* Sub Categories Routes */}
        <Route path="/admin/subcategories" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <SubCategories />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <OrderTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/order/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <UpdateOrder />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/seller/order/:id" element={
          <SellerProtectedRoute>
            <SellerDashboard activeTab={3}>
              <UpdateOrder />
            </SellerDashboard>
          </SellerProtectedRoute>
        } ></Route>

        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <ProductTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <UserTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <UpdateUser />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/users/new" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <AddUser />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/roles" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={6}>
              <Roles />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="/admin/reviews" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={7}>
              <ReviewsTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>


        <Route path="/admin/contacts" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={8}>
              <ContactTable />
            </Dashboard>
          </ProtectedRoute>
        } ></Route>

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
      {!isAdminRoute && !isSellerRoute && <Footer />}
    </ThemeProvider>
  );
}

export default App;