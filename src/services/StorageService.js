const ownerUnitProfile = {};
const selectedUnit = {};
const units = [];

export class StorageService {
  setOwnerUnitProfile(data){
    Object.assign(ownerUnitProfile, data);
  }

  getOwnerUnitProfile(){
    return ownerUnitProfile;
  }

  setSelectedUnit(data){
    Object.assign(selectedUnit, data);
  }

  getSelectedUnit(){
    return selectedUnit;
  }

  setUnits(data){
    Object.assign(units, data);
  }

  getUnits(){
    return units;
  }
}
