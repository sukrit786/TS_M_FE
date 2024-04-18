import axios, { AxiosPromise } from "axios";

export class ProductService {
  constructor(private url: string) {}

  public fetchProducts = async (
    limit: number,
    offset: number
  ): AxiosPromise => {
    return await axios.request({
      baseURL: this.url,
      headers: { Accept: "application/json" },
      method: "GET",
      url: `/products`,
      params: { limit, offset },
    });
  };

  public fetchProductsById = (id: string): any => {
    try {
      let ab = axios.get(this.url + `/products/${id}`);
      return ab;
    } catch (err) {
      console.log(
        "-------------------------------------------------------------------------------------------------------------------------------------",
        err
      );
    }
  };
}
