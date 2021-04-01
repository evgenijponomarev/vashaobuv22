import Link from 'next/link';

import Product from './product';

export default function ProductList({ products }) {
  const B = 'product-list';

  return (
    <div className={B}>
      {products.map((product, key) => (
        <Link href={`/new/${key}`} key={key}>
          <a className={`${B}__item`}>
            <Product productData={product}/>
          </a>
        </Link>
      ))}

      <style jsx>{`
        .${B} {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .${B}__item {
          display: block;
          text-decoration: none;
          color: inherit;
          padding: 4px;
        }
      `}</style>
    </div>
  )
}
