const { add, err, promiseTest} = require("../index.js");

jest.mock("../index.js")

describe("Testing multiple operation on Sum function", () => {
  test("Checking using toBe", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(1)).toBe("Please provide all parameters");
    expect(add(5, 6)).toBe(11);
  });

  test("Checking using toBe with mock", () => {
    //addMockReturnValueOnce
    add.mockReturnValue(3)//mocked the value, this means default value is 10//we are doing this to avoid api calls which can be extensive as well as cost incurring;
    expect(add(1, 2)).toBe(3);
    expect(add(1, 2)).toBe(3);
    // expect(add(1)).toBe("Please provide all parameters");
    // expect(add(5, 6)).toBe(11);
  });

  test("Checking using toEquals", () => {
    expect(add(1, 2)).toEqual(3);
  });

  test("Checking using toBeDefined", () => {
    expect(add()).toBeDefined();
  });

  test("Checking using toBeNull", () => {
    expect(add()).toBeNull(); //if we are not passing any params then it will result null as per logic;
  });

  test("Checking using toBeGreaterThan", () => {
    //expect(add(10,10)).toBeGreaterThan(20);//It will fail as 10 + 10 is not greater than 20;
    expect(add(10, 10)).not.toBeGreaterThan(20); //It will pass as it's equal to 20 not greater than 20;
    expect(add(10, 10)).not.toBeGreaterThan(400); //we can use not to manipulate checkings;
  });
});

describe("I am testing the error to be thrown", () => {
  test("Using throw to get error", () => {
    expect(() => err()).toThrow("I am new Error");
  });
});

describe("I am testing the promise",()=>{
    test("Checking for happiness",async()=>{
       const res = await promiseTest(4,3,4)
        // .then(res => expect(res).toBe('Happy'))
        // .catch(e => expect(e).toBe('Sad'))
        expect(res).toBe("Happy")
    })
})


