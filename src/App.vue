<template>
  <div id="app">
    <Header />
    <div class="column">
      <ParticipantsList></ParticipantsList>
    </div>
    <div class="column">
      <button class="button-generate" v-on:click="generateList">
        {{
          getListReceiver.length > 0
            ? "Recreate Secret Santa List"
            : "Create Secret Santa List"
        }}
      </button>
    </div>
    <div class="column">
      <SecretSantaList></SecretSantaList>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ParticipantsList from "./components/ParticipantsList.vue";
import SecretSantaList from "./components/SecretSantaList.vue";

import "@/assets/style/css/secretsanta.css";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    ParticipantsList,
    SecretSantaList,
  },
  computed: {
    ...mapGetters(["getListGiver", "getListReceiver"]),
  },
  methods: {
    ...mapActions(["generateSantaSecretList"]),
    generateList: function () {
      if (this.getListGiver.length < 3) {
        alert("The Secret Santa list must have at least 3 participants");
      } else {
        this.generateSantaSecretList();
      }
    },
  },
};
</script>
