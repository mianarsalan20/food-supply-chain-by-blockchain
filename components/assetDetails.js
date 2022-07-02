import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useMoralis } from "react-moralis";
import { AmazonContext } from "../context/AmazonContext";
import { ReviewCard } from "./reviewCard";
import { ReviewInput } from "./reviewInput";

export default function AssetDetails() {
  const router = useRouter();
  const asset = router.query;
  const { buyAsset, assetReviews, setIndex } = useContext(AmazonContext);
  const { user, setUserData, userError } = useMoralis();
  const { Moralis, isAuthenticated, account } = useMoralis();
  const [quantity, setQuantity] = useState();
  let assetPrice = "";
  let qty = quantity - asset.quantity;
  let qty1 = (-qty).toString();
  setIndex(asset.assetIndex);

  /*let quantityUpdate = [
    { filter: { objectId: asset.objectId }, update: { quantity: qty1 } },
  ];
  Moralis.bulkUpdate("asset", quantityUpdate);*/

  const handleSubmit = async () => {
    const Asset = Moralis.Object.extend("assets");
    const query = new Moralis.Query(Asset);
    const myDetails = await query.first();
    myDetails.set("quantity", qty1);
    assetPrice = quantity * asset.price;

    await myDetails.save();
  };

  let message = "";
  if (user.attributes.username === asset.username) {
    message = (
      <button
        type="button"
        className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
      >
        Owned Asset
      </button>
    );
  } else {
    message = (
      <button
        type="button"
        className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
        onClick={() => {
          handleSubmit();
          buyAsset(assetPrice, asset);
        }}
      >
        Buy Asset
      </button>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 pl-4">
            <div className="h-64 md:h-80 rounded-lg mb-4">
              <img
                src={asset.image}
                className="rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {asset.name}
            </h2>
            <p className="text-gray-500 text-sm pt-4 ">By @{asset.username}</p>
            <p className="text-gray-500 pt-4 ">Category: {asset.category}</p>
            <p className="text-gray-500 pt-4 ">{asset.description}</p>
            <p className="text-gray-500 pt-4 ">Price: {asset.price} RS</p>
            <p className="text-gray-500 pt-4 ">QTY: {asset.quantity} Kg</p>

            <div className="flex py-4 space-x-4">
              <div className="relative">
                <div className="text-center left-0 pt-1 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                  Qty
                </div>
                <input
                  class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex  w-24"
                  autoComplete="description"
                  onChange={(event) => setQuantity(event.currentTarget.value)}
                />
              </div>
              {message}
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex-1 px-4 mt-[150px]">
        <br />
        <div>
          <div>
            {assetReviews.slice(0, 2).map((item, index) => {
              return <ReviewCard key={index} item={item} index={index} />;
            })}
          </div>
        </div>
        <ReviewInput />
        <br />
      </div>
    </div>
  );
}
