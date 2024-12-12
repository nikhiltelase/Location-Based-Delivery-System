
const OrderHistory = () => {
  const orders = [
    {
      id: "ORD123",
      date: "2024-12-10",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 12.99 },
        { name: "Coke", quantity: 2, price: 2.5 },
      ],
      total: 17.99,
      status: "Delivered",
      restaurant: "Pizza Paradise",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Order #{order.id}
                </h3>
                <p className="text-gray-600 text-sm">{order.restaurant}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                {order.status}
              </span>
            </div>

            <div className="border-t border-gray-200 py-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <div className="flex items-center">
                    <span className="text-gray-600">{item.quantity}x</span>
                    <span className="ml-2">{item.name}</span>
                  </div>
                  <span className="text-gray-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <div className="text-gray-600 text-sm">
                {new Date(order.date).toLocaleDateString()}
              </div>
              <div className="text-lg font-bold text-gray-800">
                Total: ${order.total}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
