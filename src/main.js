import App from './App.svelte';


Amplify.configure(awsconfig)

const app = new App({
	target: document.body,
	props: {
	}
});

window.app = app;

export default app;