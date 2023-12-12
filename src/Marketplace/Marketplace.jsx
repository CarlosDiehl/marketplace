import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Marketplace() {
  let urlBuy = "https://api.paydece.io/PayDeceAPI/api/buyOrder/filter";
  let urlSell = "https://api.paydece.io/PayDeceAPI/api/sellOrder/filter";
  let data = {
    search: "",
    propertyToSortBy: "fiatPrice",
    sortOrder: 1,
    pageNumber: 1,
    pageSize: 999,
    cryptoId: null,
    cryptoGroupId: null,
    fiatCoinId: null,
    statuses: [1],
    blockchainId: null,
    communityId: null,
  };
  let urlBuyer = "https://app.paydece.io/createBuy/";
  let urlSeller = "https://app.paydece.io/create/";

  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [selector, setSelector] = useState("Buy");

  useEffect(() => {
    axios.post(urlBuy, data).then((res) => {
      setBuyOrders(res.data.data.items);
    });

    axios.post(urlSell, data).then((res) => {
      setSellOrders(res.data.data.items);
    });
  }, []);

  const changeToSell = () => {
    if (selector === "Buy") {
      setSelector("Sell");
    }
  };
  const changeToBuy = () => {
    if (selector === "Sell") {
      setSelector("Buy");
    }
  };

  return (
    <>
      <div className="container">
        <row>
          <div lg="12" md="12">
            <div className="Card">
              <div className="card-header">
                <h1>P2P</h1>
                <p className="text-text-heading-gray text-base mt-4">
                P2P by paydece.io to Fuse, paydece P2P is a decentralized crypto to fiat marketplace with a Smart Contract Escrow users ramp on to defi.
                </p>
                <div className="selector">
                  <button onClick={changeToBuy} className="button">
                    Buy Crypto
                  </button>
                  <button onClick={changeToSell} className="button">
                    Sell Crypto
                  </button>
                </div>
              </div>
              <div className="card-body">
                {selector === "Sell" ? (
                  <div>
                    <table responsive>
                      <thead>
                        <tr>
                          <th>Advertisers</th>
                          <th>Price</th>
                          <th>Payment</th>
                          <th>Limits</th>
                          <th>Available</th>
                          <th>Blockchain</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {buyOrders.map((item) => (
                          <tr key={item.hash}>
                            <td>{item.buyer.wallet}</td>
                            <td>
                              {item.fiatPrice} {item.fiatCoin.symbol}
                            </td>
                            <td>{item.paymentMethods}</td>
                            <td>
                              {item.fromAmountRange.toFixed()}{" "}
                              {item.fiatCoin.symbol} -{" "}
                              {item.toAmountRange.toFixed()}{" "}
                              {item.fiatCoin.symbol}
                            </td>
                            <td>
                              {item.amount.toFixed()} {item.crypto.symbol}
                            </td>
                            <td>{item.crypto.blockchain.description}</td>
                            <td>
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={urlBuyer + item.hash}
                              >
                                <button className="button">Sell</button>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div>
                    <table responsive>
                      <thead>
                        <tr>
                          <th>Advertisers</th>
                          <th>Price</th>
                          <th>Payment</th>
                          <th>Limits</th>
                          <th>Available</th>
                          <th>Blockchain</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sellOrders.map((item) => (
                          <tr key={item.hash}>
                            <td>{item.seller.wallet}</td>
                            <td>
                              {item.fiatPrice} {item.fiatCoin.symbol}
                            </td>
                            <td>{item.paymentMethods}</td>
                            <td>
                              {item.fromAmountRange.toFixed()}{" "}
                              {item.fiatCoin.symbol} -{" "}
                              {item.toAmountRange.toFixed()}{" "}
                              {item.fiatCoin.symbol}
                            </td>
                            <td>
                              {item.amount.toFixed()} {item.crypto.symbol}
                            </td>
                            <td>{item.crypto.blockchain.description}</td>
                            <td>
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={urlSeller + item.hash}
                              >
                                <button className="button">Buy</button>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </row>
      </div>
    </>
  );
}
