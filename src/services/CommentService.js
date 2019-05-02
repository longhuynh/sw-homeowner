const comments = [];

export class CommentService {
  setComments(list){
    Object.assign(comments, list);
  }

  getComments(){
    return comments;
  }
}