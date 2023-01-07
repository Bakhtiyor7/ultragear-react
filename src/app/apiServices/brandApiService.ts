import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Brand } from "../../types/user";
import { SearchObj } from "../../types/others";

class BrandApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTopBrands() {
    try {
      const url = "/brands?order=top&page=1&limit=4",
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const top_brands: Brand[] = result.data.data;
      return top_brands;
    } catch (err: any) {
      console.log(`ERROR::: getTopBrands ${err.message}`);
      throw err;
    }
  }

  async getBrands(data: SearchObj) {
    try {
      const url = `/brands?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const brands: Brand[] = result.data.data;
      return brands;
    } catch (err: any) {
      console.log(`ERROR::: getBrands ${err.message}`);
      throw err;
    }
  }

  async getChosenBrand(id: string) {
    console.log("id:::", id);
    try {
      const url = `/brands/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const brand: Brand = result.data.data;
      return brand;
    } catch (err: any) {
      console.log(`ERROR::: getChosenBrand ${err.message}`);
      throw err;
    }
  }
}

export default BrandApiService;
