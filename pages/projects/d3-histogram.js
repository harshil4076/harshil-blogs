import React, { useRef, useEffect } from 'react';
import Layout from '../../components/layout';
import rd3 from 'react-d3-library';

// This component fetches data from https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new 
// then plots a histogram showing the frequency of each number in the list. The histogram has appropriately-numbered x and y axes.
export async function getStaticProps() {
  const randomNumbers = await fetch('https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new')
  const data = await randomNumbers.text();
const numbersArray = data.split('\n').map(Number);
  return {
    props: {
      randomNumbers: numbersArray,
  }
  }
}
function Histogram({randomNumbers}) {

  const chartContainerRef = useRef(null); 
  useEffect(() => {
    if (chartContainerRef.current) {
      const chartContainer = chartContainerRef.current;
      chartContainer.appendChild(svg.node());
    }
  }, [chartContainerRef]);
  return (
    <Layout>
    <div ref={chartContainerRef}></div>
    </Layout>
  ) ;
};

export default Histogram;