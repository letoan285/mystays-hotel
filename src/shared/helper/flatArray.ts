const flatArray = (arrayToFlat: Array<any>, compareBy: string) => {
  let results: Array<any> = [];
  arrayToFlat.forEach((ele: any) => {
    if (!results.find((val) => val[compareBy] === ele[compareBy])) {
      results.push(ele);
    }
  });

  return results;
};

export default flatArray;
