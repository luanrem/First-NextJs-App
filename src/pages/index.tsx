import { Console } from 'console';
import { GetServerSideProps } from 'next';
import { Tytle } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
};

interface HomeProps {
  recommendedProducts: IProduct[];
}

//Browser <-> Next <-> Back-end

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    const { sum } = (await import('../lib/math')).default;
    alert(sum(3, 5));
  }

  return (
    <div>
      <SEO 
        title="DevCommerce, your best e-comerce"
        shouldExcludeTitleSuffix
      />

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

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
    const recommendedProducts = await response.json();

    return {
      props: {
        recommendedProducts
      }
    }
}