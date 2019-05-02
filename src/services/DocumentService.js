const documents = [];

export class DocumentService {
  setDocuments(list){
    Object.assign(documents, list);
  }

  getDocuments(){
    return documents;
  }
}
