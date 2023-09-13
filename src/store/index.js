import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
	state: {
		token: null,
		tokenExpiration: null,
		loggedInUser: {},
		banks: [],
		smsSampleFile: "",
		nubanSampleFile: "",
		nubanBanksandCode: "",
	},

	plugins: [createPersistedState()],

	mutations: {
		GET_ACCESS_TOKEN(state, loggedInUser) {
			state.token = loggedInUser.access_token;
		},

		GET_TOKEN_EXPIRES_AT(state, loggedInUser) {
			state.tokenExpiration = loggedInUser.token_expires_at;
		},

		clearToken(state) {
			state.token = null;
			state.tokenExpiration = null;
		},

		GET_CURRENTLY_LOGGED_IN_USER(state, loggedInUser) {
			state.loggedInUser = loggedInUser;
		},

		GET_BANKS(state, banks) {
			state.banks = banks;
		},

		GET_SMS_SAMPLE_FILE(state, smsSampleFile) {
			state.smsSampleFile = smsSampleFile;
		},

		GET_NUBAN_SAMPLE_FILE(state, nubanSampleFile) {
			state.nubanSampleFile = nubanSampleFile;
		},

		GET_NUBAN_BANKS_CODE_FILE(state, nubanBanksandCode) {
			state.nubanBanksandCode = nubanBanksandCode;
		},
	},

	actions: {
		getUserToken: ({ commit }, token) => {
			commit("GET_ACCESS_TOKEN", token);
		},

		getUserTokenExpiresAt: ({ commit }, token) => {
			commit("GET_TOKEN_EXPIRES_AT", token);
		},

		getBank: ({ commit }, banks) => {
			commit("GET_BANKS", banks);
		},

		getSmsSampleFile: ({ commit }, smsSampleFile) => {
			commit("GET_SMS_SAMPLE_FILE", smsSampleFile);
		},

		getNubanSampleFile: ({ commit }, nubanSampleFile) => {
			commit("GET_NUBAN_SAMPLE_FILE", nubanSampleFile);
		},

		getNubanBankSampleFile: ({ commit }, nubanBanksandCode) => {
			commit("GET_NUBAN_BANKS_CODE_FILE", nubanBanksandCode);
		},

		getCurrentUser: ({ commit }, loggedInUser) =>
			commit("GET_CURRENTLY_LOGGED_IN_USER", loggedInUser),
	},

	getters: {
		// get first letter in first and last name, though I am getting the first and last index after splitting the name
		getLoggedInUserFirstAndLast: (state) =>
			(
				state.loggedInUser.name.split(" ")[0] +
				" " +
				state.loggedInUser.name.split(" ")[1]
			)

				.match(/(^\S\S?|\b\S)?/g)
				.join("")
				.match(/(^\S|\S$)?/g)
				.join("")
				.toUpperCase(),

		// doing the same splitting and getting first letter of first and last name.
		getRMUFirstAndLast: (state) =>
			(
				state.loggedInUser.rmu_name?.split(" ")[0] +
				" " +
				state.loggedInUser.rmu_name?.split(" ")[1]
			)
				.match(/(^\S\S?|\b\S)?/g)
				.join("")
				.match(/(^\S|\S$)?/g)
				.join("")
				.toUpperCase(),

		getToken: (state) => state.token,
	},

	modules: {},
});
