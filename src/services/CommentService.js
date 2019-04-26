export class CommentService {
  _comments = [];

  setComments(comments){
    _comments = comments;
  }

  getComments(){
    return _comments;
  }
}