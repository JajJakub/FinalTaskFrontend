export type ErrorData = {
  code: number;
  messages: string[];
};

export type Ingredient = {
  product: string;
  quantity: number;
  measureType: string;
  _id: string;
};

export type Comment = {
  authorName: string;
  commentBody: string;
  _id: string;
  commentDate: Date;
};

export type Recipe = {
  _id: string;
  name: string;
  cuisine: string;
  difficulty: string;
  ingredients: Ingredient[];
  steps: string;
  comments: Comment[];
};
