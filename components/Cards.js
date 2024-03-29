import React, { useState, useContext, useEffect } from "react";
import Card from "./Card";
import Link from "next/link";
import { AmazonContext } from "../context/AmazonContext";

const Cards = () => {
  const styles = {
    container: `h-full w-full flex flex-col ml-[20px] -mt-[150px]`,
    // selectMainContainer: `h-full w-full flex`, w-1/2
    selectContainer: `h-full flex flex-col ml-[20px] -mt-[50px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
    input: `flex flex-col items-center border-2 mb-8 py-2 px-3 rounded-2xl pl-2 w-full outline-none`,
    cards: `flex items-center  flex-wrap gap-[80px]`,
  };
  const { assets, sorting, setSorting, filter, setFilter, search } =
    useContext(AmazonContext);

  if (sorting === "Recent") {
    assets = [...assets].reverse();
  }

  if (sorting === "Low Price") {
    assets = [...assets].sort(
      (a, b) => a.attributes.price - b.attributes.price
    );
  }

  if (sorting === "High Price") {
    assets = [...assets].sort(
      (a, b) => b.attributes.price - a.attributes.price
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <select
          className={styles.input}
          fullWidth
          autoComplete="category"
          value={sorting}
          onChange={(event) => setSorting(event.currentTarget.value)}
        >
          <option>Sort By</option>
          <option>Recent</option>
          <option>Low Price</option>
          <option>High Price</option>
        </select>
        <select
          className={styles.input}
          fullWidth
          autoComplete="category"
          value={filter}
          onChange={(event) => setFilter(event.currentTarget.value)}
        >
          <option>Filter By</option>
          <option>Pulses</option>
          <option>Fruit</option>
          <option>Meat</option>
        </select>
      </div>
      <div className={styles.title}>New Release</div>
      <div className={styles.cards}>
        <div className={styles.cards}>
          {assets.map((item, i) => {
            let asset = item.attributes;
            if (
              asset.name.toLowerCase() === search.toLowerCase() &&
              search != ""
            ) {
              return (
                <Link
                  key={i}
                  href={{
                    pathname: "/assetDetails",
                    query: asset, // the data
                  }}
                >
                  <a>
                    <Card key={item.id} item={item.attributes} />
                  </a>
                </Link>
              );
            }

            if (filter === "" || (filter === "Filter By" && search == "")) {
              return (
                <Link
                  key={i}
                  href={{
                    pathname: "/assetDetails",
                    query: asset, // the data
                  }}
                >
                  <a>
                    <Card key={item.id} item={item.attributes} />
                  </a>
                </Link>
              );
            }
            if (asset.category === filter && search == "") {
              return (
                <Link
                  key={i}
                  href={{
                    pathname: "/assetDetails",
                    query: asset, // the data
                  }}
                >
                  <a>
                    <Card key={item.id} item={item.attributes} />
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Cards;
