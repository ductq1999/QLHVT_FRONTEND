<template>
  <div class="col-md-12">
    <no-ssr>
      <card card-body-classes="table-full-width">
        <h5 slot="header" class="title">Salary</h5>
        <form method="get">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label>Tháng</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nhập tháng"
                v-model="month"
                required
              />
            </div>
            <div class="form-group col-md-4">
              <label>Năm</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nhập năm"
                v-model="year"
                required
              />
            </div>
            <div class="form-group col-md-4">
              <label>Tiền lương</label>
              <div class="form-control" v-if="salaryMonth > 0">
                {{ numberWithCommas(salaryMonth) }} VNĐ
              </div>
            </div>
          </div>
          <a class="btn btn-primary" @click="getSalaryMonth"> Xem lương </a>
        </form>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Tên</th>
              <th scope="col">Số CMTNN</th>
              <th scope="col">Loại tài xế</th>
              <th scope="col">Ngày đi</th>
              <th scope="col">Tuyến đường</th>
              <th scope="col">Lương cơ bản</th>
              <th scope="col" style="text-align: right">Số tiền</th>
            </tr>
          </thead>
          <tbody v-if="salaryDay.length > 0">
            <tr v-for="(driverTrip, index) in salaryDay" :key="index">
              <td>
                {{ driverTrip.driver.name }}
              </td>
              <td>{{ driverTrip.driver.idNumber }}</td>
              <td>
                <div v-if="driverTrip.driverType === 1">Phụ xe</div>
                <div v-else>Lái xe</div>
              </td>
              <td>{{ formatDate(driverTrip.trip.date) }}</td>
              <td>
                {{ driverTrip.trip.buses.first }} -
                {{ driverTrip.trip.buses.last }}
              </td>
              <td>{{ numberWithCommas(driverTrip.salaryTrip) }} VNĐ</td>
              <td style="text-align: right">
                {{
                  numberWithCommas(
                    driverTrip.salaryTrip *
                      driverTrip.driverType *
                      driverTrip.trip.buses.complexity
                  )
                }}
                VNĐ
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            Không có bản ghi
          </tbody>
        </table>
      </card>
    </no-ssr>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import NoSSR from "vue-no-ssr";

export default {
  components: {
    "no-ssr": NoSSR,
  },
  data() {
    return {
      month: null,
      year: null,
      errors: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      salaryDay: "driverTrip/getDriverTripByDriverId",
      salaryMonth: "driverTrip/getSalaryMonth",
    }),
    ...mapState({}),
  },
  mounted() {
    this.getDriverTripByDriverId();
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      if (!this.month) {
        this.errors.push("Tháng là bắt buộc.");
      }
      if (!this.year) {
        this.errors.push("Năm là bắt buộc.");
      }
      if (this.errors && this.errors.length > 0) {
        return false;
      } else {
        return true;
      }
      e.preventDefault();
    },
    async getDriverTripByDriverId() {
      await this.$axios
        .$get("driverTrip/getByDriverId/" + this.$route.params.id)
        .then((response) => {
          if (response.code === 200) {
            this.$store.dispatch(
              "driverTrip/setDriverTripByDriverIdAction",
              response.data
            );
            console.log("aaaaa", response);
          }
        });
    },
    async getSalaryMonth() {
      if (this.checkForm()) {
        await this.$axios
          .$get(
            "driverTrip/getSalaryMonth?" +
              "id=" +
              this.$route.params.id +
              "&month=" +
              this.month +
              "&year=" +
              this.year
          )
          .then((response) => {
            if (response.code === 200) {
              this.$store.dispatch(
                "driverTrip/setSalaryMonthAction",
                response.data
              );
              console.log("aaaaa", response);
            }
          });
      }
    },
    formatDate(date) {
      let dateTime = "";
      dateTime =
        date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
      return dateTime;
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>
