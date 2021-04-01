import styleVars from '../styles/vars';

export default function Product({ productData }) {
  const B = 'product';

  return (
    <div className={B}>
      <img src={`/shoes_photos/${productData.code}_1.jpg`} height="300px"/>
      
      <style jsx>{`
        .${B} {
          
        }
      `}</style>
    </div>
  );
}
