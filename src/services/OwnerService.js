class OwnerService {
  populateUnitOwners = (user) => {
    const unitOwners = [];

    const owners = user.Owners || [];

    if(owners.length == 0)
      return [];

    owners.forEach(owner => {
      const userOwner = Object.assign({}, owner);

      const units = userOwner.Units || [];
      units.map(unit => {
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
}

export const OwnerServiceInstance = new OwnerService();