const CHARACTER_LIST = {
  citizens: [
    {
      id: "citizen",
      roleName: "Citizen",
      description: "As an average citizen you have no role, but make sure you are not wrongly convicted of the crime.",
      role: null,
    },
    {
      id: "jury_member",
      roleName: "Jury Member",
      description: "As a member of the jury, your vote counts twice as much",
      role: null,
    },
    {
      id: "witness",
      roleName: "Witness",
      description: "As a witness, they may have some information about what they saw.",
      role: "Look at another person's card or view two cards from the middle."
    },
    {
      id: "bail_bondsman",
      roleName: "Bail Bondsman",
      description: "As an owner of a bail bonds company, they may have seen the crim"
    }
  ],
  unknownSubjects: [
    {
      id: "robber",
      roleName: "Robber",
      description: "You committed the crime. Make sure you don't get caught.",
      role: "Make sure you know who were your accomplices.",
    },
  ],
  others: [
    {
      id: "bob",
      roleName: "Bob",
      description: "You committed the crime. Make sure you don't get caught.",
      role: "Make sure you know who were your accomplices.",
    }
  ]
}

module.exports = {
  CHARACTER_LIST
}
