class Template {
  constructor() {
    this.deal = document.getElementById("template-deal").innerHTML;
    this.listItem = document.getElementById("template-list-item").innerHTML;
    this.icon = document.getElementById("template-icon").innerHTML;
    this.currencyFormatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    });
  }

  buildDeal(data) {
    return this.deal
      .replace("{{ title }}", data.title)
      .replace("{{ provider }}", data.provider.name)
      .replace(
        "{{ upfrontCost }}",
        data.cost.upfrontCost > 0
          ? this.currencyFormatter.format(data.cost.upfrontCost)
          : "None."
      )
      .replace(
        "{{ totalCost }}",
        this.currencyFormatter.format(data.cost.totalContractCost)
      )
      .replace("{{ contractLength }}", data.contractLength + " months")
      .replace(
        "{{ productList }}",
        this.buildProductIconList(data.productTypes)
      );
  }

  buildListItem(content) {
    return this.listItem.replace("{{ content }}", content);
  }

  buildDealList(list) {
    return list.reduce((result, deal) => {
      const dealHtml = this.buildDeal(deal);
      return (result += this.buildListItem(dealHtml));
    }, "");
  }

  buildProductIconList(list) {
    return list.reduce((result, product) => {
      if (product === "Phone") {
        return result;
      }
      const iconId = this.getIconId(product);
      const iconHtml = this.buildIcon(iconId);
      return (result += this.buildListItem(iconHtml));
    }, "");
  }

  buildIcon(id) {
    return this.icon.replace("{{ iconId }}", id);
  }

  getIconId(name) {
    let id;
    switch (name) {
      case "TV":
        id = "tv";
        break;
      case "Broadband":
      case "Fibre Broadband":
        id = "wifi";
        break;
      case "Mobile":
        id = "mobile";
        break;
    }
    return `#icon-${id}`;
  }
}

export default Template;
