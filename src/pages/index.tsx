import { GetServerSideProps } from 'next';
import { Tytle } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
};

interface HomeProps {
  recommendedProducts: IProduct[];
}

//Browser <-> Next <-> Back-end

export default function Home({ recommendedProducts }: HomeProps) {


  return (
    <div>
      <section>
        <Tytle>Products</Tytle>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

    const response = await fetch('http://localhost:3333/recommended')
    const recommendedProducts = await response.json();

    return {
      props: {
        recommendedProducts
      }
    }
}