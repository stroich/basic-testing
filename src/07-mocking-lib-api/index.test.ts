import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const instance = jest.spyOn(axios, 'create');
    const relativePath = 'posts';
    await throttledGetDataFromApi(relativePath);
    expect(instance).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = 'posts';

    const mockedCreate = jest.spyOn(axios, 'create');
    const axiosClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    mockedCreate.mockReturnValue(axiosClient);
    const mockedAxiosClientGet = jest.spyOn(axiosClient, 'get');

    await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    expect(mockedAxiosClientGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = {
      data: 'test',
    };
    const relativePath = 'posts';

    const mockedCreate = jest.spyOn(axios, 'create');
    const axiosClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    mockedCreate.mockReturnValue(axiosClient);
    const mockedAxiosClientGet = jest.spyOn(axiosClient, 'get');
    mockedAxiosClientGet.mockReturnValue(Promise.resolve(data));
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toBe(data.data);
  });
});
