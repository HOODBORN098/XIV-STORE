import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileMenu } from './components/layout/MobileMenu';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminLogin } from './pages/Admin/Login';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { AddProduct } from './pages/Admin/AddProduct';
import { CustomerLogin } from './pages/Customer/Login';
import { CustomerSignup } from './pages/Customer/Signup';
import { ProfilePage } from './pages/Customer/Profile';
import { Page, Product } from './types';
export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = (page: Page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 150);
  };
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigate('product');
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage onNavigate={navigate} onProductClick={handleProductClick} />);

      case 'shop':
        return (
          <ShopPage onProductClick={handleProductClick} onNavigate={navigate} />);

      case 'collections':
        return <CollectionsPage onNavigate={navigate} />;
      case 'product':
        return selectedProduct ?
          <ProductDetailPage product={selectedProduct} onNavigate={navigate} /> :

          <ShopPage onProductClick={handleProductClick} onNavigate={navigate} />;

      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case 'admin-login':
        return <AdminLogin onNavigate={navigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={navigate} />;
      case 'admin-add-product':
        return <AddProduct onNavigate={navigate} />;
      case 'customer-login':
        return <CustomerLogin onNavigate={navigate} />;
      case 'customer-signup':
        return <CustomerSignup onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'support':
      case 'faq':
      case 'shipping':
      case 'size-guide':
        return <HomePage onNavigate={navigate} onProductClick={handleProductClick} />;
      default:
        return (
          <HomePage onNavigate={navigate} onProductClick={handleProductClick} />);

    }
  };
  return (
    <CartProvider>
      <UIProvider>
        <ToastProvider>
          <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col">
            <Header onNavigate={navigate} currentPage={currentPage} />
            <MobileMenu onNavigate={navigate} />

            <main
              className={`flex-grow transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

              {renderPage()}
            </main>

            {currentPage !== 'checkout' && <Footer onNavigate={navigate} />}
          </div>
        </ToastProvider>
      </UIProvider>
    </CartProvider>);

}