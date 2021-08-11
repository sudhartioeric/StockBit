const words = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'];

/**
 *  expected result
[
  ["kita", "atik", "tika"],
  ["aku", "kua"],
  ["makan"],
  ["kia"]
]
 */

let result = [];

for(let i=0; i<words.length; i++) {
  const data = sortAlpha(words[i])
  if(result.length === 0) {
    result.push({data, i: [i]});
    continue;
  }
  let counter = 0;
  for(let j=0; j<result.length; j++) {
    if(result[j].data.sorted === data.sorted) {
      result[j].i.push(i);
      counter++;
    }
  }

  if(counter === 0) result.push({data, i: [i]})
  
}

// console.log(result.map(el => el.i.map(index => words[index])))

let datas = [];
for(let i=0; i<result.length; i++) {
  let _items = [];
  for(let j=0; j<result[i].i.length; j++) _items.push(words[result[i].i[j]])

  datas.push(_items);
}

console.log(datas)

function sortAlpha (_word) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  if(typeof _word !== 'string') throw new Error('the word must be string type');
  let indexes = [];
  for(let i=0, lists=_word.split(''); i<lists.length; i++) {
    const list = lists[i];
    for(let j=0, values=alphabet.split(''); j<values.length; j++) {
      const value = values[j];
      if(list === value) {
        indexes.push(j);
        break;
      }
    }
  }
  for(let i=0; i<indexes.length; i++) {
    for(let j=0; j<indexes.length; j++) {
      if (indexes[j] > indexes[j + 1]) {
        let tmp = indexes[j];
        indexes[j] = indexes[j + 1];
        indexes[j + 1] = tmp;
      }
    }
  }
  let newValue = '';
  for(let i=0; i<indexes.length; i++) newValue += alphabet[indexes[i]];

  return {original: _word, sorted: newValue};
}
