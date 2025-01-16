type MyResponse<T> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
};

export default MyResponse;
