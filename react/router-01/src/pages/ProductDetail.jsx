import { useParams } from 'react-router-dom';

function ProductDetail() {
  // contains every dynamic path segment
  const params = useParams();

  return (
    <>
      <h1>Pruduct Details!</h1>
      {/* productId is defined in route definition as an idtifier for this dynamic segment */}
      <p>{params.productId}</p>
    </>
  );
}

export default ProductDetail;
