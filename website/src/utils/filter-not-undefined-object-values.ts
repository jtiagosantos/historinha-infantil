type CustomObject = Record<string, any>;

export const filterNotUndefinedObjectValues = <T = CustomObject>(
  object: CustomObject
) => {
  const filteredObject = {} as CustomObject;

  Object.keys(object).forEach((key) => {
    const value = object[key];

    if (value !== undefined) {
      filteredObject[key] = value;
    }
  });

  return filteredObject as T;
};
