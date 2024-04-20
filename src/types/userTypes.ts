interface UserSchemaTypes {
  name: String;
  email: String;
  password: String;
  comparePassword: (password: string) => Promise<boolean>;
  books: [
    {
      type: string;
    },
  ];
}

export { UserSchemaTypes };
