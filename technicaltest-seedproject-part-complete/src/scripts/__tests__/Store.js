import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  let sut;
  beforeEach(() => {
    sut = new Store();
    sut.setDeals(mockData.deals);
  });

  it("WHEN no filters applied THEN show all 11 deals", () => {
    const result = sut.deals;
    expect(result).toEqual(mockData.deals);
  });

  it("WHEN filtering by broadband THEN show the 4 broadband only deals", () => {
    sut.setProductFilter("broadband");
    const result = sut.deals;
    expect(result.length).toEqual(4);
  });

  it("WHEN filtering by broadband AND tv THEN show the 4 deals for broadband and tv only", () => {
    sut.setProductFilter("broadband");
    sut.setProductFilter("tv");
    const result = sut.deals;
    expect(result.length).toEqual(4);
  });

  it("WHEN filtering by broadband AND mobile THEN show the 1 deal for broadband and mobile only", () => {
    sut.setProductFilter("broadband");
    sut.setProductFilter("mobile");
    const result = sut.deals;
    expect(result.length).toEqual(1);
  });

  it("WHEN filtering by Sky THEN show the 1 deal for Sky only", () => {
    sut.setProviderFilter(1);
    const result = sut.deals;
    expect(result.length).toEqual(1);
    expect(result[0].provider.id).toEqual(1);
  });

  it("WHEN filtering by BT, broadband AND tv THEN show the 2 deals for BT with broadband and tv only", () => {
    sut.setProviderFilter(3);
    sut.setProductFilter("broadband");
    sut.setProductFilter("tv");
    const result = sut.deals;
    expect(result.length).toEqual(2);
  });
});
