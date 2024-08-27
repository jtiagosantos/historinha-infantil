type CustomObject = Record<string, any>;

export const filterNotNullObjectValues = <T = CustomObject>(
  object: CustomObject
) => {
  const filteredObject = {} as CustomObject;

  Object.keys(object).forEach((key) => {
    const value = object[key];

    if (value !== null) {
      filteredObject[key] = value;
    }
  });

  return filteredObject as T;
};
