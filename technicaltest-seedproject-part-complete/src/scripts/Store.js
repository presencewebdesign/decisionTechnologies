import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null,
    };
  }

  get deals() {
    return this.filter();
  }

  filterData(data, product, provider) {
    console.log(
      "🚀 ~ file: Store.js ~ line 52 ~ Store ~ filterData ~ this.state.productFilters",
      this.state.productFilters
    );

    // if (sameProduct) {
    //   product.push("fibre broadband");
    // }

    if (provider) {
      data = data.filter((x) => x.provider.id === provider);
    }
    const filterProduct = data.filter((prod) => {
      return product.every(function (val) {
        return prod.productTypes.indexOf(val) !== -1;
      });
    });

    data = filterProduct;
    return data;
  }

  filter() {
    const results = this.filterData(
      this.state.deals,
      this.state.productFilters,
      this.state.providerFilter
    );
    return this.state.productFilters ? results : this.state.deals;
  }

  setDeals(data) {
    // set all productTypes to lowercase
    const newData = data.map((value) => {
      const ptlowercase = value.productTypes.map((v) => v.toLowerCase());
      value.productTypes = ptlowercase;
      return value;
    });

    this.state.deals = newData;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();

    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
