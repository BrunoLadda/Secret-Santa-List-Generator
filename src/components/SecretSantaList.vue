<template>
  <div v-if="listGenerated">
    <div>
      <h3>Secret Santa List</h3>
    </div>
    <div class="list">
      <div class="column">
        <ul class="ul">
          <li class="li" v-for="item in getListGiver" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="ul">
          <li class="li" v-for="item in getListReceiver" :key="item.id">
            ===>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="ul">
          <li class="li" v-for="item in getListReceiver" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "secretsanta-list",
  computed: {
    ...mapGetters(["getListGiver", "getListReceiver"]),
    listGenerated() {
      return this.getListReceiver.length != 0;
    },
  },
  components: {},
  methods: {},
};
</script>

