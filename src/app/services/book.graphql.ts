import gql from 'graphql-tag';

export const GET_BOOK = gql`
  {
    getUsers{
    _id,
    name, 
    author,
   content,
   
		
  }
  }
`;

export const ADD_BOOK = gql`
mutation createUser($name:String!, $author:String!, $content:String!)
  {
    createUser(
    name: $name,
    author: $author,
    content: $content,
    
		
    ){
    _id
    name,
    author,
    
    content,
    
  }
  }
`;

export const DELETE_Book = gql`
mutation deleteUser($id:String!)
  {
    deleteUser(
        id: $id   
    ){
    _id,

  }
  }
`;