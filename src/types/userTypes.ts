interface UserSchemaTypes {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  books: [
    {
      type: string;
    },
  ];
}

export { UserSchemaTypes };
