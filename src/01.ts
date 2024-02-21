type User = {
  id: number;
  name: string;
  type: 'user' | 'admin';
};

const users: User[] = [
  {
    id: 1,
    name: 'name',
    type: 'admin',
  },
  {
    id: 2,
    name: 'name2',
    type: 'user',
  },
];

function findFromList<TObj, TKey extends keyof TObj>(
  list: TObj[],
  key: TKey,
  value: TObj[TKey],
) {
  return list.find((item) => item[key] === value);
}

console.log(findFromList(users, 'type', 'user'));
