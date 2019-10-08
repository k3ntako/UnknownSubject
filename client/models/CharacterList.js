const CHARACTER_LIST = [
  {
    id: "citizen",
    roleName: "Citizen",
    description: "As an average citizen you have no role, but make sure you are not wrongly convicted of the crime.",
    role: null,
  }, {
    id: "lookout",
    roleName: "Lookout",
    description: "You were watching from afar to make alert the robbers of any police officers. They have no solid evidence you were involved. You'll definitely win your appeal.",
    role: null,
  }, {
    id: "witness",
    roleName: "Witness",
    description: "As a witness, they may have some information about what they saw.",
    role: "Look at another person's card or view two cards from the middle."
  }, {
    id: "twin",
    roleName: "Twin",
    description: "You have an alibi: you were with your twin."
  }, {
    id: "murderer",
    roleName: "Murderer",
    description: "You committed the crime. Make sure you don't get caught.",
    role: "Make sure you know who were your accomplices.",
  }, {
    id: "scientist",
    roleName: "Scientist",
    description: "You created a machine that switches the body of two people.",
    role: null,
  }, {
    id: "grandparent",
    roleName: "Grandparent",
    description: "You always forget who you are.",
    role: null,
  }, {
    id: "identity_thief",
    roleName: "Identity Thief",
    description: "You like to steal other people's roles.",
    role: null,
  }, {
    id: "night_owl",
    roleName: "Night Owl",
    description: "You were up late, and you had the chance to check if your role has changed.",
    role: null,
  }
];

const CHARACTER_IDS = CHARACTER_LIST.map(char => char.id);

module.exports = {
  CHARACTER_IDS,
  CHARACTER_LIST
}
