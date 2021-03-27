import { AxiosRequestConfig } from "axios";

// 泛型类 AxiosPromise
export type AxiosPromise<T = any> = Promise<ResponseData<T>>;

export interface Axios {
  get<T>(url: string, params?: any): AxiosPromise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  json<T>(url: string): AxiosPromise<T>;
  // delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  // head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  // options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  // put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  // patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>;
}

export interface RejectedFn {
  (error: any): any;
}
