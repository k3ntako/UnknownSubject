// Action Types:
// null - citizen
// view - murderer, lawyer, twin
// select_view - witness
// switch_self - identity thief, grandparent
// switch_assigned - scientist
// view_self - night owl

const CHARACTER_LIST = {
  citizen: {
    id: "citizen",
    name: "Citizen",
    description: "As an average citizen you have no role, but make sure you are not wrongly convicted of the crime.",
    action: null,
  }, 
  murderer: {
    id: "murderer",
    name: "Murderer",
    description: "You committed the crime. Make sure you don't get caught.",
    action: {
      type: 'view',
      viewType: 'murderer',
      select: false,
    },
  }, 
  lawyer: {
    id: "lawyer",
    name: "Defense Lawyer",
    description: "You were watching from afar to make alert the robbers of any police officers. They have no solid evidence you were involved. You'll definitely win your appeal.",
    action: {
      type: 'view',
      viewType: 'murderer',
      select: false,
    },
  }, 
  twin: {
    id: "twin",
    name: "Twin",
    description: "You have an alibi: you were with your twin.",
    action: {
      type: 'view',
      viewType: 'twin',
      select: false,
    },
  }, 
  witness: {
    id: "witness",
    name: "Witness",
    description: "As a witness, they may have some information about what they saw.",
    action: {
      type: 'select_view',
      select: {
        selectUnassigned: 2,
        selectAssigned: 1,
        selectFromBoth: false,
        selectSelf: false,
        viewSelected: true,
      },
    },
  }, 
  identity_thief: {
    id: "identity_thief",
    name: "Identity Thief",
    description: "You like to steal other people's roles.",
    action: {
      type: 'switch_self',
      select: {
        selectUnassigned: 0,
        selectAssigned: 1,
        selectFromBoth: false,
        selectSelf: false,
        viewSelected: false,
      },
    },
  }, 
  scientist: {
    id: "scientist",
    name: "Scientist",
    description: "You created a machine that switches the body of two people.",
    action: {
      type: 'switch_assigned',
      select: {
        selectUnassigned: 2,
        selectAssigned: 0,
        selectFromBoth: false,
        selectSelf: false,
        viewSelected: false,
      },
    },
  }, 
  grandparent: {
    id: "grandparent",
    name: "Grandparent",
    description: "You always forget who you are.",
    action: {
      type: 'switch_self',
      select: {
        selectUnassigned: 1,
        selectAssigned: 0,
        selectFromBoth: false,
        selectSelf: false,
        viewSelected: false,
      },
    },
  }, 
  night_owl: {
    id: "night_owl",
    name: "Night Owl",
    description: "You were up late, and you had the chance to check if your role has changed.",
    action: {
      type: 'view_self',
      select: false,
    },
  }
};

const CHARACTER_IDS = Object.keys(CHARACTER_LIST);

module.exports = {
  CHARACTER_IDS,
  CHARACTER_LIST
}
