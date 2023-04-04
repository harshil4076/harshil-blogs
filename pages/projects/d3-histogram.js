import React, { useRef, useEffect } from "react";
import Layout from "../../components/layout";
import * as d3 from "d3";
// This component fetches data from https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new
// then plots a histogram showing the frequency of each number in the list. The histogram has appropriately-numbered x and y axes.
export async function getStaticProps() {
  const randomNumbers = await fetch(
    "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
  );
  const data = await randomNumbers.text();
  const numbersArray = data.split("\n").map(Number);
  return {
    props: {
      randomNumbers: numbersArray,
    },
  };
}
function Histogram({ randomNumbers }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    //create an array of arrays with the number and the frequency of the number from the randomNumbers array
    const frequency = randomNumbers.reduce((acc, curr) => {
      const found = acc.find((item) => item[0] === curr);
      if (found) {
        found[1] += 1;
      } else {
        acc.push([curr, 1]);
      }
      return acc;
    }, []);
    console.log(frequency);

    const svg = d3.select(chartContainerRef.current);
    //add width and height to svg
    let w = 500;
    let h = 100;
    svg.attr("width", w);
    svg.attr("height", h);
    //add color to svg
    svg.style("background-color", "lightblue");
    //create a bin for each number in the randomNumbers array
    const bin1 = d3.bin(randomNumbers);
    const xScale = d3.scaleLinear().domain([0, 10]).range([0, w]);
    const yScale = d3
      .scaleLinear()

      .domain([0, 20])
      .range([h, 0]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    //append a div with width and height to svg
    const rectWidth = 100;
    const aspectRatio = 5 / 1;
    //calculate rectHeight based on 500 width and 100 height
    const rectHeight = rectWidth / aspectRatio;
    svg
      .selectAll("rect")
      .data(frequency)
      .enter()
      .append("rect")
      .attr("width", rectWidth)
      .attr("height", (d) => d[1] * rectHeight)
      .attr("x", (d, i) => i * 10)
      .attr("y", (d, i) => h - d[0])
      .attr("fill", "red");
    svg.append("g").attr("transform", "translate(0, 500)").call(xAxis);

    svg.append("g").attr("transform", "translate(0, 0)").call(yAxis);
  }, [chartContainerRef, randomNumbers]);
  return (
    <Layout>
      <svg ref={chartContainerRef}></svg>
    </Layout>
  );
}

export default Histogram;
