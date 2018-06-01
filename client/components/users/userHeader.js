Template.headerUserBar.events({
  'click .js-open-header-member-menu': Popup.open('memberMenu'),
  'click .js-change-avatar': Popup.open('changeAvatar'),
});

Template.memberMenuPopup.events({
  'click .js-change-settings': Popup.open('changeSettings'),
  'click .js-change-avatar': Popup.open('changeAvatar'),
  'click .js-edit-notification': Popup.open('editNotification'),
  'click .js-logout'(evt) {
    evt.preventDefault();

    AccountsTemplates.logout();
  },
  'click .js-go-setting'() {
    Popup.close();
  },
});

Template.editProfilePopup.helpers({
  allowEmailChange() {
    return AccountSettings.findOne('accounts-allowEmailChange').booleanValue;
  },
  allowUserNameChange() {
    return AccountSettings.findOne('accounts-allowUserNameChange').booleanValue;
  },
});


Template.editNotificationPopup.helpers({
  hasTag(tag) {
    const user = Meteor.user();
    return user && user.hasTag(tag);
  },
});

// we defined github like rules, see: https://github.com/settings/notifications
Template.editNotificationPopup.events({
  'click .js-toggle-tag-notify-participate'() {
    const user = Meteor.user();
    if (user) user.toggleTag('notify-participate');
  },
  'click .js-toggle-tag-notify-watch'() {
    const user = Meteor.user();
    if (user) user.toggleTag('notify-watch');
  },
});



Template.changeSettingsPopup.helpers({
  hiddenSystemMessages() {
    return Meteor.user().hasHiddenSystemMessages();
  },
  showCardsCountAt() {
    return Meteor.user().getLimitToShowCardsCount();
  },
});

Template.changeSettingsPopup.events({
  'click .js-toggle-system-messages'() {
    Meteor.call('toggleSystemMessages');
  },
  'click .js-apply-show-cards-at'(evt, tpl) {
    evt.preventDefault();
    const minLimit = parseInt(tpl.$('#show-cards-count-at').val(), 10);
    if (!isNaN(minLimit)) {
      Meteor.call('changeLimitToShowCardsCount', minLimit);
      Popup.back();
    }
  },
});
