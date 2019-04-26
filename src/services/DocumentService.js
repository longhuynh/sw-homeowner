import { HttpService } from "./config";

export class DocumentService {
  _documents = [];

  setDocuments(documents){
    _documents = documents;
  }

  getDocuments(){
    return _documents;
  }
}

export const CurrentDocuments = [];