Accounts.config({ restrictCreationByEmailDomain: 'smart-trade.net'});

['signIn'].forEach(
  (routeName) => AccountsTemplates.configureRoute(routeName));
  
AccountsTemplates.configure({
	defaultLayout: 'userFormsLayout',
	defaultContentRegion: 'content',
	confirmPassword: false,
	enablePasswordChange: false,
	sendVerificationEmail: false,
	showForgotPasswordLink: false,
	forbidClientAccountCreation: true,
	onLogoutHook() {
	 const homePage = 'home';
	 if (FlowRouter.getRouteName() === homePage) {
	   FlowRouter.reload();
	 } else {
	   FlowRouter.go(homePage);
	 }
	},
  }
 });  

// We display the form to change the password in a popup window that already
// have a title, so we unset the title automatically displayed by useraccounts.
AccountsTemplates.configure({
  texts: {
 errors: {
      mustBeLoggedIn: "Please login with your Matsuri account.",
      loginForbidden: "Only Matsuri accounts are allowed."
    }
   }
});
