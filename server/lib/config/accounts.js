Meteor.startup(function() {

  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET
      }
    },
    { upsert: true }
  );

  Accounts.onCreateUser((options, user) => {
    if (!user.services.google || !user.services.google.email.match(/(@smart-trade\.net)$/) ) {
      //throw new Error('Login with Matsuri accounts only.');
      throw new Meteor.Error(403, AccountsTemplates.texts.errors.loginForbidden);
    }
    const { picture, email, name } = user.services.google;
    user.profile = {};
    user.profile.fullname = name;
    user.profile.emailBuffer = [email];
    user.profile.avatarUrl = picture;
    user.username = email;
    user.profile.initials = name.match(/[A-Z]/g).join("");

  //const { first_name, last_name } = user.services.facebook;
  //user.initials = first_name[0].toUpperCase() + last_name[0].toUpperCase();

  // Don't forget to return the new user object at the end!
    return user;
  });
});
