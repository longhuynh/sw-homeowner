export const populateUnitOwners = (user) => {
  const unitOwners = [];

  const owners = user.Owners;
  owners.forEach(owner => {
    const userOwner = Object.assign({}, owner); 

    userOwner.Units.map(unit => {
      const unitOwner = unit;

      unitOwner.ManagementIdEncrypted = user.ManagementIdEncrypted; 
      unitOwner.AssociationIdEncrypted = userOwner.AssociationIdEncrypted; 
      unitOwner.OwnerFirstName = userOwner.OwnerFirstName; 
      unitOwner.OwnerLastName = userOwner.OwnerLastName; 
      unitOwner.OwnerEmail = userOwner.OwnerEmail; 
      unitOwner.MailingAddress = userOwner.MailingAddress; 
      unitOwner.MailingCity = userOwner.MailingCity; 
      unitOwner.MailingState = userOwner.MailingState; 
      unitOwner.MailingZip = userOwner.MailingZip; 
      unitOwner.CellPhone = userOwner.CellPhone1; 
      unitOwner.HomePhone = userOwner.OtherPhone; 

      unitOwners.push(unitOwner);
    });
  });

  return unitOwners;
};