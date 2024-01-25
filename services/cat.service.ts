type Cat = {
  name: string;
  age: number;
};

export const getCats = (): Cat[] => {
  return [
    { name: "Mittens", age: 5 },
    { name: "Bella", age: 11 },
    { name: "Coco", age: 2 },
  ];
};
