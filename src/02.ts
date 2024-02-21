type User = {
  id: number;
  name: string;
  type: 'user' | 'admin';
};

const user: User = {
  id: 1,
  name: 'user',
  type: 'admin',
};

// 1st approach:
function deleteUser(user: User) {
  if (user.type === 'admin') {
    // delete user
  }
}

deleteUser(user);

// 2nd approach
declare const brand: unique symbol;

type Brand<T, TBrand> = T & { [brand]: TBrand };

type Admin = Brand<User, 'Admin'>;

function isAdmin(user: User): user is Admin {
  return user.type === 'admin';
}

if (isAdmin(user)) {
  deleteUserV2(user);
}

function deleteUserV2(user: Admin) {
  // delete user
}
