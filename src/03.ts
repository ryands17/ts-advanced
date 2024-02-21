export type Maybe<T> = T | null | undefined;

// The "Result" type (similar to rust)
type Ok<T> = { type: 'Ok'; value: T };
const Ok = <T>(value: T): Ok<T> => ({ type: 'Ok', value });

type Err<E> = { type: 'Error'; err: E };
const Err = <E>(err: E): Err<E> => ({ type: 'Error', err });

type Result<T, E> = Ok<T> | Err<E>;

// type predicates
function stripNullAndUndefined<T>(value: Maybe<T>): value is T {
  return value !== null && value !== undefined;
}

function createResult<T, E>(fn: () => Maybe<T>, error: E): Result<T, E> {
  try {
    const value = fn();
    return stripNullAndUndefined(value) ? Ok(value) : Err(error);
  } catch (_error) {
    return Err(error);
  }
}

// example
const users = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
];

const user = createResult(
  () => users.find((u) => u.id === 3),
  'User not found!',
);

// Golang like error handling (no try/catch required)
if (user.type === 'Ok') {
  console.log(user.value.name);
}

export async function createAsyncResult<T, E>(
  fn: () => Promise<Maybe<T>>,
  error: E,
): Promise<Result<T, E>> {
  try {
    const val = await fn();
    return createResult(() => val, error);
  } catch (_error) {
    return Err(error);
  }
}
