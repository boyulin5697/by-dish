export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Menu = {
  __typename?: 'Menu';
  id: Scalars['String']['output'];
  list?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  typeInt?: Maybe<Scalars['Int']['output']>;
};

export type MenuInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type MenuListInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  pageNo: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  time?: InputMaybe<Scalars['String']['input']>;
  typeInt?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  menu: Menu;
  menuList: Array<Maybe<Menu>>;
};


export type QueryMenuArgs = {
  input?: InputMaybe<MenuInput>;
};


export type QueryMenuListArgs = {
  input?: InputMaybe<MenuListInput>;
};
