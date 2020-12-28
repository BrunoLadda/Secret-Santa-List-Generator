<template>
  <div>
    <div v-if="isLoading" class="loader-box">
      <div class="loader"></div>
    </div>
    <button class="button" v-on:click="addParticipantRandon">
      Add Random Participant
    </button>
    <button class="button" v-on:click="clearLists">Clear List</button>
    <div class="participants-list">
      <ul class="ul">
        <li class="li" v-for="item in getListGiver" :key="item.id">
          {{ item.name }}
          <button class="remove-button" v-on:click="handleRemove(item)">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//vuex
import { mapGetters, mapActions } from "vuex";

// service
import AxioService from "@/services/axio.service";

//models
import Participant from "@/models/participant";

export default {
  name: "participants-list",
  data() {
    return {
      isLoading: false,
      showNewParticipantModal: false,
    };
  },
  computed: {
    ...mapGetters(["getListGiver"]),
    listGenerated() {
      return this.getListGiver().length != 0;
    },
  },
  methods: {
    ...mapActions([
      "addParticipant",
      "removeParticipant",
      "generateSantaSecretList",
      "clearLists",
    ]),
    addParticipantRandon: function () {
      this.isLoading = true;
      AxioService.getParticipantRandon().then(
        (response) => {
          var single = response.data.results[0];
          var newParticipant = new Participant(
            single.name.first + " " + single.name.last,
            single.email
          );
          this.addParticipant(newParticipant);
          this.isLoading = false;
        },
        (error) => {
          console.log("Error", error);
          alert("Error getting random participant. Please try again!");
          this.isLoading = false;
        }
      );
    },
    handleRemove(item) {
      this.removeParticipant(item);
    },
  },
};
</script>
<style lang="css" scoped>
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 120px;
  height: 120px;
  margin: -76px 0 0 -76px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #db3f3f;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
