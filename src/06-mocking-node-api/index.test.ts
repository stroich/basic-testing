import {  doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    const expectedTimeout = 1000;

    doStuffByTimeout(mockCallback, expectedTimeout);

    expect(spy).toHaveBeenCalledWith(mockCallback, expectedTimeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout + 100);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    const expectedInterval = 1000;

    doStuffByInterval(mockCallback, expectedInterval);

    expect(spy).toHaveBeenCalledWith(mockCallback, expectedInterval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    const numIntervals = 3;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime((numIntervals) * interval);

    expect(callback).toHaveBeenCalledTimes(numIntervals);
  });
});

describe('readFileAsynchronously', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    const pathToFile ='/test'
    await readFileAsynchronously(pathToFile);
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const pathToFile ='/test';

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'Test'
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce(content);
    const pathToFile ='/test';

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(content);

  });
});
