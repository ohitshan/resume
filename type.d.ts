export interface UserType {
  _id: string;
  name: string;
  email: string | null;
  image: string;
}

export interface ResumeType {
  _id: string;
  user: UserType;
  title: string;
  content: string;
  education: string;
  isPrivate: boolean;
  field: string;
  part: string[];
  career: string;
}
