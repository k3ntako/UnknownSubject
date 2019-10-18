const CHARACTER_LIST = [
  {
    id: "citizen",
    roleName: "Citizen",
    description: "As an average citizen you have no role, but make sure you are not wrongly convicted of the crime.",
    action: null,
  }, {
    id: "murderer",
    roleName: "Murderer",
    description: "You committed the crime. Make sure you don't get caught.",
    action: {
      actionStage: 0,
      action: 'view',
      viewType: 'murderer',
      select: false,
    },
  }, {
    id: "lawyer",
    roleName: "Defense Lawyer",
    description: "You were watching from afar to make alert the robbers of any police officers. They have no solid evidence you were involved. You'll definitely win your appeal.",
    action: {
      actionStage: 0,
      action: 'view',
      viewType: 'murderer',
      select: false,
    },
  }, {
    id: "twin",
    roleName: "Twin",
    description: "You have an alibi: you were with your twin.",
    action: {
      actionStage: 0,
      action: 'view',
      viewType: 'twin',
      select: false,
    },
  }, {
    id: "witness",
    roleName: "Witness",
    description: "As a witness, they may have some information about what they saw.",
    action: {
      actionStage: 0,
      action: 'view',
      select: {
        selectUnassigned: 2,
        selectAssigned: 1,
        selectFromBoth: false,
        selectSelf: false,
        viewSelected: true,
      },
    },
  }, {
    id: "identity_thief",
    roleName: "Identity Thief",
    description: "You like to steal other people's roles.",
    action: {
      action: 'switch_with_self',
      select: {
        selectUnassigned: 0,
        selectAssigned: 1,
        selectFromBoth: false,
        selectSelf: false,
        viewSelected: false,
      },
    },
  }, {
    id: "scientist",
    roleName: "Scientist",
    description: "You created a machine that switches the body of two people.",
    action: {
      actionStage: 0,
      action: 'switch_other_assigned',
      select: {
        selectUnassigned: 2,
        selectAssigned: 0,
        selectFromBoth: false,
        selectSelf: false,
        viewSelected: false,
      },
    },
  }, {
    id: "grandparent",
    roleName: "Grandparent",
    description: "You always forget who you are.",
    action: {
      action: 'switch_with_self',
      select: {
        selectUnassigned: 1,
        selectAssigned: 0,
        selectFromBoth: false,
        selectSelf: false,
        viewSelected: false,
      },
    },
  }, {
    id: "night_owl",
    roleName: "Night Owl",
    description: "You were up late, and you had the chance to check if your role has changed.",
    action: {
      action: 'view_self',
      select: false,
    },
  }
];

const CHARACTER_IDS = CHARACTER_LIST.map(char => char.id);

module.exports = {
  CHARACTER_IDS,
  CHARACTER_LIST
}
