interface UserSchemaTypes {
  name: String;
  email: String;
  password: String;
  comparePassword: (password: string) => Promise<boolean>;
}

export { UserSchemaTypes };
