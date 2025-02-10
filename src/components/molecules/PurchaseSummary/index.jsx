export default function PurchaseSummary({ selectedItems, onPurchase, products, onSelect }) {
  const getProductDetails = (id) => {
    return products.find(p => p.id_producto === id) || {};
  };

  const calculateTotal = () => {
    let total = 0;
    selectedItems.forEach((quantity, id) => {
      const product = getProductDetails(id);
      total += quantity;
    });
    return total;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      width: '300px'
    }}>
      <h3>Resumen de compra</h3>
      <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
        {Array.from(selectedItems).map(([id, quantity]) => {
          const product = getProductDetails(id);
          return (
            <div key={id} style={{ 
              padding: '8px 0',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div>SKU: {product.sku || id}</div>
                <div>Cantidad: {quantity}</div>
              </div>
              <button
                onClick={() => onSelect(id, false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#dc3545',
                  padding: '4px 8px',
                  fontSize: '18px'
                }}
                title="Eliminar"
              >
                🗑️
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ 
        borderTop: '1px solid #ddd',
        paddingTop: '10px',
        marginTop: '10px'
      }}>
        <strong>Total items: {calculateTotal()}</strong>
      </div>
      <button
        onClick={onPurchase}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '10px',
          cursor: 'pointer'
        }}
      >
        Proceder con la compra
      </button>
    </div>
  );
} 