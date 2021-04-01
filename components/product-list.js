import Product from './product';

export default function ProductList({ products }) {
  const B = 'product-list';

  return (
    <div className={B}>
      {products.map((product) => (
        <div className={`${B}__item`} key={product.code}>
          <Product productData={product}/>
        </div>
      ))}

      <style jsx>{`
        .${B} {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .${B}__item {
          display: block;
          padding: 10px;
          width: 20%;
          align-self: stretch;
        }

        @media (max-width: 800px) {
          .${B}__item {
            width: 25%;
          }
        }

        @media (max-width: 560px) {
          .${B}__item {
            width: 33%;
          }
        }

        @media (max-width: 480px) {
          .${B}__item {
            width: 50%;
          }
        }
      `}</style>
    </div>
  )
}
