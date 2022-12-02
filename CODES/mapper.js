const priceRangeMapper = {
  sp_range_1: ["0-200", "201-400", "401-600", "601-800", "801-1000"],
  sp_range_2: ["0-2000", "2001-4000", "4001-6000", "6001-8000", "8001-10000"],
  sp_range_3: [
    "0-20000",
    "20001-40000",
    "40001-60000",
    "60001-80000",
    "80001-100000",
  ],
};

const priceMapper = ({ data }) => {
  const mainData = {
    offer_id: data[0].offer_id,
  };
  const abcMapper = ["a", "b", "c", "d", "e"];

  function getExactPlaceInRange({ price, key, price_zone, price_group }) {
    const mapperPrice = priceRangeMapper[key];
    for (let i = 0; i < mapperPrice.length; i += 1) {
      const [min, max] = mapperPrice[i].split("-").map(Number);
      if (price >= min && price <= max) {
        const priceKey = `${key}_${price_group.toLowerCase()}`;
        mainData[priceKey]
          ? mainData[priceKey].push(
              `${price_zone.toLowerCase()}_${key}_${abcMapper[i]}`
            )
          : (mainData[priceKey] = [
              `${price_zone.toLowerCase()}_${key}_${abcMapper[i]}`,
            ]);
      }
    }
  }

  function getPriceRange({ price, price_zone, price_group }) {
    const allKeys = Object.keys(priceRangeMapper);
    for (let i = 0; i < allKeys.length; i += 1) {
      const key = allKeys[i];
      const rangeChecker =
        priceRangeMapper[key][priceRangeMapper[key].length - 1]
          .split("-")
          .map(Number)[1] >= price;
      if (rangeChecker) {
        getExactPlaceInRange({ price, key, price_zone, price_group });
      }
    }
  }

  for (let i = 0; i < data.length; i += 1) {
    const { price_zone, price_group, tier_quantity } = data[i];
    const price = data[i].price.cent_amount / data[i].price.fraction;
    const key =
      `selling_price_${price_group}_${price_zone}_${tier_quantity}`.toLowerCase();
    mainData[key] = price;
    getPriceRange({ price, price_zone, price_group });
  }

  return mainData;
};

const data = [
  {
    offer_id: "123",
    price_group: "B2C",
    price_zone: "DEFAULT",
    tier_quantity: 100,
    price: {
      cent_amount: 190,
      fraction: 1,
      currency: "INR",
    },
    tax_included_price: true,
  },
  {
    offer_id: "123",
    price_group: "B2C",
    price_zone: "CHENNAI",
    tier_quantity: 100,
    price: {
      cent_amount: 190,
      fraction: 1,
      currency: "INR",
    },
    tax_included_price: true,
  },
  {
    offer_id: "123",
    price_group: "B2B",
    price_zone: "DEFAULT",
    tier_quantity: 100,
    price: {
      cent_amount: 1490,
      fraction: 1,
      currency: "INR",
    },
    tax_included_price: true,
  },
  {
    offer_id: "123",
    price_group: "B2P",
    price_zone: "DEFAULT",
    tier_quantity: 100,
    price: {
      cent_amount: 20000,
      fraction: 1,
      currency: "INR",
    },
    tax_included_price: true,
  },
];


console.log(priceMapper({ data: data }));
