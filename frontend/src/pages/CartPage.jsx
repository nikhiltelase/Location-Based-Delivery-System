import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Loader2,
  ChevronUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "Organic Quinoa Salad",
    description: "Fresh mixed greens with organic quinoa",
    price: 12.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxPcmdhbmljJTIwUXVpbm9hJTIwU2FsYWR8ZW58MHx8fHwxNzM0MDIxOTQzfDA&ixlib=rb-4.0.3&q=80&w=1080",
    category: "Salads",
    calories: 380,
  },
  {
    id: 2,
    name: "Grilled Vegetable Wrap",
    description: "Roasted vegetables in whole wheat wrap",
    price: 8.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxHcmlsbGVkJTIwVmVnZXRhYmxlJTIwV3JhcHxlbnwwfHx8fDE3MzQwMjE5NDR8MA&ixlib=rb-4.0.3&q=80&w=1080",
    category: "Wraps",
    calories: 450,
  },
  {
    id: 3,
    name: "Green Smoothie Bowl",
    description: "Kale, spinach, and tropical fruits blend",
    price: 11.5,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1625409493103-51badc065733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxHcmVlbiUyMFNtb290aGllJTIwQm93bHxlbnwwfHx8fDE3MzQwMjE5NDV8MA&ixlib=rb-4.0.3&q=80&w=1080",
    category: "Bowls",
    calories: 320,
  },
  {
    id: 4,
    name: "Avocado Toast",
    description: "Sourdough with fresh avocado and herbs",
    price: 9.75,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1676471970358-1cff04452e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxBdm9jYWRvJTIwVG9hc3R8ZW58MHx8fHwxNzM0MDIxOTQ1fDA&ixlib=rb-4.0.3&q=80&w=1080",
    category: "Toast",
    calories: 280,
  },
  {
    id: 5,
    name: "Matcha Latte",
    description: "Organic matcha with almond milk",
    price: 5.5,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1582785513054-8d1bf9d69c1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjMwMzN8MHwxfHNlYXJjaHwxfHxNYXRjaGElMjBMYXR0ZXxlbnwwfHx8fDE3MzQwMjE5NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    category: "Drinks",
    calories: 150,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    setActiveItem(id);
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
    setTimeout(() => setActiveItem(null), 300);
  };

  const removeItem = (id) => {
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    setCartItems((prev) => [
      ...prev.slice(0, itemIndex),
      ...prev.slice(itemIndex + 1),
    ]);
  };

  const handleCheckout = () => {
    navigate("/order");
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = 2.5;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryCharge + tax;
  const totalCalories = cartItems.reduce(
    (sum, item) => sum + item.calories * item.quantity,
    0
  );

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 pb-32 sm:pb-8">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
              Your Cart
            </h1>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="flex items-center gap-2 text-green-600 text-sm font-medium"
            >
              View Total (${total.toFixed(2)})
              <ChevronUp
                className={`w-4 h-4 transition-transform ${
                  showSummary ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile Summary Dropdown */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${showSummary ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-green-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-700">
                  <span>Delivery</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-700">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-green-100" />
                <div className="flex justify-between font-semibold text-green-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3 space-y-4">
            <div className="hidden lg:flex items-center justify-between">
              <h1 className="text-3xl font-bold text-green-800 flex items-center gap-3">
                <ShoppingCart className="text-green-600" />
                Your Cart
                <span className="text-lg text-green-600 font-normal">
                  ({cartItems.length} items)
                </span>
              </h1>
              <div className="text-sm text-green-600">
                Total Calories: {totalCalories} kcal
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <ShoppingCart className="w-16 h-16 text-green-200 mx-auto mb-4" />
                <h2 className="text-xl text-green-800 font-semibold mb-2">
                  Your cart is empty
                </h2>
                <p className="text-green-600 mb-6">
                  Add some delicious healthy items to get started!
                </p>
                <Link
                  to="/menu"
                  className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-all"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 
                    ${activeItem === item.id ? "scale-[1.02]" : "scale-100"}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg group-hover:shadow-md transition-all"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                          <div>
                            <h3 className="font-semibold text-green-800 text-lg mb-1">
                              {item.name}
                            </h3>
                            <p className="text-green-600 text-sm mb-2">
                              {item.description}
                            </p>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              {item.category} • {item.calories} kcal
                            </span>
                          </div>
                          <div className="w-full sm:w-auto text-right">
                            <p className="text-green-800 font-semibold text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-green-600 text-sm">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 rounded-full hover:bg-green-100 text-green-700 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium text-green-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 rounded-full hover:bg-green-100 text-green-700 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Order Summary Section */}
          <div className="hidden lg:block lg:w-1/3 mt-14">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-green-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Delivery</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-green-100 my-4" />
                <div className="flex justify-between text-lg font-semibold text-green-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                className={`
                  w-full mt-6 py-4 rounded-xl font-medium
                  flex items-center justify-center gap-2
                  ${
                    cartItems.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }
                  transition-all duration-300
                `}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-green-600 mb-4">
                  Free delivery for orders above $30
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-green-100 lg:hidden">
        <button
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
          className={`
            w-full py-4 rounded-xl font-medium
            flex items-center justify-center gap-2
            ${
              cartItems.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }
            transition-all duration-300
          `}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Checkout • ${total.toFixed(2)}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
