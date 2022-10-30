export default function (searchText: string) {
  return {
    or: [
      {
        email: {
          like: searchText,
        },
      },
      {
        first_name: {
          like: searchText,
        },
      },
      {
        last_name: {
          like: searchText,
        },
      },
    ],
  };
}
