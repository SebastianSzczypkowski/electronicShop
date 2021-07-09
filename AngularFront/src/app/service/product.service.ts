import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/product-category';

  constructor(private httpClient:HttpClient) { }

  searchProducts(theKeyword:string):Observable<Product[]>
  {
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  getProduct(theProductId:number):Observable<Product>
  {
    const searchUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(searchUrl);
  }


  getProductsList(theCategoryId:number):Observable<Product[]>
  {

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }


  getProductsListPaginate(thePage:number,thePageSize:number,theCategoryId:number):Observable<GetResponseProduct>
  {

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  //pagination in search product section
  searchProductsPaginate(thePage:number,thePageSize:number,theKeyword:string):Observable<GetResponseProduct>
  {

    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`+`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe
    (map(response => response._embedded.productCategory));
  }
}
interface GetResponseProduct{
  _embedded:{
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }

}

interface GetResponseCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }

}