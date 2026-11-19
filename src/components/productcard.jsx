import React from 'react'

function ProductCard({product}) {
  return (
    <div>
      <img src={product.image} alt="shoe image" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.sizes}</p>
      <h2>{product.price}</h2>
    </div>
  )
}

export default ProductCard
