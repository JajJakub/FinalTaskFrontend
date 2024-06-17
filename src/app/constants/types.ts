export type ErrorData = {
  code: number;
  messages: string[];
};

export type Ingredient = {
  product: string;
  quantity: number;
  measureType: string;
};

export type Comment = {
  _id: string;
  authorName: string;
  commentBody: string;
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
