<template>
  <div class="row">
    <no-ssr>
      <div class="col-md-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">Xe quá hạn bảo dưỡng</h4>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">Biển số</th>
                <th scope="col">Màu xe</th>
                <th scope="col">Hãng sản xuất</th>
                <th scope="col">Đời xe</th>
                <th scope="col">Model</th>
                <th scope="col">Số ghế</th>
                <th scope="col">Số năm sử dụng</th>
                <th scope="col">Ngày bảo dướng cuối</th>
              </tr>
            </thead>
            <tbody v-if="coachOverDue.length > 0">
              <tr v-for="(coach, index) in coachOverDue" :key="index">
                <td>{{ coach.licensePlate }}</td>
                <td>{{ coach.color }}</td>
                <td>{{ coach.manufacturer }}</td>
                <td>{{ coach.carType }}</td>
                <td>{{ coach.model }}</td>
                <td>{{ coach.chair }}</td>
                <td>{{ coach.yearUsed }}</td>
                <td>{{ formatDate(coach.lastMaintenance) }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              Không có bản ghi
            </tbody>
          </table>
        </card>
      </div>
    </no-ssr>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import NoSSR from "vue-no-ssr";
import coach, { state } from "~/store/modules/coach";
export default {
  components: {
    "no-ssr": NoSSR,
  },
  data() {
    return {
      coach: {
        licensePlate: "",
        color: "",
        manufacturer: "",
        carType: "",
        model: "",
        chair: "",
        yearUsed: "",
        lastMaintenance: "",
        status: 1,
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      coachOverDue: "coach/getCoachOverDue",
    }),
    ...mapState({}),
  },
  mounted() {
    this.getCoachOverDue();
  },
  methods: {
    getCoachOverDue() {
      this.$store.dispatch("coach/getCoachOverDue");
    },

    formatDate(date) {
      let dateTime = "";
      dateTime =
        date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
      return dateTime;
    },
  },
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>
